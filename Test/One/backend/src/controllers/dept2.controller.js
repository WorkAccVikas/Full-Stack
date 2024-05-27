import { ApiResponse } from "../utils/Response/ApiResponse.js";
import { ApiError } from "../utils/Error/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { DEPT2 } from "../models/dept2.model.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import moment from "moment";

export const addDpt2 = asyncHandler(async (req, res) => {
  const { d_name } = req.body;

  console.table(req.body);

  const result = await DEPT2.create({
    d_name,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Department added successfully"));
});

export const getDept2Details = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const data = await Emp2.findById(id);

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Emp2 Data fetched Successfully"));
});
