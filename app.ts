import express from "express";
import * as http from "http";

import cors from "cors";
import { UsersRoutes } from "./src/routes/ModelRoutes.js";
import { HTTP_OK } from "./src/Constants.js";
import { type CommonRoutesConfig } from "./src/routes/CommonRoutesConfig.js";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());

app.use(cors());

routes.push(new UsersRoutes(app));

const runningMessage = `Server is running`;

const ROOT_PATH = "/";

app.get(ROOT_PATH, (req: express.Request, res: express.Response) => {
  res.status(HTTP_OK).send(runningMessage);
});

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
