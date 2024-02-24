import { Schema, models } from "mongoose";
import mongoose from "mongoose";

export const tourSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    budget: {
        type: [Number],
        required: true
    },
    expenses: {
        type: [Number],
        required: true
    },
    background: {
        r: {
            type: Number,
        },
        g: {
            type: Number
        },
        b: {
            type: Number
        }
    }
});

const Tour = models.Tour || mongoose.model("Tour", tourSchema);
export default Tour;