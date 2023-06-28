import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Stack,
  Modal,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Home({ data }) {
  const [staffLists, setStaffLists] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    axios
      .get("https://6499011579fbe9bcf83e915a.mockapi.io/staffManagement")
      .then((response) => {
        setStaffLists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpenPopup = (staff) => {
    setSelectedStaff(staff);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Grid container spacing={3} padding="5%">
      {staffLists.length > 0 &&
        staffLists.map(function (staffList) {
          return (
            <Grid item xs={3} key={staffList.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  position: "relative",
                }}
              >
                <CardActionArea onClick={() => handleOpenPopup(staffList)}>
                  <CardMedia
                    component="img"
                    image={staffList.avatar}
                    alt="avatar"
                  />
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "550" }}
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {staffList.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "550" }}
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {staffList.age}
                      </Typography>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      {staffList.address}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ marginTop: 5 }}>
                  <Button
                    onClick={() => handleOpenPopup(staffList)}
                    size="small"
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      width: "100%",
                      bottom: 0,
                      left: 0,
                      position: "absolute",
                      borderRadius: 0,
                      padding: 1,
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                  >
                    Detail
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}

      {/* Popup */}
      <Modal
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            width: "25%",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingBottom: "10px",
            // paddingTop:"5px",
            outline: "none",
            borderRadius: "5px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClosePopup}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>
          {selectedStaff && (
            <div style={{ maxWidth: 345, position: "relative" }}>
              <CardActionArea onClick={() => handleOpenPopup(selectedStaff)}>
                <CardMedia
                  component="img"
                  image={selectedStaff.avatar}
                  alt="avatar"
                />
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    paddingBottom={1}
                  >
                    <Typography
                      sx={{ fontSize: "18px", fontWeight: "550" }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      {selectedStaff.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "18px", fontWeight: "550" }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      Age: {selectedStaff.age}
                    </Typography>
                  </Stack>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                  >
                    Address: {selectedStaff.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created at: {selectedStaff.createdAt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </div>
          )}
        </div>
      </Modal>
    </Grid>
  );
}
