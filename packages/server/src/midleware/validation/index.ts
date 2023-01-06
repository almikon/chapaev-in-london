import type { NextFunction, Response } from 'express';
import type { Schema } from 'joi';
import { HttpCode } from '../../assets/constants';

export const checkErrorOrNext = <T>(res: Response, next: NextFunction, schema: Schema, data: T | undefined, message: string) => {
	const errorMessage = {
		message
	};

	if (!data) {
		return res.status(HttpCode.BAD_REQUEST).send(errorMessage);
	}

	const { error } = schema.validate(data);

	if (error) {
		errorMessage.message = error.details[0].message;
		return res.status(HttpCode.BAD_REQUEST).send(errorMessage);
	}

	return next();
};
