import mongoose from "mongoose";
import { SELBRI_SCHEMA } from "./Constants.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

const selbriSchema = new mongoose.Schema<SelbriDTO>({
  representation: { type: String, required: true },
  references: [{ type: String }],
});

export const SelbriDAO = mongoose.model<SelbriDTO>(SELBRI_SCHEMA, selbriSchema);
