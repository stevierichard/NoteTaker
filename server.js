const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const colors = require("colors");
const cowsay = require("cowsay");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./Develop/public/"));

const htmlRoutes = require("./routes/html-routes");
app.use(htmlRoutes);

const apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(
    cowsay.say({
      text: "\n listening: ".bold + `http://localhost:${PORT}\n`.rainbow,
      e: "oO",
      T: "U",
    })
  );
});
