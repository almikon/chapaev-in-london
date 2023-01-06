import type { Express } from 'express';

export interface ControllerBase {
  initRoutes(): any;

  router: Express;
}
