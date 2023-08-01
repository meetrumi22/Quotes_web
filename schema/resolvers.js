
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

import { User } from "./UserSchema.js";
import { Quote } from "./quoteSchema.js";
dotenv.config({ path: ".env" })
const resolvers = {

    Query: {
        users: async () => await User.find({}),
        quotes: async () => await Quote.find({})
    },
    Mutation: {
        userSignUp: async (_, { signUpData }) => {
            console.log({ signUpData })
            const user = await User.findOne({ email: signUpData.email })
            if (user) {
                throw new Error("User Already have an account")
            }

            const hashPassword = await bcrypt.hash(signUpData.password, 12)
            console.log({ hashPassword })
            const newUser = new User({
                ...signUpData,
                password: hashPassword
            })
            console.log({ newUser })

            return await newUser.save();
        },
        userSignIn: async (_, { signInData }) => {
            console.log({ signInData })
            const user = await User.findOne({ email: signInData.email })
            if (!user) {
                throw new Error("Sir! you Don't have an account")
            }

            const doMatch = await bcrypt.compare(signInData.password, user.password)

            console.log("signInData", signInData)
            console.log("signInData", signInData.password)
            console.log("user.passwrd = ", user.password)
            // const hashOfLoginPassword = await bcrypt.hash(userSignIn.password, 12)
            // const doMatch = hashOfLoginPassword === user.password
            if (!doMatch) {
                throw new Error("Email and Password is Invalid");
            }

            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)

            return { token }
        },
        createQuote: async (_, { quoteData }, { userId }) => {

            if (!userId) {
                throw new Error("Log in required!")
            }

            const newQuote = Quote({
                data: quoteData,
                by: userId
            })

            await newQuote.save();

            return "Quote Created successfully"
        }
    }
}

export default resolvers;