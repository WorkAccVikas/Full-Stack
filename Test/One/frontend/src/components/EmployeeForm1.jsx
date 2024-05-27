import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/emp1", {
        name,
        dateOfJoin: dateOfJoin.toISOString(),
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Employee
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

/** DESC : (NOT WORKING AS EXPECTED)
 *  - Date - DatePicker
 *  - pass date like "2024-04-30T18:30:00.000Z" string format
 *  - When we select 1st may 2024 it will pass "2024-04-30T18:30:00.000Z" that the main issue using DatePicker
 */
