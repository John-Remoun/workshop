import mongoose, { Schema } from "mongoose";
import { genderEnum, providerEnum } from "../../common/enums/index.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 15,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 15,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    gender: {
      type: Number,
      enum: Object.values(genderEnum),
      default: genderEnum.Male,
    },
    provider: {
      type: Number,
      enum: Object.values(providerEnum),
      default: providerEnum.System,
    },

    profilePicture: { type: String },
    coverPicture: { type: String },

    confirmEmail: { type: Date },
    changeCredentialsTime: { type: Date },
  },
  {
    collection: "Route_Users",
    timestamps: true,
    strict: true,
    strictQuery: true,
    optmisticConcurrency: true,
    autoIndex: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("username").set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.set({ firstName, lastName });

  }).get(function () {

    return this.firstName + " " + this.lastName;
  });

  
export const UserModel = mongoose.models.User || mongoose.model("user", userSchema);
export default UserModel;