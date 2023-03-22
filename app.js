import express from "express";
import routers from "./src/routers/index.routers.js";
import { __dirname } from "./src/utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/* handlebars */
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

/* routers */
app.use("/", routers);
app.use("/api", routers);

/* server */
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${httpServer.address().port}`);
  console.log(`http://localhost:${PORT}`);
});
httpServer.on("error", error =>
  console.log(`Error en servidor: ${error.message}`)
);

/* webSocket */
const socketServer = new Server(httpServer);
