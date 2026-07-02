// Si existe la variable de Vercel, le sumamos el "/api" automáticamente. Si no, usa localhost
export const URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : "http://localhost:3000/api";
