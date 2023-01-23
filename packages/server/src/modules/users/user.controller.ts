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
import type { UserEntity } from './user.entity';

export class UserController implements ControllerBase {
	private path = ControllersPath.User;
	public router: Express = Router();
	private services: UserServiceType;

	constructor(services: UserServiceType) {
		this.services = services;
		this.initRoutes();
	}

	public initRoutes = () => {
		this.router.post(this.path, this.findUser);
	};

	private findUser = async (req: IRequest, res: IResponse) => {
		const user = req.body as UserDto;
		let userEntity: UserEntity;

		userEntity = await this.services.userService.findOneByFilter({
			[UserColumns.Login]: user.login,
		});

		if (!userEntity) {
			userEntity = await this.services.userService.create(user);
		}

		return res.status(HttpCode.OK).send(await userEntity);
	};
}
