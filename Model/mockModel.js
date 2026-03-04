const mongoose = require("mongoose");
const {Schema, model} = mongoose;
// This mongoose schema is primarily for template purposes.
const mockSchema = new Schema(
    {
        Other_ID:{
            type: Number,
            required: true,
        },
        Content_Mocker:{
            type:String,
            required:true,
        }
    },
    {timestamps: true}
);


module.exports = model("mockModel", mockSchema);