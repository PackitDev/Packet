export interface DeployConfig {
  platform: 'vercel' | 'aws' | 'docker' | 'railway' | 'fly';
  env?: Record<string, string>;
  region?: string;
  project?: string;
}

export interface DeployResult {
  success: boolean;
  url?: string;
  error?: string;
}
