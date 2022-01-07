import { Box, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import PlaceHolder from "../UI/placeholder";
import MentorDetail from "./mentordetails";

const CreateMentor = () => {
  const [state, setState] = useState({
    mentorID: "",
    mentorName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/Mentor/`).then((resp) => {
      let newrowss = [];
      resp.data.map((item) =>
        newrowss.push({ id: item.MentorID, MentorName: item.MentorName })
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
        .post(`${process.env.REACT_APP_API_URL}/Mentor/Create`, {
          MentorID: state.mentorID,
          MentorName: state.mentorName,
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
          label={"Mentor ID"}
          name="mentorID"
          value={state.mentorID}
          variant={"outlined"}
          onChange={handleChange}
        />
        <TextField
          type={"text"}
          label={"Mentor Name"}
          name="mentorName"
          value={state.mentorName}
          variant={"outlined"}
          onChange={handleChange}
        />

        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>

        {errorMessage && <div className="error"> {errorMessage} </div>}
        {successMessage && (
          <div id="success">
            <span> {successMessage}</span>
          </div>
        )}
      </Box>
      <MentorDetail data={rows} />
    </PlaceHolder>
  );
};
export default CreateMentor;
