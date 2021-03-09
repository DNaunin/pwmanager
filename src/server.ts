import http from "http";
import dotenv from "dotenv";
import {
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  readPasswordDoc,
} from "./db";
import type { PasswordDoc } from "./db";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "pwmanager-dörte");

const parseJSONBody = <T>(request: http.IncomingMessage): Promise<T> => {
  return new Promise((resolve) => {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
};

const server = http.createServer(async (request, response) => {
  if (request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Password Manager</h1>");
    return;
  }
  const parts = request.url.split("/");
  const passwordName = parts[parts.length - 1];

  if (request.method === "GET") {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 404;
      response.end();
      return;
    }
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(passwordDoc));
    return;
  }

  if (request.method === "POST") {
    const newPassword = await parseJSONBody<PasswordDoc>(request);
    const passwordDoc = await createPasswordDoc(newPassword);
    // if (passwordDoc) {
    //   response.statusCode = 409;
    //   response.end();
    //   return;
    // }
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(passwordDoc));
  }

  if (request.method === "DELETE") {
    const passwordDoc = await deletePasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 404;
      response.end();
      return;
    }
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(passwordDoc));
    return;
  }

  response.end();
});

server.listen(port, () => {
  console.log(`The Server is running at http://localhost:${port} `);
});
