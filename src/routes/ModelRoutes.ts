/* eslint-disable @typescript-eslint/no-misused-promises */
import { CommonRoutesConfig } from "./CommonRoutesConfig.js";
import { bound } from "cdd-ts";
import type express from "express";
import { GetSelbriControllerService } from "../controllers/GetSelbriControllerService.js";
import { SaveSelbriControllerService } from "../controllers/SaveSelbriControllerService.js";

const MODEL = "model";

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
