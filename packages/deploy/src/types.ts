export interface DeployConfig {
  platform: 'vercel' | 'aws' | 'docker' | 'railway' | 'fly';
  env?: Record<string, string>;
  region?: string;
  project?: string;
  projectPath?: string;
  name?: string;
  production?: boolean;
}

export interface DeployResult {
  success: boolean;
  url?: string;
  error?: string;
  logs?: string;
}
