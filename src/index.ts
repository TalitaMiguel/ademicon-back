import { app } from "./app";
import connectionTest from "./endpoints/connectionTest";
import { deleteUser } from "./endpoints/deleteUser";
import { getAllUser } from "./endpoints/getAllUser";
import { getUserById } from "./endpoints/getUserById";
import { postLogin } from "./endpoints/postLogin";
import { postUser } from "./endpoints/postUser";
import { putUser } from "./endpoints/putUser";


app.get("/connectionTest", connectionTest)
app.get("/users", getAllUser)
app.get("/users/byId/:id", getUserById)

app.post("/users", postUser)
app.post("/users/login", postLogin)

app.put("/users/:id", putUser)

app.delete("/users/:id", deleteUser)