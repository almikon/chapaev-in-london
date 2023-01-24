import Router, {
	Express,
	Request as IRequest,
	Response as IResponse,
} from 'express';
import { HttpCode } from '../../assets/constants';
import { ControllersPath } from '../../types/controllersPath';
import { UserColumns, UserDto } from '../../types/database';
import type { ControllerBase } from '../../types/IControllerBase.interface';
import type { UserServiceType } from '../../types/servicesTypes';

export class UserController implements ControllerBase {
	private pathUser = ControllersPath.User;
	private pathUserTheme = ControllersPath.UserTheme;
	public router: Express = Router();
	private services: UserServiceType;

	constructor(services: UserServiceType) {
		this.services = services;
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.post(this.pathUser, this.findUser);
		this.router.put(this.pathUserTheme, this.changeTheme);
	};

	private findOrCreateUserEntity = async (user: UserDto) => {
		let userEntity = await this.services.userService.findOneByFilter({
			[UserColumns.Login]:user.login,
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

	private changeTheme = async (req: IRequest, res: IResponse) => {
		const user = req.body as UserDto;
		const userEntity = await this.findOrCreateUserEntity(user);

		if (userEntity) {
			const changeTheme = await this.services.userService.changeTheme(
				user.theme,
				{
					[UserColumns.Login]:user.login
				},
			);
			return res.status(HttpCode.OK).send(!!changeTheme);
		}
		else {
			return res.status(HttpCode.NOT_FOUND).send(false);
		}
	};
}
