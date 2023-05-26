import mongoose, { Model, Schema } from "mongoose";

export interface UserAttributes {
    uid: string;
    name: string;
    hash: string;
}

export class User extends Model<UserAttributes> {
    static initModel() {
        return mongoose.model("User", new Schema<UserAttributes>({
            name: { 
                unique: true,
                type: String 
            },
            hash: {
                required: true,
                type: String 
            },
        }, {
            versionKey: false
        }));
    }
}