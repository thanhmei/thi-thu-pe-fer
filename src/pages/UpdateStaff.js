import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function UpdateStaff() {
  const location = useLocation();
  const staffId = location.state.staffId;
  const [avatarURL, setAvatarURL] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleAvatarChange = (event) => {
    setAvatarURL(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `https://6499011579fbe9bcf83e915a.mockapi.io/staffManagement/${staffId}`
      )
      .then((response) => {
        console.log(response);
        const staff = response.data;
        setName(staff.name);
        setAge(staff.age);
        setAddress(staff.address);
        setAvatar(staff.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSave = () => {
    // Validation
    if (!avatar || !name || !age || !address) {
      alert("Please fill in all fields");
      return;
    }

    if (name.length < 2) {
      alert(" Name must more than 2 words ");
      return;
    }

    axios
      .put(
        `https://6499011579fbe9bcf83e915a.mockapi.io/staffManagement/${staffId}`,
        {
          name,
          age,
          avatar,
          address,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Paper sx={{ margin: "auto", width: "50%", marginTop: "5%" }}>
      <Stack
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
        }}
        spacing={3}
      >
        <Typography variant="h6" gutterBottom fontWeight="600">
          Update Staff Info
        </Typography>
        <Stack spacing={3}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Avatar URL"
            variant="outlined"
            value={avatar}
            onChange={handleAvatarChange}
          />
          {avatarURL && (
            <img src={avatarURL} alt="Avatar" width="100" height="100" />
          )}
          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              size="small"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              id="outlined-number"
              label="Age"
              type="number"
              inputProps={{ min: 1, max: 100 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <TextField
            size="small"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            id="outlined-basic"
            label="Address"
            variant="outlined"
          />
        </Stack>
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          size="small"
          variant="outlined"
          onClick={handleSave}
        >
          Save
        </Button>
      </Stack>
    </Paper>
  );
}
