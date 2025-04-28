export const getValue = (key: string) => import.meta.env[`VITE_${key}`];
