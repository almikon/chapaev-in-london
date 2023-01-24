import Router, { Express, Request as IRequest, Response as IResponse } from 'express';
import { HttpCode } from '../../assets/constants';
import { checkDataUserValidator } from '../../midleware/validation/user/checkDataUserValidator';
import { ControllersPath } from '../../types/controllersPath';
import { UserColumns, UserDto, UserUpdateDto } from '../../types/database';
import type { ControllerBase } from '../../types/IControllerBase.interface';
import type { UserServiceType } from '../../types/servicesTypes';

export class UserController implements ControllerBase {
	public router: Express = Router();
	private pathUser = ControllersPath.User;
	private pathUserTheme = ControllersPath.UserTheme;
	private services: UserServiceType;

	constructor(services: UserServiceType) {
		this.services = services;
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.post(this.pathUser, this.findUser);
		this.router.put(this.pathUserTheme, checkDataUserValidator, this.changeUser);
	};

	private findOrCreateUserEntity = async (user: UserDto) => {
		let userEntity = await this.services.userService.findOneByFilter({
			[UserColumns.Login]: user.login
		});
		if (!userEntity) {
			userEntity = await this.services.userService.create(user);
		}
		return userEntity;
	};

	private findUser = async (req: IRequest, res: IResponse) => {
		const user = req.body as UserDto;
		const userEntity = await this.findOrCreateUserEntity(user);

		return res.status(HttpCode.OK).send(await userEntity);
	};

	private changeUser = async (req: IRequest, res: IResponse) => {
		const userUpdate = req.body.user as UserUpdateDto;

		const findUser = await this.services.userService.findOneByFilter({
			[UserColumns.Login]: userUpdate[UserColumns.Login]
		});

		if (findUser) {
			return res.status(HttpCode.OK).send(await this.services.userService.update(findUser[UserColumns.ID], userUpdate));
		}

		return res.status(HttpCode.NOT_FOUND).send(false);
	};
}
