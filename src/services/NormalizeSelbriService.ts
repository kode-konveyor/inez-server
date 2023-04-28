import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class NormalizeSelbriService {
  normalizeSelbri(selbri: SelbriDTO): SelbriDTO {
    return { id: selbri.id, representation: selbri.representation };
  }
}
