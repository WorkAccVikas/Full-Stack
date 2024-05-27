import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import moment from "moment";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedDate = moment(dateOfJoin).format("YYYY-MM-DD"); // Format date for API , pass date in string like "2024-05-03"

      console.log(`🚀 ~ handleSubmit ~ formattedDate:`, formattedDate);

      const localDate = moment(dateOfJoin).startOf("day"); // Format date for API
      const dateUTC = localDate.utcOffset(0, true);

      const formattedDate2 = dateUTC.toISOString(); // pass date in string like "2024-05-01T00:00:00.000Z"

      console.table({ localDate, dateUTC });
      console.log("localDate = ", localDate.toISOString());

      console.log(`🚀 ~ handleSubmit ~ formattedDate2:`, formattedDate2);

      const response = await axios.post("http://localhost:8000/api/v1/emp1", {
        name,
        dateOfJoin: formattedDate,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Employee (moment)
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
 *  - with using moment package
 */
