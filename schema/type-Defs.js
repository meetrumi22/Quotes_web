import { gql } from "apollo-server-core";
const typeDefs = gql`

    type Query {

        users:[User]
        quotes:[Quote]
    }
    type User{

        _id:ID
        firstName:String
        lastName:String
        email:String
        password:String
    }
    type Quote{
        data:String
        by:ID
    }
    type Token{
        token:String
    }
    type Mutation{

        userSignUp(signUpData:signUpDataInput):User
        userSignIn(signInData:signInDataInput):Token
        createQuote(quoteData:String!):String

    }
    input signInDataInput {

        email:String!
        password:String!
    }
    input signUpDataInput {

        firstName:String!   
        lastName:String!
        email:String!
        password:String!
        cPassword:String!
    }
`

export default typeDefs;