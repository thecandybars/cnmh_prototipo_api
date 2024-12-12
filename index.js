const server = require("./src/app.js");
const { conn } = require("./src/db.js");

require("dotenv").config();

const port = process.env.PORT;

const force = false;
const alter = true;
conn.sync({ force, alter }).then(() => {
  server.listen(port, async () => {
    console.log(`Listening at ${port}`);
  });
});
