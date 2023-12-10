const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const uri =
  "mongodb+srv://Fernando:abba2202.@cluster0.jdri4uf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function conectar() {
  try {
    await client.connect();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error" + error);
  }
}


app.get("/", async (req, res) => {
  res.render("index")
});

app.post("/subir", async (req, res) => {
  try {
    await conectar();
    const db = client.db("tienda");
    const { titulo, contenido } = req.body;
    await db.collection("products").insertOne({ titulo, contenido });
  } catch (error) {
    console.log("Error al insertar datos:", error);
  } finally {
    await client.close();
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server en linea en el puerto 3000");
});
