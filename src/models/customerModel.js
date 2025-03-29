import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
    {
        name: { type: String},
        email: { type: String },
        phone: { type: String },
        avatar: { type: String },
        address: {
            street: { type: String },
            city: { type: String},
            state: { type: String },
            zip: { type: String }
        }        
    },
    {
        timestamps: {
            currentTime: () => Date.now(),
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

export const customerCreate = mongoose.model("customer", customerSchema);