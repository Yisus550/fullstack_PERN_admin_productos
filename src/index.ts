import colors from "colors";
import server from "./server";

const port = process.env.PORT || 4000;

server.listen(port, () => {
  //* Start the server
  console.info(colors.cyan.bold(`Server is running on http://localhost:${port}`));
});
