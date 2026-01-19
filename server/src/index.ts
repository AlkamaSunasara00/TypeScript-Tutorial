import express  from "express";
import cors from 'cors';

import router from "./routes/user";

const PORT = 5000;
const app = express();
app.use(cors())


app.use("/",router)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});