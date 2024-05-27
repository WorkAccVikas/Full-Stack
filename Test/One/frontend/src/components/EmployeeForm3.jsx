import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Convert the local date to UTC with the correct time zone offset
      const localDate = dayjs(dateOfJoin).startOf("day"); // Local time at start of the day
      console.log(`🚀 ~ handleSubmit ~ localDate:`, localDate);
      const dateUTC = localDate.utcOffset(0, true); // Convert to UTC and adjust for local time zone offset
      console.log(`🚀 ~ handleSubmit ~ dateUTC:`, dateUTC);
      const isoDate = dateUTC.toISOString();
      console.log(`🚀 ~ handleSubmit ~ isoDate:`, isoDate);
      console.log("localDate = ", localDate.toISOString());

      const response = await axios.post("http://localhost:8000/api/v1/emp1", {
        name,
        dateOfJoin: isoDate,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Employee (dayjs)
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Join"
            value={dateOfJoin}
            onChange={(newValue) => setDateOfJoin(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" required />
            )}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained" color="primary">
          Add Employee
        </Button>
      </form>
      {message && (
        <Box mt={2}>
          <Typography variant="body1" color="textSecondary">
            {message}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default EmployeeForm;

/** DESC : (Working)
 *  - Solution of EmployeeForm1.jsx
 *  - we pass date like "2024-05-01T00:00:00.000Z" in string format
 *  - with using dayjs package
 */
