import { PHL342Server } from "./server";

const server = new PHL342Server();

server.listen(port => {
    console.log(`Server is listening on http://localhost:${port}`);
});