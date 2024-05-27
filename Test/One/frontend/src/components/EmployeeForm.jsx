import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { axiosInstance } from "../utils/axios";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/emp1", {
        name,
        dateOfJoin,
      });
      //   const response = await axiosInstance.post("/api/v1/emp1", {
      //     name,
      //     dateOfJoin,
      //   });
      console.log(`🚀 ~ handleSubmit ~ response:`, response.data.message);
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
        <TextField
          label="Date of Join"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={dateOfJoin}
          onChange={(e) => setDateOfJoin(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Employee
        </Button>
      </form>
      {message && (
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default EmployeeForm;

/** DESC : (Working)
 *  - Date - input date
 *  - pass date like "2023-01-04" (YYYY-MM-DD)
 */