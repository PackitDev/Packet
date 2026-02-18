export * from './types.js';
export { BranchManager } from './branches.js';
export { EnvironmentManager } from './environments.js';

import simpleGit, { SimpleGit } from 'simple-git';
import type { GitConfig, BranchInfo } from './types.js';

export class GitWorkflow {
  private git: SimpleGit;
  private config: GitConfig;

  constructor(config: GitConfig) {
    this.git = simpleGit();
    this.config = config;
  }

  async createFeatureBranch(name: string): Promise<string> {
    const prefix = this.config.featureBranches?.prefix || 'feature/';
    const branchName = `${prefix}${name}`;

    await this.git.checkoutLocalBranch(branchName);
    return branchName;
  }

  async listEnvironments(): Promise<BranchInfo[]> {
    const branches: BranchInfo[] = [];

    for (const [env, config] of Object.entries(this.config.environments)) {
      branches.push({
        name: config.branch,
        environment: env,
      });
    }

    return branches;
  }

  async getCurrentBranch(): Promise<string> {
    const status = await this.git.status();
    return status.current || 'unknown';
  }

  async linkBranchToEnvironment(branch: string, environment: string): Promise<void> {
    // Store mapping in config
    this.config.environments[environment] = {
      ...this.config.environments[environment],
      branch,
    };
  }
}

export function createGitWorkflow(config: GitConfig): GitWorkflow {
  return new GitWorkflow(config);
}
