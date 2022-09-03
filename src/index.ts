import { app } from "./app";
import connectionTest from "./endpoints/connectionTest";

app.get("/connectionTest", connectionTest)