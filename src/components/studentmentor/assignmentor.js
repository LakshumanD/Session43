import { Box, TextField, MenuItem, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import PlaceHolder from "../UI/placeholder";
import Studentlist from "./studentlist";
import axios from "axios";

const AssignMentor = () => {
  const [state, setState] = useState({ MentorID: "", StudentID: "" });
  const [currencies, setCurrencies] = useState([]);
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchData = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/Mentor/`).then((resp) => {
      let newrowss = [];
      resp.data.map((item) =>
        newrowss.push({ value: item.MentorID, label: item.MentorName })
      );
      setCurrencies(newrowss);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/Student/`).then((resp) => {
      let newstd = [];
      resp.data.map((item) =>
        newstd.push({ value: item.StudentID, text: item.StudentName })
      );
      setStudents(newstd);
    });
  };
  useEffect(() => {
    fetchData();
  }, [setCurrencies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selected);
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/StudentMentor/Assign`, {
          MentorID: state.MentorID,
          StudentID: selected,
        })
        .then((resp) => {
          if (resp.data.message) {
            setErrorMessage(resp.data.message);
            setSuccessMessage("");
          } else {
            setSuccessMessage(resp.data);
            setErrorMessage("");
            setState({ mentorID: "", mentorName: "" });
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
  return (
    <PlaceHolder>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            width: "35%",
            margin: "1% auto",
            display: "flex",
          },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          name="MentorID"
          select
          label="Mentor"
          helperText="Please select your mentor"
          value={state.MentorID}
          variant={"outlined"}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Studentlist data={students} setSelected={setSelected} />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
        {errorMessage && <div className="error"> {errorMessage} </div>}
        {successMessage && <div className="success"> {successMessage} </div>}
      </Box>
    </PlaceHolder>
  );
};

export default AssignMentor;
