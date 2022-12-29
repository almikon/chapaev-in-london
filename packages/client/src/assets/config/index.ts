const { API_PATH, REDIRECT_URI, OAUTH_YANDEX } = process.env;

export const apiPath = API_PATH || '';
export const oAuthYandex = OAUTH_YANDEX || 'https://oauth.yandex.ru';
export const redirectUri = REDIRECT_URI || 'http://localhost:5000/';
export const limitShowChatPreview = 6;
export const limitShowChatMessage = 6;
