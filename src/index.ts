import colors from "colors";
import server from "./server";

const port = process.env.PORT || 7001;

server.listen(port, () => {
  //* Start the server
  console.info(colors.cyan.bold(`Server is running on http://localhost:${port}`));
});
