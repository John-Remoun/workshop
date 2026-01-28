import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ["info", "warning", "error"],
      default: "info"
    }
  },
  {
    timestamps: true
  }
);

export const Log = mongoose.model("Log", logSchema);
