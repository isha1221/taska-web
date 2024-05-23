const Remote_Url: string = import.meta.env.VITE_API_BASE_REMOTE;
const Local_Url: string = import.meta.env.VITE_API_BASE_LOCAL;

export const Base_Url = Remote_Url || Local_Url;
