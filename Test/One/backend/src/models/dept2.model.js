import mongoose, { Schema, model } from "mongoose";

const sampleSchema = new Schema(
  {
    d_name: String,
  },
  { timestamps: true }
);

export const DEPT2 = new model("Dept2", sampleSchema, "Dept2");
