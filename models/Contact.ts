import mongoose, { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email:    { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    phone:    { type: String, required: true, trim: true, maxlength: 40 },
    propertyType: { type: String, required: true, trim: true, maxlength: 60 },
    message:  { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

export type ContactDoc = mongoose.InferSchemaType<typeof ContactSchema> & { _id: any; createdAt: Date };

export const Contact = (models.Contact as mongoose.Model<ContactDoc>) || model<ContactDoc>("Contact", ContactSchema);
