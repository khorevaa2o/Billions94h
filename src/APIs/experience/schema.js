import mongoose from 'mongoose';

const { Schema, model } = mongoose

const ExperienceSchema = new Schema(
    {
        role: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true }, //could be null
        description: { type: String, required: true },
        area: { type: String, required: true },
        userName: { type: String },
        image: { type: String, default: 'https://picsum.photos/id/237/200/300'} //server generated on upload, set a default here
    },
    {
        timestamps: true
    }
)

export default model('Experience', ExperienceSchema)