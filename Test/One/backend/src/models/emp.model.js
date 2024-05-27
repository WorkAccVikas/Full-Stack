import dayjs from "dayjs";
import moment from "moment";
import mongoose, { Schema, model } from "mongoose";
import advancedFormat from "dayjs/plugin/advancedFormat.js";

dayjs.extend(advancedFormat);

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfJoin: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    // LEARN : How to get virtual field value automatically
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in Object output
  }
);

// Virtual field for years of experience
employeeSchema.virtual("yearsOfExperience").get(function () {
  // Calculate the difference in years between dateOfJoin and today's date
  const today = new Date();
  const yearsDiff = today.getFullYear() - this.dateOfJoin.getFullYear();

  // Account for months that haven't passed yet in the current year
  const monthsDiff = today.getMonth() - this.dateOfJoin.getMonth();
  if (
    monthsDiff < 0 ||
    (monthsDiff === 0 && today.getDate() < this.dateOfJoin.getDate())
  ) {
    return yearsDiff - 1; // Adjust if anniversary hasn't passed yet
  }

  return yearsDiff;
});

// Format the virtual field for display (optional)
employeeSchema.virtual("formattedYearsOfExperience").get(function () {
  const years = this.yearsOfExperience;
  return years > 1 ? `${years} years` : `${years} year`;
});

// Virtual field for years of experience
employeeSchema.virtual("yearsOfExperience_dayjs").get(function () {
  const today = dayjs();
  const dateOfJoin = dayjs(this.dateOfJoin); // Replace with your actual date

  const yearsDiff = today.year() - dateOfJoin.year();

  // Check if anniversary hasn't passed yet in the current year
  const monthsDiff = today.month() - dateOfJoin.month();
  if (
    monthsDiff < 0 ||
    (monthsDiff === 0 && today.date() < dateOfJoin.date())
  ) {
    yearsDiff -= 1;
  }

  return yearsDiff;
});

// Format the virtual field for display (optional)
employeeSchema.virtual("formattedYearsOfExperience_dayjs").get(function () {
  const years = this.yearsOfExperience_dayjs;
  return years > 1 ? `${years} years` : `${years} year`;
});

employeeSchema.virtual("yearsOfExperience_moment").get(function () {
  const today = moment();
  const dateOfJoin = moment(this.dateOfJoin); // Replace with your actual date

  const yearsDiff = today.year() - dateOfJoin.year();

  // Check if anniversary hasn't passed yet in the current year
  const monthsDiff = today.month() - dateOfJoin.month();
  if (
    monthsDiff < 0 ||
    (monthsDiff === 0 && today.date() < dateOfJoin.date())
  ) {
    yearsDiff -= 1;
  }
  return yearsDiff;
});

employeeSchema.virtual("formattedYearsOfExperience_moment").get(function () {
  const years = this.yearsOfExperience_moment;
  return years > 1 ? `${years} years` : `${years} year`;
});

// Virtual field to extract date part of dateOfJoin using dayjs
employeeSchema.virtual("joinDate").get(function () {
  /** DESC :
   *  - dateOfJoin : 2024-05-25T19:06:10.423Z
   *  - return
   */
  // return dayjs(this.dateOfJoin).format("YYYY-MM-DD"); // 1990-05-26
  // return dayjs(this.dateOfJoin).format("D, MMMM, YYYY"); // 26, May, 1990
  return dayjs(this.dateOfJoin).format("Do MMMM YYYY"); // 26th May 1990
});

// Virtual field to extract time part of dateOfJoin in 24-hour format using dayjs
employeeSchema.virtual("joinTime").get(function () {
  /** DESC :
   *  - dateOfJoin : 2024-05-25T19:06:10.423Z
   *  - return
   */
  return dayjs(this.dateOfJoin).format("HH:mm:ss"); // 05:30:00 (24 hrs)
});

export const Emp1 = new model("Emp1", employeeSchema, "Emp1");
