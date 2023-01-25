import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { sequelize } from '../database/sequelize';
import { ChatController } from '../modules/chat/chat.controller';
import { ChatService } from '../modules/chat/chat.service';
import { UserController } from '../modules/users/user.controller';
import { CommentsController } from '../modules/comments/comments.controller';
import { CommentsService } from '../modules/comments/comments.service';
import { UserService } from '../modules/users/user.service';
import { App } from './app';

// const isDev = () => process.env.NODE_ENV === 'development';

export const server = {
	name: '--server',
	run: async (serverPort: number) => {
		await sequelize.sync({ force: true });

		// const distPath = path.dirname(require.resolve('chapaevinlondon/dist/index.html'));
		// const srcPath = path.dirname(require.resolve('chapaevinlondon'));
		// const ssrClientPath = require.resolve('chapaevinlondon/ssr-dist/chapaevinlondon.cjs');
		//
		// let vite: ViteDevServer | undefined;

		// const middleWares = [];

		// if (isDev()) {
		// 	vite = await createViteServer({
		// 		server: { middlewareMode: true },
		// 		root: srcPath,
		// 		appType: 'custom'
		// 	});
		//
		// 	middleWares.push(vite.middlewares);
		// }
		//
		// //TODO
		// // if (!isDev()) {
		// //   middleWares.push('/assets', express.static(path.resolve(distPath, 'assets')));
		// // }
		//
		// const test = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		// 	const url = req.originalUrl;
		//
		// 	try {
		// 		let template: string;
		//
		// 		if (!isDev()) {
		// 			template = fs.readFileSync(
		// 				path.resolve(distPath, 'index.html'),
		// 				'utf-8'
		// 			);
		// 		} else {
		// 			template = fs.readFileSync(
		// 				path.resolve(srcPath, 'index.html'),
		// 				'utf-8'
		// 			);
		//
		// 			template = await vite!.transformIndexHtml(url, template);
		// 		}
		//
		// 		let render: (url: string) => Promise<string>;
		//
		// 		if (!isDev()) {
		// 			render = (await import(ssrClientPath)).render;
		// 		} else {
		// 			render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
		// 		}
		//
		// 		const appHtml = await render(url);
		//
		// 		const html = template.replace('<!--ssr-outlet-->', appHtml);
		//
		// 		res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		// 	} catch (e) {
		// 		if (isDev()) {
		//       vite!.ssrFixStacktrace(e as Error);
		// 		}
		// 		next(e);
		// 	}
		// };
		//
		// // @ts-ignore
		// middleWares.push(test);

		const app = new App({
			controllers: [
				new ChatController({
					chatService: new ChatService(sequelize),
					userService: new UserService(sequelize),
				}),
				new UserController({
					userService: new UserService(sequelize),
				}),
				new CommentsController({
					commentsService: new CommentsService(sequelize),
					userService: new UserService(sequelize)
				}),
			],
			middleWares: [cors({
				origin: true,
				credentials: true
			}),
			express.json({ limit: '2MB' }),
			bodyParser.json(),
			bodyParser.urlencoded({ extended: true })],
			port: serverPort
		});

		app.listen();
	},
};
