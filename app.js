import express from "express";
import routers from "./src/routers/index.routers.js";
import { __dirname } from "./src/utils.js";
import handlebars from "express-handlebars";
import ProductManager from "./src/controllers/productManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager("src/db/products.json");

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

app.get("/", async (req, res) => {
  const products = await productManager.getAll();
  console.log(products);
  res.render("home", {
    style: "home.css",
    title: "Home",
    products: products,
  });
});

app.use("/api", routers);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${PORT}`);
});
server.on("error", error => console.log(`Error en servidor: ${error.message}`));
