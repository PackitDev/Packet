import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { DeployConfig, DeployResult } from '../types.js';

const execAsync = promisify(exec);

export async function deployAWS(config: DeployConfig): Promise<DeployResult> {
  try {
    // Check if AWS CLI is installed
    try {
      await execAsync('aws --version');
    } catch {
      return {
        success: false,
        error: 'AWS CLI not installed. Install from: https://aws.amazon.com/cli/',
      };
    }

    // Generate CloudFormation template
    await generateCloudFormationTemplate(config);

    // Deploy using AWS SAM or CloudFormation
    const projectPath = config.projectPath || process.cwd();
    const stackName = config.name || 'packet-app';

    const { stdout } = await execAsync(
      `aws cloudformation deploy --template-file cloudformation.yaml --stack-name ${stackName} --capabilities CAPABILITY_IAM`,
      { cwd: projectPath }
    );

    // Get stack outputs for URL
    const { stdout: outputsStr } = await execAsync(
      `aws cloudformation describe-stacks --stack-name ${stackName} --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" --output text`,
      { cwd: projectPath }
    );

    return {
      success: true,
      url: outputsStr.trim(),
      logs: stdout,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'AWS deployment failed',
    };
  }
}

async function generateCloudFormationTemplate(config: DeployConfig): Promise<void> {
  const template = {
    AWSTemplateFormatVersion: '2010-09-09',
    Transform: 'AWS::Serverless-2016-10-31',
    Description: 'Packet SDK Application',
    Resources: {
      ApiFunction: {
        Type: 'AWS::Serverless::Function',
        Properties: {
          Handler: 'dist/index.handler',
          Runtime: 'nodejs18.x',
          CodeUri: '.',
          Events: {
            ApiEvent: {
              Type: 'Api',
              Properties: {
                Path: '/{proxy+}',
                Method: 'ANY',
              },
            },
          },
          Environment: {
            Variables: config.env || {},
          },
        },
      },
    },
    Outputs: {
      ApiUrl: {
        Description: 'API Gateway endpoint URL',
        Value: {
          'Fn::Sub': 'https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/',
        },
      },
    },
  };

  const projectPath = config.projectPath || process.cwd();
  await writeFile(
    join(projectPath, 'cloudformation.yaml'),
    JSON.stringify(template, null, 2)
  );
}
