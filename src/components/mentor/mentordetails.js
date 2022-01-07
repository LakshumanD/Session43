import { Box } from "@material-ui/core";

import { DataGrid } from "@mui/x-data-grid";

const MentorDetail = (props) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "MentorName",
      headerName: "Mentor Name",
      width: 400,
      editable: false,
    },
  ];

  // const newrows = [
  //   { id: 1, MentorName: "Snow" },
  //   { id: 2, MentorName: "Lannister" },
  //   { id: 3, MentorName: "Lannister" },
  //   { id: 4, MentorName: "Stark" },
  //   {
  //     id: 5,
  //     StudentName: "Targaryen",
  //   },
  //   { id: 6, StudentName: "Melisandre" },
  // ];
  // setRows(newrows);

  return (
    <Box
      sx={{
        "& > :not(style)": {
          width: "25%",
          margin: "1% auto",
        },
      }}
      autoComplete="off"
    >
      <div style={{ height: 400, width: "25%" }}>
        <h3>Mentor Details</h3>

        <DataGrid
          rows={props.data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </div>
    </Box>
  );
};

export default MentorDetail;
