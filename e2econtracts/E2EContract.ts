import fetch from "node-fetch";
import { SelbriTestData } from "../testdata/SelbriTestData.js";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";
import { serialize } from "cdd-ts";

const URL = "http://localhost:3000/model/";

export const E2EContractParties = [1];
export const E2EContract = {
  check: async () => {
    const postResponse = await fetch(URL + "1", {
      method: "POST",
      body: JSON.stringify(SelbriTestData.default),
      headers: { "Content-Type": "application/json" },
    });
    if (postResponse.status !== 201)
      throw new Error(String(postResponse.status));
    const data: SelbriDTO = (await postResponse.json()) as SelbriDTO;
    if (
      data.representation !== SelbriTestData.default.representation ||
      String(Object.keys(data)) !== "id,representation"
    )
      throw new Error(String(Object.keys(data)));

    const getResponse = await fetch(URL + data.id);
    if (getResponse.status !== 200) throw new Error(String(getResponse.status));
    const getData: SelbriDTO = (await getResponse.json()) as SelbriDTO;
    if (serialize(getData) !== serialize(data))
      throw new Error(serialize(getData));
    return 1;
  },
};