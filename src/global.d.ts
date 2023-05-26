declare namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: string;
        JWT_ACCESS_EXPIRATION_MINUTES: string;
    }
}