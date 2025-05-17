import dotenv from "dotenv/config";
import server from "./src/server.js";

server.listen(3000, () => {
  console.log("listening on 3000");
});
