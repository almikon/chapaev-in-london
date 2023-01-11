import Router, { Express, Request as IRequest, Response as IResponse } from 'express';

import { HttpCode } from '../../assets/constants';
import { createChatValidator } from '../../midleware/validation/chat/createChat.validator';
import { checkDataUserValidator } from '../../midleware/validation/user/checkDataUserValidator';
import { ControllersPath } from '../../types/controllersPath';
import { CommentsColumns, CommentsDto, UserColumns, UserDto } from '../../types/database';
import type { ControllerBase } from '../../types/IControllerBase.interface';
import type { CommentsServiceType } from '../../types/servicesTypes';
import type { UserEntity } from '../users/user.entity';

export class CommentsController implements ControllerBase {
	private path = ControllersPath.Comments;
	public router: Express = Router();
	private services: CommentsServiceType;

	constructor(services: CommentsServiceType) {
		this.services = services;
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.get(this.path, this.findAll);
		this.router.post(this.path, checkDataUserValidator, createChatValidator, this.create);
	};

	private findAll = async (_req: IRequest, res: IResponse) => {
		return res.status(HttpCode.OK).send(
			await this.services.commentsService.findAll()
		);
	};

	private create = async (req: IRequest, res: IResponse) => {
		const user = req.body.user as UserDto;
		// const chatId = req.body.chatId as number;
		const message = req.body.message as string;
		let userEntity: UserEntity;

		userEntity = await this.services.userService.findOneByFilter({
			[UserColumns.Login]: user.login
		});

		if (!userEntity) {
			userEntity = await this.services.userService.create(user);
		}

		const createCommentsDto: CommentsDto = {
			[CommentsColumns.Message]: message,
			[CommentsColumns.User]: userEntity,
			[CommentsColumns.UserId]:userEntity.id,
			[CommentsColumns.Parent_comment_id]:1,
		};
		return res.status(HttpCode.OK).send(await this.services.commentsService.create(createCommentsDto));
	};
}

