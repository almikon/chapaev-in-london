import { FC, SyntheticEvent } from 'react';
import styles from './Avatar.module.sass';

type AvatarProps = {
  size?: 'small' | 'large';
  src: string;
  alt?: string;
  type?: 'upload';
  onClick?: (e: SyntheticEvent) => void;
};

export const Avatar: FC<AvatarProps> = ({ alt, src, size, type, onClick }) => {
	if (src) {
		return (
			<img
				className={`${styles.avatar} ${size ? styles[size] : ''} ${type && styles.avatar_edit}`}
				alt={alt}
				src={src}
				onClick={onClick}
			/>

		);
	} else {
		return <div
			className={`${styles.avatar} ${styles.avatar__noAvatar} ${styles.avatar_edit}`}
			onClick={onClick}
		/>;
	}
};
