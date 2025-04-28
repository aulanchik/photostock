const getVariable = (name: string) => import.meta.env[`VITE_${name}`];

export default getVariable;
