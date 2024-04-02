import express from "express";
import dataServices from "../services/dataServices";

const app = express();
app.use(express.json());
const PORT = 3000;
app.listen(PORT, async() => {
  console.log("-RUN-");
});
app.route("/data").get(async function (req, res) {
  try {
    const respuesta = await dataServices.getTAT();
    res.json({ respuesta: respuesta });
  } catch (error) {
    console.log(error);
  }
});


