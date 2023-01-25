import { apiPathYandex } from '../assets/config';

export const prepareAvatarLink = (url: string | null | undefined) => {
	if (!url) {
		return '';
	}
	return `${apiPathYandex}/resources/${url}`;
};