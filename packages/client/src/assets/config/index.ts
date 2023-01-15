const { API_PATH, API_PATH_CHAPAEV, REDIRECT_URI, OAUTH_YANDEX } = process.env;

export const oAuthYandex = OAUTH_YANDEX || 'https://oauth.yandex.ru';
export const redirectUri = REDIRECT_URI || 'http://localhost:3001/';
export const apiPathYandex = API_PATH || 'https://ya-praktikum.tech/api/v2';
export const apiPathChapaev = API_PATH_CHAPAEV || 'http://localhost:3001/api';
export const limitShowChatPreview = 6;
export const limitShowChatMessage = 6;
