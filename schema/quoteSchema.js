import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema({

    data: {
        type: String,
        require: true
    },
    by: {
        type: String,
        ref: "User"
    }
})

export const Quote = mongoose.model("Quote", quoteSchema)