import { useLoaderData, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from "react";

export default function UserDetails() {
  const userloader = useLoaderData();

  const[isEdit,setEdit]=useState(true)

  const navigate = useNavigate();

  function handleBack() {
    window.history.back();
  }

  function handleClick(){
    setEdit(prev=>!prev)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        width: "400px",
        justifyContent: "space-around",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "orange",
          height: "100px",
          width: "100px",
          fontSize: "48px",
          alignSelf: "center",
        }}
      >
        {userloader.username.slice(0, 1)}
      </Avatar>
      <TextField
        disabled={isEdit}
        id="outlined-disabled"
        label="Username"
        defaultValue={userloader.username}
        sx={{ color: "white" }}
      />
      <TextField
        disabled={isEdit}
        id="outlined-disabled"
        label="Email"
        defaultValue={userloader.useremail}
        sx={{ color: "white" }}
      />
      <div>
      <Button onClick={handleBack} sx={{fontSize:"1rem"}}>
        <ArrowBackIosIcon />
        Back
      </Button>
      <Button onClick={handleClick} sx={{fontSize:"1rem"}}>
        {isEdit?"Edit ":"Save "}
        {isEdit?<EditIcon/>: <DoneIcon/>}
      </Button>
      </div>
    </div>
  );
}

export async function userLoader({ params, request }) {
  let user = await fetch(`http://localhost:8000/getUserDetails/${params.name}`);
  let userData = await user.json();
  return userData.data;
}
