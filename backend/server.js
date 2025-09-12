import express from "express";
import cors from "cors";
import auth from "./middlewares/auth.js";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
// import adminRoutes from "./routes/admin.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080", // ou a porta do frontend
    credentials: true,
  })
);

app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);
// app.use("/", auth, isAdmin, adminRoutes, (req, res) => {
//   res.send("Bem-vindo, Admin!");
// });

app.listen(3000, () => {
  console.log("Servidor Rodando!");
});
