import React, { useContext } from "react";
import { AppContext } from "../App";
import { Box, Button, Input, Typography } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { copyToClipboard } from "../Utils";

const QueryHistory = () => {
  const { previousQueries } = useContext(AppContext);
  const [searchPreviousQueries, setSearchPreviousQueries] =
    React.useState(null);

  return (
    <Box width={"280px"}>
      <Typography variant="h5" mb={"10px"}>
        Query History
      </Typography>
      <Box height={"160px"} overflow={"auto"}>
        {previousQueries.length === 0 ? (
          <Box mt={"40px"}>
            <Typography color={"GrayText"}>No queries to show...</Typography>
          </Box>
        ) : (
          <>
            <Input
              value={searchPreviousQueries}
              onChange={(event) => {
                setSearchPreviousQueries(event.target.value);
              }}
              placeholder={"Search saved queries"}
              sx={{
                border: "0.5px solid black",
                marginY: "5px",
                padding: "5px",
                width: "100%",
                height: "30px",
              }}
            />
            {previousQueries
              ?.filter((query) =>
                searchPreviousQueries
                  ? query
                      .toLowerCase()
                      .includes(searchPreviousQueries.toLowerCase())
                  : true
              )
              .map((query, index) => (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderBottom={"1px solid black"}
                  paddingY={"5px"}
                  key={index}
                  textAlign={"left"}
                >
                  <Typography variant={"body2"}>{query}</Typography>
                  <Button onClick={() => copyToClipboard(query)}>
                    <ContentCopyRoundedIcon />
                  </Button>
                </Box>
              ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default QueryHistory;
