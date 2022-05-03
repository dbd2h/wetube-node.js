import "./db";
import Video from "./models/Video";
import User from "./models/User";
import app from "./server";

const PORT = 4001;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
