import { SelbriDAO } from "../DAO/SelbriDAO.js";
import { MongooseProvider } from "../DAO/MongooseProvider.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class GetSelbriByIdService {
  async getSelbriById(id: string): Promise<SelbriDTO | undefined> {
    await MongooseProvider.makeSureIsConnected();
    const selbri = await SelbriDAO.findById(id);
    if (selbri == null) return undefined;
    return selbri;
  }
}
