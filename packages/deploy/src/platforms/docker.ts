import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { DeployConfig, DeployResult } from '../types.js';

export async function deployDocker(config: DeployConfig): Promise<DeployResult> {
  try {
    // Generate Dockerfile
    const dockerfile = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
`;

    await writeFile(join(process.cwd(), 'Dockerfile'), dockerfile);

    // Generate docker-compose.yml
    const dockerCompose = `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
${Object.entries(config.env || {})
  .map(([key, value]) => `      - ${key}=${value}`)
  .join('\n')}
`;

    await writeFile(join(process.cwd(), 'docker-compose.yml'), dockerCompose);

    return {
      success: true,
      url: 'http://localhost:3000',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
