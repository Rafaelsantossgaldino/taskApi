import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import http from "http";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import empresaRoutes from "./routes/empresa.routes";
import { requestInterceptor } from "./utils/requestInterceptor";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", requestInterceptor);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/empresa", empresaRoutes);


const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

// Verificar se o server esta em producao ou dev
const regularServer = http.createServer(app);

//PEGA A PORTA 9000 POR PADRAO
const serverPort: number = process.env.PORT
  ? parseInt(process.env.PORT)
  : 9000;
runServer(serverPort, regularServer);