export interface Environment {
  name: string;
  branch: string;
  url?: string;
  variables?: Record<string, string>;
}

export class EnvironmentManager {
  private environments: Map<string, Environment>;

  constructor() {
    this.environments = new Map();
    this.initializeDefaultEnvironments();
  }

  private initializeDefaultEnvironments(): void {
    // Default environment mappings
    this.environments.set('main', {
      name: 'production',
      branch: 'main',
    });

    this.environments.set('develop', {
      name: 'staging',
      branch: 'develop',
    });
  }

  mapBranchToEnvironment(branch: string, environment: Environment): void {
    this.environments.set(branch, environment);
  }

  getEnvironmentForBranch(branch: string): Environment | undefined {
    // Check exact match
    if (this.environments.has(branch)) {
      return this.environments.get(branch);
    }

    // Check for feature branches
    if (branch.startsWith('feature/')) {
      return {
        name: 'preview',
        branch,
        url: `https://preview-${branch.replace('feature/', '')}.app.com`,
      };
    }

    return undefined;
  }

  listEnvironments(): Environment[] {
    return Array.from(this.environments.values());
  }

  getDeploymentStrategy(branch: string): 'production' | 'staging' | 'preview' | 'none' {
    const env = this.getEnvironmentForBranch(branch);
    
    if (!env) return 'none';
    
    switch (env.name) {
      case 'production':
        return 'production';
      case 'staging':
        return 'staging';
      case 'preview':
        return 'preview';
      default:
        return 'none';
    }
  }
}
