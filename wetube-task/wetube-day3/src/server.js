import e from "express";
import express from "express";

const app = express();

const PORT = 4000;

const URLLogger = (req, res, next) => {
  console.log("PATH:", req.path);
  next();
};

const timeLogger = (req, res, next) => {
  const date = new Date();
  console.log(
    `Time: ${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
  );
  next();
};

const securityLogger = (req, res, next) => {
  if (req.protocol === "https") {
    console.log("Secure");
  } else {
    console.log("Insecure");
  }
  next();
};

const protectorMiddleware = (req, res, next) => {
  if (req.path === "/protected") {
    return;
  }
  next();
};

app.use(protectorMiddleware);
app.use(URLLogger);
app.use(timeLogger);
app.use(securityLogger);
app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)
const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
