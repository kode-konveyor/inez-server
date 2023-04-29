/* eslint-disable @typescript-eslint/no-misused-promises */
import { CommonRoutesConfig } from "./CommonRoutesConfig.js";
import type express from "express";
import { GetSelbriControllerService } from "../controllers/GetSelbriControllerService.js";
import { SaveSelbriControllerService } from "../controllers/SaveSelbriControllerService.js";
import { BoundService } from "cdd-ts/src/util/BoundService.js";
const MODEL = "model";

const bound = BoundService.prototype.bound;

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, MODEL);
  }

  override configureRoutes(): express.Application {
    this.app
      .route(`/model/:selbriId`)
      .get(bound(GetSelbriControllerService))
      .post(bound(SaveSelbriControllerService));
    return this.app;
  }
}
