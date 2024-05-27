import { ApiResponse } from "../utils/Response/ApiResponse.js";
import { ApiError } from "../utils/Error/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Emp1 } from "../models/emp.model.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import moment from "moment";

export const addEmp = asyncHandler(async (req, res) => {
  console.log("Client ip: ", req.clientIp);

  const { name, dateOfJoin } = req.body;

  console.log("typeof = ", typeof dateOfJoin);
  console.log("Vikas = ", new Date(dateOfJoin));
  console.table(req.body);

  const result = await Emp1.create({
    name,
    dateOfJoin: new Date(dateOfJoin),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Employee added successfully"));
});

export const getEmpDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Emp1.findById(id);
  // const data = await Emp1.findOne({_id : id});
  // const data = await Emp1.find();

  // NOTE : virtual not directly working with aggregate pipeline

  // DESC : Without using any 3rd party library

  const pipeline1 = [
    { $match: { _id: new mongoose.Types.ObjectId(id) } },

    {
      $addFields: {
        today: new Date(), // Add the current date as a field
        dateOfJoin: { $toDate: "$dateOfJoin" }, // Convert dateOfJoin to date format
      },
    },
    {
      $addFields: {
        yearsDiff: {
          $divide: [
            { $subtract: ["$today", "$dateOfJoin"] }, // Get the difference in milliseconds
            1000 * 60 * 60 * 24 * 365, // Convert milliseconds to years
          ],
        },
      },
    },
    {
      $addFields: {
        yearsOfExperience: {
          $floor: "$yearsDiff", // Round down to get the integer years of experience
        },
      },
    },
    {
      $addFields: {
        formattedYearsOfExperience_dayjs: {
          $cond: {
            if: { $gt: ["$yearsOfExperience", 1] },
            then: {
              $concat: [{ $toString: "$yearsOfExperience" }, " years"],
            },
            else: {
              $concat: [{ $toString: "$yearsOfExperience" }, " year"],
            },
          },
        },
      },
    },
  ];

  const today = new Date();

  // DESC : Using dayjs

  const pipelineDayjs = [
    { $match: { _id: new mongoose.Types.ObjectId(id) } },

    {
      $addFields: {
        today: {
          $dateFromString: {
            dateString: dayjs().toISOString(), // Convert dayjs date to ISOString
          },
        },
        dateOfJoin: { $toDate: "$dateOfJoin" }, // Convert dateOfJoin to date format
      },
    },
    {
      $addFields: {
        yearsDiff: {
          $divide: [
            { $subtract: ["$today", "$dateOfJoin"] }, // Get the difference in milliseconds
            1000 * 60 * 60 * 24 * 365, // Convert milliseconds to years
          ],
        },
      },
    },
    {
      $addFields: {
        yearsOfExperience_dayjs: {
          $floor: "$yearsDiff", // Round down to get the integer years of experience
        },
      },
    },
    {
      $addFields: {
        formattedYearsOfExperience_dayjs: {
          $concat: [
            { $toString: "$yearsOfExperience_dayjs" },
            " ",
            {
              $cond: {
                if: { $gt: ["$yearsOfExperience_dayjs", 1] },
                then: "years",
                else: "year",
              },
            },
          ],
        },
      },
    },
  ];

  // DESC : Using moment

  const pipelineMoment = [
    { $match: { _id: new mongoose.Types.ObjectId(id) } },

    {
      $addFields: {
        today: { $toDate: moment().toISOString() }, // Use moment to get the current date
        dateOfJoin: { $toDate: "$dateOfJoin" }, // Convert dateOfJoin to date format
      },
    },
    {
      $addFields: {
        yearsDiff: {
          $divide: [
            { $subtract: ["$today", "$dateOfJoin"] }, // Get the difference in milliseconds
            1000 * 60 * 60 * 24 * 365, // Convert milliseconds to years
          ],
        },
      },
    },
    {
      $addFields: {
        yearsOfExperience_moment: {
          $floor: "$yearsDiff", // Round down to get the integer years of experience
        },
      },
    },
    {
      $addFields: {
        formattedYearsOfExperience_moment: {
          $concat: [
            { $toString: "$yearsOfExperience_moment" },
            " ",
            {
              $cond: {
                if: { $gt: ["$yearsOfExperience_moment", 1] },
                then: "years",
                else: "year",
              },
            },
          ],
        },
      },
    },
  ];

  // const data = await Emp1.aggregate(pipelineMoment);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Employee Details fetched successfully"));
});
