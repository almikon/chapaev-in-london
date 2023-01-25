import { DEFAULT_COMMAND } from './assets/constants';
import { Cli } from './cli';
import { ARGUMENTS, SERVER_PORT } from './config/config.env';

// получение аргумента запуска
const [command] = ARGUMENTS;

// проверка соответствия команды запуска и имени сервиса
const isNotExistCommand = !Cli[command];

declare global {
  interface Window {
    // В d.ts нам неважно что это за тип,
    // так как он сразу попадает в redux store на клиенте
    __PRELOADED_STATE__?: object;
  }
}

// если не определен аргумент запуска, то запускается по умолчанию сервер
if (ARGUMENTS.length === 0 || isNotExistCommand) {
	Cli[DEFAULT_COMMAND].run(SERVER_PORT);
} else {
	Cli[command].run(SERVER_PORT);
}
