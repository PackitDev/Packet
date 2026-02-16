import simpleGit, { SimpleGit } from 'simple-git';

export class BranchManager {
  private git: SimpleGit;

  constructor(cwd: string = process.cwd()) {
    this.git = simpleGit(cwd);
  }

  async createFeatureBranch(name: string): Promise<string> {
    const branchName = `feature/${name}`;
    await this.git.checkoutLocalBranch(branchName);
    return branchName;
  }

  async getCurrentBranch(): Promise<string> {
    const status = await this.git.status();
    return status.current || 'unknown';
  }

  async listBranches(): Promise<string[]> {
    const branches = await this.git.branchLocal();
    return branches.all;
  }

  async switchBranch(name: string): Promise<void> {
    await this.git.checkout(name);
  }

  async deleteBranch(name: string, force: boolean = false): Promise<void> {
    await this.git.deleteLocalBranch(name, force);
  }

  async mergeBranch(branch: string): Promise<void> {
    await this.git.merge([branch]);
  }

  async pushBranch(branch?: string, setUpstream: boolean = false): Promise<void> {
    const currentBranch = branch || await this.getCurrentBranch();
    
    if (setUpstream) {
      await this.git.push('origin', currentBranch, ['--set-upstream']);
    } else {
      await this.git.push('origin', currentBranch);
    }
  }
}
