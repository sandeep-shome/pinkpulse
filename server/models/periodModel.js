import mongoose from "mongoose";

const periodSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    user_id: { type: String, required: true },
    remark: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const periodModel = mongoose.model("periods", periodSchema);
export default periodModel;
