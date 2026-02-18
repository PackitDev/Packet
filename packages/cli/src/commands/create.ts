import { Command } from 'commander';
import inquirer from 'inquirer';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
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
    .description('Create a new Packet project')
    .argument('<project-name>', 'Name of the project')
    .option('-t, --template <template>', 'Template to use (fullstack-ts, backend-only)')
    .option('-d, --database <database>', 'Database to use (postgres, mysql, sqlite, mongodb)')
    .option('-a, --auth <auth>', 'Auth provider (jwt, session, oauth)')
    .option('--skip-install', 'Skip installing dependencies')
    .action(async (projectName: string, options: CreateOptions) => {
      try {
        logger.info(`Creating new Packet project: ${projectName}`);

        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'template',
            message: 'Select a template:',
            choices: [
              { name: 'Full-stack TypeScript (Express API + file-based routing)', value: 'fullstack-ts' },
              { name: 'Backend only (Express API)', value: 'backend-only' },
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

        const projectPath = join(process.cwd(), projectName);

        if (existsSync(projectPath)) {
          logger.error(`Directory "${projectName}" already exists`);
          process.exit(1);
        }

        await withSpinner('Creating project directory', async () => {
          await mkdir(projectPath, { recursive: true });
        });

        await withSpinner('Generating project files', async () => {
          await generateProject(projectPath, projectName, config);
        });

        if (!options.skipInstall) {
          await withSpinner('Installing dependencies', async () => {
            await execa('npm', ['install', '--ignore-scripts'], { cwd: projectPath });
          });
        }

        logger.success(`\nProject "${projectName}" created successfully!`);
        logger.log('');
        logger.log('Next steps:');
        logger.log(`  cd ${projectName}`);
        if (options.skipInstall) {
          logger.log('  npm install');
        }
        logger.log('  packet dev');
        logger.log('');
        logger.log('Your project is ready! Run "packet dev" to start the development server.');
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
  // Determine the right DB driver dependency
  const dbDeps = getDbDependencies(config.database);
  const authDeps = config.auth !== 'none' ? getAuthDependencies(config.auth) : {};

  // Generate package.json with @packet/* framework packages
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'packet dev',
      build: 'packet build',
      start: 'node dist/index.js',
    },
    dependencies: {
      '@packet/core': '^1.0.0-beta.1',
      '@packet/router': '^1.0.0-beta.1',
      'dotenv': '^16.4.1',
      ...dbDeps,
      ...authDeps,
    },
    devDependencies: {
      '@packet/cli': '^1.0.0-beta.1',
      'typescript': '^5.3.3',
      '@types/node': '^20.11.17',
    },
  };

  await writeFile(
    join(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Generate packet.config.ts with proper types
  const configContent = `import type { PacketConfig } from '@packet/core';

const config: PacketConfig = {
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0',
  database: {
    type: '${config.database}' as const,
    url: process.env.DATABASE_URL || '${getDatabaseUrl(config.database)}',
  },
  auth: {
    provider: '${config.auth}' as const,
    ${config.auth === 'jwt' ? `jwt: {
      secret: process.env.JWT_SECRET || 'change-this-secret-in-production',
      expiresIn: '7d',
    },` : ''}${config.auth === 'session' ? `session: {
      secret: process.env.SESSION_SECRET || 'change-this-secret-in-production',
    },` : ''}
  },
  routes: {
    dir: './routes',
  },
};

export default config;
`;

  await writeFile(join(projectPath, 'packet.config.ts'), configContent);

  // Generate main entry point - minimal, uses @packet/core framework
  const indexContent = `import { createApp } from '@packet/core';
import { config } from 'dotenv';
import packetConfig from '../packet.config.js';

// Load environment variables
config();

// Create and start the Packet application
const app = createApp(packetConfig);

app.start().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await app.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await app.stop();
  process.exit(0);
});
`;

  await mkdir(join(projectPath, 'src'), { recursive: true });
  console.log('[DEBUG] Writing src/index.ts with length:', indexContent.length);
  console.log('[DEBUG] First 100 chars:', indexContent.substring(0, 100));
  await writeFile(join(projectPath, 'src/index.ts'), indexContent);

  // Generate example routes
  await mkdir(join(projectPath, 'routes/api'), { recursive: true });

  const helloRoute = `import type { Request, Response } from 'express';

export const GET = async (req: Request, res: Response) => {
  return {
    message: 'Hello from Packet!',
    timestamp: new Date().toISOString(),
  };
};

export const POST = async (req: Request, res: Response) => {
  const { name } = req.body;
  return {
    message: \`Hello, \${name || 'World'}!\`,
  };
};
`;

  await writeFile(join(projectPath, 'routes/api/hello.ts'), helloRoute);

  const healthRoute = `import type { Request, Response } from 'express';

export const GET = async (_req: Request, _res: Response) => {
  return {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
};
`;

  await writeFile(join(projectPath, 'routes/api/health.ts'), healthRoute);

  // Generate users route with dynamic param
  await mkdir(join(projectPath, 'routes/api/users'), { recursive: true });

  const usersIndexRoute = `import type { Request, Response } from 'express';

// In-memory store for demo purposes
const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

export const GET = async (_req: Request, _res: Response) => {
  return { users };
};

export const POST = async (req: Request, _res: Response) => {
  const { name, email } = req.body;
  const newUser = {
    id: String(users.length + 1),
    name,
    email,
  };
  users.push(newUser);
  return { user: newUser };
};
`;

  await writeFile(join(projectPath, 'routes/api/users/index.ts'), usersIndexRoute);

  const userByIdRoute = `import type { Request, Response } from 'express';

export const GET = async (req: Request, res: Response) => {
  const { id } = req.params;
  // In a real app, query the database here
  return {
    user: { id, name: 'User ' + id, email: \`user\${id}@example.com\` },
  };
};
`;

  await writeFile(join(projectPath, 'routes/api/users/[id].ts'), userByIdRoute);

  // Generate .env
  const envContent = `# Database
DATABASE_URL=${getDatabaseUrl(config.database)}

# Authentication
${config.auth === 'jwt' ? 'JWT_SECRET=change-this-to-a-random-secret-string' : ''}
${config.auth === 'session' ? 'SESSION_SECRET=change-this-to-a-random-secret-string' : ''}

# Server
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
CORS_ORIGIN=*
`;

  await writeFile(join(projectPath, '.env'), envContent);

  // Generate .gitignore
  const gitignoreContent = `node_modules/
dist/
.env
.env.local
.packet/
*.log
`;

  await writeFile(join(projectPath, '.gitignore'), gitignoreContent);

  // Generate tsconfig.json
  const tsconfigContent = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      lib: ['ES2022'],
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      outDir: './dist',
      rootDir: '.',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      declaration: true,
    },
    include: ['src/**/*', 'routes/**/*', 'packet.config.ts'],
    exclude: ['node_modules', 'dist'],
  };

  await writeFile(
    join(projectPath, 'tsconfig.json'),
    JSON.stringify(tsconfigContent, null, 2)
  );

  // Generate README
  const readmeContent = `# ${projectName}

Built with **Packet SDK** - Full-stack TypeScript Framework

## Getting Started

\`\`\`bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── routes/              # File-based API routes
│   └── api/
│       ├── hello.ts     # GET/POST /api/hello
│       ├── health.ts    # GET /api/health
│       └── users/
│           ├── index.ts  # GET/POST /api/users
│           └── [id].ts   # GET /api/users/:id
├── src/
│   └── index.ts         # Application entry point
├── packet.config.ts     # Packet configuration
├── .env                 # Environment variables
└── tsconfig.json        # TypeScript configuration
\`\`\`

## File-Based Routing

Routes are automatically mapped from the \`routes/\` directory:

| File | URL | Methods |
|------|-----|---------|
| \`routes/api/hello.ts\` | \`/api/hello\` | GET, POST |
| \`routes/api/health.ts\` | \`/api/health\` | GET |
| \`routes/api/users/index.ts\` | \`/api/users\` | GET, POST |
| \`routes/api/users/[id].ts\` | \`/api/users/:id\` | GET |

### Route File Format

Each route file exports HTTP method handlers:

\`\`\`typescript
import type { Request, Response } from 'express';

export const GET = async (req: Request, res: Response) => {
  return { message: 'Hello!' }; // Auto-serialized to JSON
};

export const POST = async (req: Request, res: Response) => {
  const data = req.body;
  return { received: data };
};
\`\`\`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| \`PORT\` | Server port | \`3000\` |
| \`HOST\` | Server host | \`0.0.0.0\` |
| \`DATABASE_URL\` | Database connection string | - |
| \`NODE_ENV\` | Environment | \`development\` |

## Documentation

Visit [packet-site.vercel.app/docs](https://packet-site.vercel.app/docs)
`;

  await writeFile(join(projectPath, 'README.md'), readmeContent);
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

function getDbDependencies(database: string): Record<string, string> {
  switch (database) {
    case 'postgres':
      return { pg: '^8.11.3', '@types/pg': '^8.10.9' };
    case 'mysql':
      return { mysql2: '^3.7.0' };
    case 'sqlite':
      return { 'better-sqlite3': '^9.4.3', '@types/better-sqlite3': '^7.6.8' };
    case 'mongodb':
      return { mongodb: '^6.3.0' };
    default:
      return {};
  }
}

function getAuthDependencies(auth: string): Record<string, string> {
  switch (auth) {
    case 'jwt':
      return {
        jsonwebtoken: '^9.0.2',
        '@types/jsonwebtoken': '^9.0.5',
        bcrypt: '^5.1.1',
        '@types/bcrypt': '^5.0.2',
      };
    case 'session':
      return {
        'express-session': '^1.17.3',
        '@types/express-session': '^1.17.10',
      };
    case 'oauth':
      return {
        passport: '^0.7.0',
        'passport-google-oauth20': '^2.0.0',
        'passport-github2': '^0.1.12',
        '@types/passport': '^1.0.16',
      };
    default:
      return {};
  }
}
