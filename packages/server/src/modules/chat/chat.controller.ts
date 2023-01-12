import Router, { Express, Request as IRequest, Response as IResponse } from 'express';

import { HttpCode } from '../../assets/constants';
import { createChatValidator } from '../../midleware/validation/chat/createChat.validator';
import { checkDataUserValidator } from '../../midleware/validation/user/checkDataUserValidator';
import { ControllersPath } from '../../types/controllersPath';
import { ChatColumns, ChatDto, UserColumns, UserDto } from '../../types/database';
import type { ControllerBase } from '../../types/IControllerBase.interface';
import type { ChatServiceType } from '../../types/servicesTypes';
import type { UserEntity } from '../users/user.entity';

export class ChatController implements ControllerBase {
	private path = ControllersPath.Chat;
	public router: Express = Router();
	private services: ChatServiceType;

	constructor(services: ChatServiceType) {
		this.services = services;
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.get(this.path, this.findAll);
		// console.log(this);
		this.router.post(this.path, checkDataUserValidator, createChatValidator, this.create);
	};

	private findAll = async (_req: IRequest, res: IResponse) => {
		return res.status(HttpCode.OK).send(
			await this.services.chatService.findAll()
		);
	};

	private create = async (req: IRequest, res: IResponse) => {
		const user = req.body.user as UserDto;
		const title = req.body.title as string;
		let userEntity: UserEntity;

		userEntity = await this.services.userService.findOneByFilter({
			[UserColumns.Login]: user.login
		});

		if (!userEntity) {
			userEntity = await this.services.userService.create(user);
		}

		const createChatDto: ChatDto = {
			[ChatColumns.Title]: title,
			[ChatColumns.User]: userEntity,
			[ChatColumns.UserId]: userEntity.id,
			[ChatColumns.LastMessageId]: null
		};
		return res.status(HttpCode.OK).send(await this.services.chatService.create(createChatDto));
	};
}

