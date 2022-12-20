import express, { Application } from 'express';
import * as http from 'http';

export class App {
	public app: Application;
	public port: number;

	constructor(appInit: { port: number, middleWares: any, controllers: any }) {
		this.app = express();
		this.port = appInit.port;

		// мидлвары для всех роутов
		this.middlewares(appInit.middleWares);

		// добавление роутов в приложение
		this.routes(appInit.controllers);
	}

	public listen() {
		try {
			const server = http.createServer(this.app);

			server.listen(this.port, () => {
				console.log(` ➜ 🎸 Server is listening on port: ${this.port} :)`);
			});

			return server;
		} catch (error) {
			process.exit(1);
		}
	}

	private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
		middleWares.forEach((middleWare) => {
			this.app.use(middleWare);
		});
	}

	private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
		controllers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
	}
}
