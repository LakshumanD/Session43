import { Box } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

const StudentDetail = (props) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "StudentName",
      headerName: "Student Name",
      width: 200,
      editable: false,
    },
    {
      field: "StudentEmail",
      headerName: "Student Email",
      width: 300,
      editable: false,
    },
  ];

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          width: "25%",
          margin: "1% auto",
        },
      }}
      autoComplete="off"
    >
      <div style={{ height: 400, width: "40%" }}>
        <h3>Student Details</h3>

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

export default StudentDetail;
