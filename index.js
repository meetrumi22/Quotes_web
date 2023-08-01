import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

import typeDefs from "./schema/type-Defs.js"
import resolvers from "./schema/resolvers.js"

dotenv.config({ path: ".env" })

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {

        const { authorization } = req.headers;
        if (authorization) {
            const { userId } = jwt.verify(authorization, process.env.SECRET_KEY)
            return { userId }
        }
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({ url }) => {
    console.log("server is runing on port", url)
})