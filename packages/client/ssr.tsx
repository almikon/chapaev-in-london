import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './src/components/app/App';

export const render = (url: string) => {
// export function render(store, url){
	// <Provider store={store}
	return renderToString(
		<StaticRouter location={url}>
			<App/>
		</StaticRouter>
	);
};
