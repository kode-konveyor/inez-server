/* eslint-disable @typescript-eslint/no-misused-promises */
import { CommonRoutesConfig } from "./CommonRoutesConfig.js";
import type express from "express";
import { GetSelbriControllerService } from "../controllers/GetSelbriControllerService.js";
import { SaveSelbriControllerService } from "../controllers/SaveSelbriControllerService.js";
import { BoundService } from "@kodekonveyor/cdd-ts/src/util/BoundService.js";
import { ListSelbrisControllerService } from "../controllers/ListSelbrisControllerService.js";
const MODEL = "model";

const bound = BoundService.prototype.bound;

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, MODEL);
  }

  override configureRoutes(): express.Application {
    this.app.route(`/model/:selbriId`).get(bound(GetSelbriControllerService));
    this.app
      .route(`/model`)
      .get(bound(ListSelbrisControllerService))
      .post(bound(SaveSelbriControllerService));
    return this.app;
  }
}
