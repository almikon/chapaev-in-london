import type { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import type { UserDto } from '../../../types/database';
import { checkErrorOrNext } from '../index';

const schema = Joi.object().keys({
	first_name: Joi.string().required().trim(),
	second_name: Joi.string().required().trim(),
	display_name: Joi.string().allow(null, ''),
	login: Joi.string().required().trim(),
	email: Joi.string().email().required().trim(),
	phone: Joi.string().required().trim(),
	avatar: Joi.string().allow(null, '')
});

export const checkDataUserValidator = (req: Request, res: Response, next: NextFunction) => {
	const errorMessage = 'Invalid data user';
	const data = req.body.user;
	return checkErrorOrNext<UserDto>(res, next, schema, data, errorMessage);
};
