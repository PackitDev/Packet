export default {
    auth: {
        provider: '{{AUTH_PROVIDER}}',
        jwt: {
            secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
            expiresIn: '7d',
        },
    },
    database: {
        type: '{{DATABASE_TYPE}}',
        url: process.env.DATABASE_URL || '{{DATABASE_URL}}',
    },
    routes: {
        dir: './routes',
    },
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || '0.0.0.0',
};
