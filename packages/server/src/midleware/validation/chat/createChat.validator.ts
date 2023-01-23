import type { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { checkErrorOrNext } from '../index';

const schema = Joi.string().required().trim();

export const createChatValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errorMessage = 'Invalid data chat';
	const data = req.body.title;

	return checkErrorOrNext<string>(res, next, schema, data, errorMessage);
};
