import mongoose, { Schema, model } from "mongoose";

const empSchema = new mongoose.Schema(
  {
    e_name: String,
    age: Number,
    did: { type: mongoose.Schema.Types.ObjectId, ref: "Dept2" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in Object output
  }
);

// Define a virtual field to get department_name
empSchema.virtual("department_name", {
  ref: "Dept2",
  localField: "did",
  foreignField: "_id",
  justOne: true,
  options: { select: "d_name" },
});

export const Emp2 = new model("Emp2", empSchema, "Emp2");
