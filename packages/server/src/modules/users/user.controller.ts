import Router, { Express, Request as IRequest, Response as IResponse } from 'express';
import { HttpCode } from '../../assets/constants';
import { checkDataUserValidator } from '../../midleware/validation/user/checkDataUserValidator';
import { ControllersPath } from '../../types/controllersPath';
import { UserColumns, UserDto, UserUpdateDto } from '../../types/database';
import type { ControllerBase } from '../../types/IControllerBase.interface';
import type { UserServiceType } from '../../types/servicesTypes';

export class UserController implements ControllerBase {
	public router: Express = Router();
	private pathUser = ControllersPath.Api + ControllersPath.User;
	private pathUserChange = ControllersPath.Api + ControllersPath.UserChange;
	private services: UserServiceType;

	constructor(services: UserServiceType) {
		this.services = services;
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.post(this.pathUser, this.findUser);
		this.router.put(this.pathUserChange, checkDataUserValidator, this.changeUser);
		this.router.post(this.pathUser, this.findUsers);
	};

	private findUsers = async (_req: IRequest, res: IResponse) => {
		const users = await this.services.userService.findAll();
		return res.status(HttpCode.OK).send(users);
	};

	private findUser = async (req: IRequest, res: IResponse) => {
		const user = req.body as UserDto;

		const findUser = await this.services.userService.findOneByFilter({
			[UserColumns.Login]: user[UserColumns.Login]
		});

		if (findUser) {
			return res.status(HttpCode.OK).send(findUser);
		}

		return res.status(HttpCode.OK).send(await this.services.userService.create(user));
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
