import { Router } from "express";
import { MessagesController } from "./controllers/MessagesControlle";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsController();
const usersConroller = new UsersController();
const messagesConroller = new MessagesController();


/**
 * Tipos de parâmetros
 * Route Params => Parametros de rotas
 * http://localhost:3333/settings/1
 * Query Params => Filtros e buscas
 * http://localhost:3333/settings/1?search=algumacoisa&type=outracoisa
 * Body Params => {
 * 
 * }
 */

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", usersConroller.create);

routes.post("/messages", messagesConroller.create);
routes.get("/messages/:id", messagesConroller.showByUser);


export { routes };