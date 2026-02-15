import { Command } from 'commander';
import inquirer from 'inquirer';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { execa } from 'execa';
import { logger } from '../utils/logger.js';
import { withSpinner } from '../utils/spinner.js';

interface CreateOptions {
  template?: string;
  database?: string;
  auth?: string;
  skipInstall?: boolean;
}

export function createCommand(): Command {
  const command = new Command('create');

  command
    .description('Create a new Effec-t project')
    .argument('<project-name>', 'Name of the project')
    .option('-t, --template <template>', 'Template to use (fullstack-ts, backend-only, frontend-only)')
    .option('-d, --database <database>', 'Database to use (postgres, mysql, sqlite, mongodb)')
    .option('-a, --auth <auth>', 'Auth provider (jwt, session, oauth)')
    .option('--skip-install', 'Skip installing dependencies')
    .action(async (projectName: string, options: CreateOptions) => {
      try {
        logger.info(`Creating new Effec-t project: ${projectName}`);

        // Interactive prompts if options not provided
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'template',
            message: 'Select a template:',
            choices: [
              { name: 'Full-stack TypeScript (React + Express)', value: 'fullstack-ts' },
              { name: 'Backend only (Express API)', value: 'backend-only' },
              { name: 'Frontend only (React)', value: 'frontend-only' },
            ],
            when: !options.template,
          },
          {
            type: 'list',
            name: 'database',
            message: 'Select a database:',
            choices: [
              { name: 'PostgreSQL', value: 'postgres' },
              { name: 'MySQL', value: 'mysql' },
              { name: 'SQLite (for development)', value: 'sqlite' },
              { name: 'MongoDB', value: 'mongodb' },
            ],
            when: !options.database,
          },
          {
            type: 'list',
            name: 'auth',
            message: 'Select authentication:',
            choices: [
              { name: 'JWT (stateless)', value: 'jwt' },
              { name: 'Session-based', value: 'session' },
              { name: 'OAuth (Google, GitHub)', value: 'oauth' },
              { name: 'None', value: 'none' },
            ],
            when: !options.auth,
          },
        ]);

        const config = {
          template: options.template || answers.template,
          database: options.database || answers.database,
          auth: options.auth || answers.auth,
        };

        // Create project directory
        const projectPath = join(process.cwd(), projectName);
        await withSpinner('Creating project directory', async () => {
          await mkdir(projectPath, { recursive: true });
        });

        // Generate project files
        await generateProject(projectPath, projectName, config);

        // Install dependencies
        if (!options.skipInstall) {
          await withSpinner('Installing dependencies', async () => {
            await execa('npm', ['install'], { cwd: projectPath });
          });
        }

        logger.success(`Project ${projectName} created successfully!`);
        logger.log('');
        logger.log('Next steps:');
        logger.log(`  cd ${projectName}`);
        if (options.skipInstall) {
          logger.log('  npm install');
        }
        logger.log('  effec-t dev');
      } catch (error) {
        logger.error(`Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
      }
    });

  return command;
}

async function generateProject(
  projectPath: string,
  projectName: string,
  config: { template: string; database: string; auth: string }
): Promise<void> {
  // Generate package.json
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'effec-t dev',
      build: 'effec-t build',
      start: 'node dist/index.js',
      deploy: 'effec-t deploy',
    },
    dependencies: {
      '@effec-t/core': '^1.0.0-beta.1',
      '@effec-t/auth': '^1.0.0-beta.1',
      '@effec-t/db': '^1.0.0-beta.1',
      '@effec-t/router': '^1.0.0-beta.1',
    },
    devDependencies: {
      '@effec-t/testing': '^1.0.0-beta.1',
      typescript: '^5.3.3',
    },
  };

  await writeFile(
    join(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Generate effec-t.config.ts
  const configContent = `import { EffecTConfig } from '@effec-t/core';

export default {
  auth: {
    provider: '${config.auth}',
    ${config.auth === 'jwt' ? `jwt: {
      secret: process.env.JWT_SECRET || 'your-secret-key',
      expiresIn: '7d',
    },` : ''}
  },
  database: {
    type: '${config.database}',
    url: process.env.DATABASE_URL || '${getDatabaseUrl(config.database)}',
  },
  routes: {
    dir: './routes',
  },
  port: 3000,
} satisfies EffecTConfig;
`;

  await writeFile(join(projectPath, 'effec-t.config.ts'), configContent);

  // Generate main entry point
  const indexContent = `import { createApp } from '@effec-t/core';
import config from './effec-t.config.js';

const app = createApp(config);

await app.start();
`;

  await mkdir(join(projectPath, 'src'), { recursive: true });
  await writeFile(join(projectPath, 'src/index.ts'), indexContent);

  // Generate example route
  await mkdir(join(projectPath, 'routes/api'), { recursive: true });
  const routeContent = `export const GET = async (req: Request) => {
  return {
    message: 'Hello from Effec-t!',
    timestamp: new Date().toISOString(),
  };
};

export const POST = async (req: Request) => {
  return {
    message: 'POST request received',
    body: req.body,
  };
};
`;

  await writeFile(join(projectPath, 'routes/api/hello.ts'), routeContent);

  // Generate .env file
  const envContent = `# Database
DATABASE_URL=${getDatabaseUrl(config.database)}

# Authentication
${config.auth === 'jwt' ? 'JWT_SECRET=your-secret-key-change-this' : ''}
${config.auth === 'session' ? 'SESSION_SECRET=your-session-secret-change-this' : ''}

# Server
PORT=3000
HOST=0.0.0.0
LOG_LEVEL=info
`;

  await writeFile(join(projectPath, '.env'), envContent);

  // Generate .gitignore
  const gitignoreContent = `node_modules/
dist/
.env
.env.local
.effec-t/
`;

  await writeFile(join(projectPath, '.gitignore'), gitignoreContent);

  // Generate README
  const readmeContent = `# ${projectName}

Created with Effec-t SDK

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy
npm run deploy
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── routes/          # API routes and pages
│   └── api/        # API endpoints
├── src/            # Source code
├── effec-t.config.ts  # Effec-t configuration
└── .env            # Environment variables
\`\`\`

## Documentation

Visit [effec-t.dev/docs](https://effec-t.dev/docs) for full documentation.
`;

  await writeFile(join(projectPath, 'README.md'), readmeContent);

  // Generate tsconfig.json
  const tsconfigContent = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      lib: ['ES2022'],
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      outDir: './dist',
      rootDir: './src',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    },
    include: ['src/**/*', 'routes/**/*', 'effec-t.config.ts'],
    exclude: ['node_modules', 'dist'],
  };

  await writeFile(
    join(projectPath, 'tsconfig.json'),
    JSON.stringify(tsconfigContent, null, 2)
  );
}

function getDatabaseUrl(database: string): string {
  switch (database) {
    case 'postgres':
      return 'postgresql://user:password@localhost:5432/mydb';
    case 'mysql':
      return 'mysql://user:password@localhost:3306/mydb';
    case 'sqlite':
      return 'file:./dev.db';
    case 'mongodb':
      return 'mongodb://localhost:27017/mydb';
    default:
      return '';
  }
}
