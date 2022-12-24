const { API_PATH, REDIRECT_URI } = process.env;

export const apiPath = API_PATH || '';
export const redirectUri = REDIRECT_URI || 'http://localhost:5000/';
export const limitShowChatPreview = 6;
export const limitShowChatMessage = 6;
