import { apiPathYandex } from '../assets/config';

export const prepareAvatarLink = (url: string | null) => {
	if (!url) {
		return '';
	}
	return `${apiPathYandex}/resources/${url}`;
};