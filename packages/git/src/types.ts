export interface GitConfig {
  environments: {
    [key: string]: {
      branch: string;
      autoDeployOn?: 'push' | 'manual';
    };
  };
  featureBranches?: {
    prefix?: string;
    autoCleanup?: boolean;
  };
}

export interface BranchInfo {
  name: string;
  environment?: string;
  lastDeploy?: Date;
}
