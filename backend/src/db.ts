import { connect, connection, connections } from "mongoose";

import Config from "./config";

const db = connect(Config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

connection.on("open", () => {
    const info = connections[0];
    console.log(`Connected to
        host: ${ info.host },
        port: ${ info.port },
        name: ${ info.name },
    `);
});

export default db;
