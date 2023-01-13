import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import type { ViteDevServer } from 'vite';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const isDev = () => process.env.NODE_ENV === 'development';

const startServer = async () => {
	const app = express();
	const port = Number(process.env.SERVER_PORT) || 3001;
	app.use(cors());

	// можно просто указать напрямую откуда юрать
	// path.resolve('../chapaevinlondon/dist/index.html')
	const distPath = path.dirname(require.resolve('chapaevinlondon/dist/index.html'));
	const srcPath = path.dirname(require.resolve('chapaevinlondon'));
	const ssrClientPath = require.resolve('chapaevinlondon/ssr-dist/chapaevinlondon.cjs');

	let vite: ViteDevServer | undefined;

	if (isDev()) {
		vite = await createViteServer({
			server: { middlewareMode: true },
			root: srcPath,
			appType: 'custom'
		});

		app.use(vite.middlewares);
	}

	// щас не используется
	app.get('/api', (_, res) => {
		res.json('👋 Howdy from the server :)');
	});

	if (!isDev()) {
		app.use('/assets', express.static(path.resolve(distPath, 'assets')));
	}

	app.use('*', async (req, res, next) => {
		const url = req.originalUrl;

		try {
			let template: string;

			if (!isDev()) {
				template = fs.readFileSync(
					path.resolve(distPath, 'index.html'),
					'utf-8'
				);
			} else {
				template = fs.readFileSync(
					path.resolve(srcPath, 'index.html'),
					'utf-8'
				);

				template = await vite!.transformIndexHtml(url, template);
			}

			let render: (url: string) => Promise<string>;

			if (!isDev()) {
				render = (await import(ssrClientPath)).render;
			} else {
				render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
			}

			const appHtml = await render(url);

			const html = template.replace('<!--ssr-outlet-->', appHtml);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
			}
			next(e);
		}
	});

	app.listen(port, () => {
		console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
	});
};

startServer();
