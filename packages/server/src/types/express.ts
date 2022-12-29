import type { NextFunction, Request, Response } from 'express';

type TypedRequest<ReqBody = Record<string, unknown>,
  QueryString = Record<string, unknown>> = Request<Record<string, unknown>,
  Record<string, unknown>,
  Partial<ReqBody>,
  Partial<QueryString>>;

export type ExpressMiddleware<ReqBody = Record<string, unknown>,
  Res = Record<string, unknown>,
  QueryString = Record<string, unknown>> = (
  req: TypedRequest<ReqBody, QueryString>,
  res: Response<Res>,
  next: NextFunction
) => Promise<void> | void;
