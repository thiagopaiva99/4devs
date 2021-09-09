export const apiUrlFactory = (path: string): string => {
    return `process.env.API_URL${path}`;
} 