import express, { Application } from 'express';
import * as http from 'http';
import type { ExpressMiddleware } from '../types/express';
import type { ControllerBase } from '../types/IControllerBase.interface';

export class App {
	public app: Application;
	public port: number;

	constructor(appInit: {
    port: number;
    middleWares: ExpressMiddleware[];
    controllers: ControllerBase[];
  }) {
		this.app = express();
		this.port = appInit.port;

		this.middlewares(appInit.middleWares);
		this.routes(appInit.controllers);
	}

	public listen = () => {
		try {
			const server = http.createServer(this.app);

			server.listen(this.port, () => {
				console.log(` ➜ 🎸 Server is listening on port: ${this.port} :)`);
			});

			return server;
		} catch (error) {
			process.exit(1);
		}
	};

	private middlewares = (middleWares: ExpressMiddleware[]) => {
		middleWares.forEach((middleWare: ExpressMiddleware) => {
			this.app.use(middleWare);
		});
	};

	private routes = (controllers: ControllerBase[]) => {
		controllers.forEach(controller => {
			this.app.use('/', controller.router);
		});
	};
}
