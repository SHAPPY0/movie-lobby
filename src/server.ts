import express, { Application } from "express";
import NewApp from "./app";

const app: Application = express();
new NewApp(app);

app.listen(8100, () => {
    console.log(`Server running on localhost:${8100}`);
}).on("error", (ex) => console.log(`Error: ${ex}`));

export default app;