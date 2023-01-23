export const DEFAULT_COMMAND = '--server';
export const ARGV_INDEX = 2;

export const ExitCode = {
	error: 1,
	success: 0,
};

export const Env = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
};

export const HttpCode = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	NOT_ACCEPTABLE: 406,
	INTERNAL_SERVER_ERROR: 500,
};
