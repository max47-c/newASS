import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
    email: {type: "string", requied: true, unique: true },
    name: {type: "string", requied: true, unique: true },
    password: {type: "string", requied: true},
    },
    { timestamps: true },
)
const User =models.User || model("User", userSchema);

export default User;