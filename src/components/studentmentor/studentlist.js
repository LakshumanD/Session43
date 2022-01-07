import { Checkbox, Box, FormGroup, FormControlLabel } from "@material-ui/core";

const Studentlist = (props) => {
  let Options = [];

  const handleChange = (event) => {
    if (event.target.checked) Options.push(event.target.value);
    else {
      Options = Options.filter((item) => item !== event.target.value);
    }
    console.log(Options);
    props.setSelected(Options);
  };
  return (
    <Box
      sx={{
        "& > :not(style)": {
          width: "25%",
          //   margin: "1% auto",
        },
      }}
      autoComplete="off"
    >
      <FormGroup title="Students">
        <h5>Students</h5>
        {props.data.map((item, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox color="primary" />}
            label={item.text}
            value={item.value}
            onChange={handleChange}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
export default Studentlist;
