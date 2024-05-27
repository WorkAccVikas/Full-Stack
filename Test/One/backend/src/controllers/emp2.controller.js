import { ApiResponse } from "../utils/Response/ApiResponse.js";
import { ApiError } from "../utils/Error/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Emp2 } from "../models/emp2.model.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import moment from "moment";

export const addEmp2 = asyncHandler(async (req, res) => {
  console.log("Client ip: ", req.clientIp);

  const { e_name, age, did } = req.body;

  console.table(req.body);

  const result = await Emp2.create({
    e_name,
    age,
    did,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Employee added successfully"));
});

export const getEmp2Details = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(`🚀 ~ getEmp2Details ~ id:`, id);

  const data = await Emp2.findById(id).populate("department_name");

  //   const data = await Emp2.find().populate("did");

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Emp2 Data fetched Successfully"));
});
