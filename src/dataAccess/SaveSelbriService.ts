import { SelbriDAO } from "../DAO/SelbriDAO.js";
import { MongooseProvider } from "../DAO/MongooseProvider.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class SaveSelbriService {
  async saveSelbri(element: SelbriDTO): Promise<SelbriDTO> {
    await MongooseProvider.makeSureIsConnected();
    const saved = new SelbriDAO(element);
    await saved.save();
    return saved;
  }
}
