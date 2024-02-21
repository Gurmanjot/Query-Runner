import React from "react";
import { Box, Card, CardContent } from "@mui/material";
import { QueryHistory, SavedQueries } from "../Components";

const HelperCards = () => {
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#d9e2fe",
          borderRadius: "24px",
          borderWidth: "2px",
        }}
      >
        <CardContent>
          <SavedQueries />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#d9e2fe",
          ml: "20px",
          borderRadius: "24px",
          borderWidth: "2px",
        }}
      >
        <CardContent>
          <QueryHistory />
        </CardContent>
      </Card>
    </Box>
  );
};

export default HelperCards;
