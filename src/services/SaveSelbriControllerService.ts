import type express from "express";
import { HTTP_CREATED } from "../Constants.js";
import { SaveSelbriService } from "../dataAccess/SaveSelbriService.js";

export class SaveSelbriControllerService {
  constructor(readonly saveSelbri = SaveSelbriService.prototype.saveSelbri) {}

  async saveSelbriController(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const selbri = await this.saveSelbri(req.body);
    res
      .status(HTTP_CREATED)
      .send({ id: selbri.id, representation: selbri.representation });
  }
}
