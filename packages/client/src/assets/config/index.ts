const { API_PATH, API_PATH_CHAPAEV, REDIRECT_URI, OAUTH_YANDEX } = process.env;

export const oAuthYandex = OAUTH_YANDEX;
export const redirectUri = REDIRECT_URI;
export const apiPathYandex = API_PATH || '';
export const apiPathChapaev = API_PATH_CHAPAEV || '';
export const limitShowChatPreview = 6;
export const limitShowChatMessage = 6;
