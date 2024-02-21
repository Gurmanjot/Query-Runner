import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" component="div">
          Sql Runner
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
