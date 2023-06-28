import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [staffList, setStaffList] = useState([]);

  const Actions = ({ data }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleDelete = () => {
      axios
        .delete(
          `https://6499011579fbe9bcf83e915a.mockapi.io/staffManagement/${data.id}`
        )
        .then(function (response) {
          // handle success
          // enqueueSnackbar('Đã ẩn sản phẩm', { variant: 'success' });
          // setEnabled(false);
          setOpen(false);
          setStaffList((prev) => prev.filter((staff) => staff.id !== data.id));
          console.log(response);
          alert("Đã xóa thành công");
        })
        .catch(function (error) {
          // handle error
          // handleError(error);
          console.log(error);
        });
    };

    return (
      <Stack direction="row">
        <React.Fragment>
          <Link to="/update" state={{
            staffId: data.id
          }}>
            <IconButton color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton
            color="primary"
            aria-label="delete"
            onClick={handleClickOpen}
          >
            <DeleteIcon />
          </IconButton>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn có chắc chắn muốn xóa staff không?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleClose}>Không</Button>
              <Button autoFocus onClick={handleDelete}>
                Có
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </Stack>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,

      renderCell: (rowData) => (
        <img
          src={rowData.value}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt=""
        />
      ),
      headerAlign: "center",
      align: "center",
    },

    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      width: 200,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (rowAction) => <Actions data={rowAction} />,
    },
  ];

  useEffect(() => {
    axios
      .get("https://6499011579fbe9bcf83e915a.mockapi.io/staffManagement")
      .then((response) => {
        // console.log(response);
        setStaffList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 2,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
      >
        <Box sx={{ width: "100%", margin: "auto" }}>
          <Link to="/add">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginBottom: 3, backgroundColor: "black" }}
            >
              ADD
            </Button>
          </Link>
          <Box>
            <DataGrid
              rows={staffList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default Dashboard;
