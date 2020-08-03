import express, { json } from "express";
import { graphqlHTTP } from "express-graphql";

import Config from "./config";
import schemas from "./graphQLSchemas";
import resolves from "./graphQLResolves";
import { auth } from "./middleware";
import { errorHandler } from "./shared/error";
import "./db";

const app = express();
app.use(json());
app.use(auth);

app.use("/graphql", graphqlHTTP({
    schema: schemas,
    rootValue: resolves,
    graphiql: true
}));

errorHandler(app);

app.listen(Config.PORT, () => {
    console.log(`Server up on ${ Config.PORT }`)
});

