import { Box, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import PlaceHolder from "../UI/placeholder";
import StudentDetail from "./studentdetails";

const CreateStudent = () => {
  const [state, setState] = useState({
    studentID: "",
    studentName: "",
    studentEmail: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/Student/`).then((resp) => {
      let newrowss = [];
      resp.data.map((item) =>
        newrowss.push({
          id: item.StudentID,
          StudentName: item.StudentName,
          StudentEmail: item.StudentEmail,
        })
      );
      setRows(newrowss);
    });
  };
  useEffect(() => {
    fetchData();
  }, [setRows]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/Student/Create`, {
          StudentID: state.studentID,
          StudentName: state.studentName,
          StudentEmail: state.studentEmail,
        })
        .then((resp) => {
          if (resp.data.message) {
            setErrorMessage(resp.data.message);
            setSuccessMessage("");
          } else {
            setSuccessMessage(resp.data);
            setErrorMessage("");
            setState({ studentID: "", studentName: "", studentEmail: "" });
            fetchData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  return (
    <PlaceHolder>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            width: "25%",
            margin: "1% auto",
            display: "flex",
          },
        }}
        autoComplete="off"
        onSubmit={submit}
      >
        <TextField
          type={"number"}
          label={"Student ID"}
          name="studentID"
          value={state.studentID}
          variant={"outlined"}
          onChange={handleChange}
        />
        <TextField
          type={"text"}
          label={"Student Name"}
          name="studentName"
          value={state.studentName}
          variant={"outlined"}
          onChange={handleChange}
        />
        <TextField
          type={"email"}
          label={"Student Email"}
          name="studentEmail"
          value={state.studentEmail}
          variant={"outlined"}
          onChange={handleChange}
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>

        {errorMessage && <div className="error"> {errorMessage} </div>}
        {successMessage && <div className="success"> {successMessage} </div>}
      </Box>
      <StudentDetail data={rows} />
    </PlaceHolder>
  );
};

export default CreateStudent;
