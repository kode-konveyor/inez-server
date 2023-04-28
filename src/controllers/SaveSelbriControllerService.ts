import type express from "express";
import { HTTP_CREATED } from "../Constants.js";
import { SaveSelbriService } from "../dataAccess/SaveSelbriService.js";
import { NormalizeSelbriService } from "../services/NormalizeSelbriService.js";

export class SaveSelbriControllerService {
  constructor(
    readonly saveSelbri = SaveSelbriService.prototype.saveSelbri,
    readonly normalizeSelbri = NormalizeSelbriService.prototype.normalizeSelbri
  ) {}

  async saveSelbriController(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const selbri = await this.saveSelbri(req.body);
    res.status(HTTP_CREATED).send(this.normalizeSelbri(selbri));
  }
}
