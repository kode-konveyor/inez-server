import type express from "express";
import { HTTP_CREATED } from "../Constants.js";
import { SaveSelbriService } from "../dataAccess/SaveSelbriService.js";

export class SaveSelbriControllerService {
  constructor(readonly saveSelbri = SaveSelbriService.prototype.saveSelbri) {}

  saveSelbriController(req: express.Request, res: express.Response): void {
    res.status(HTTP_CREATED).send(this.saveSelbri(req.body));
  }
}
