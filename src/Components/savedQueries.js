import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { Box, Input, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { copyToClipboard } from "../Utils";

const SavedQueries = () => {
  const { savedQueries, setSavedQueries } = useContext(AppContext);
  const [searchSavedQueries, setSearchSavedQueries] = React.useState(null);

  useEffect(() => {
    const queriesFromLocalStorage = JSON.parse(localStorage.getItem("queries"));

    if (queriesFromLocalStorage) {
      setSavedQueries(queriesFromLocalStorage);
    }
  }, []);

  const deleteSavedQuery = (query) => {
    const newQueries = savedQueries.filter(
      (savedQuery) => savedQuery !== query
    );
    localStorage.setItem("queries", JSON.stringify(newQueries));
    setSavedQueries(newQueries);
  };

  return (
    <Box width={"280px"}>
      <Typography variant="h5" mb={"10px"}>
        Saved Queries
      </Typography>
      <Box height={"160px"} overflow={"auto"}>
        {savedQueries?.length !== 0 ? (
          <Input
            value={searchSavedQueries}
            onChange={(event) => {
              setSearchSavedQueries(event.target.value);
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
        ) : (
          <Box mt={"40px"}>
            <Typography variant={"h6"} color={"coral"}>
              No queries to show
            </Typography>
          </Box>
        )}
        {savedQueries
          ?.filter((query) =>
            searchSavedQueries
              ? query.toLowerCase().includes(searchSavedQueries.toLowerCase())
              : true
          )
          .map((query, index) => (
            <Box
              key={index}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              borderBottom={"1px solid black"}
              paddingY={"5px"}
              textAlign={"left"}
            >
              <Typography variant={"body2"}>{query}</Typography>
              <Box display={"flex"} flexDirection={"row"} marginLeft={"10px"}>
                <Box sx={{ marginRight: "10px" }}>
                  <ContentCopyRoundedIcon
                    color="info"
                    onClick={() => copyToClipboard(query)}
                    cursor={"pointer"}
                  />
                </Box>
                <Box>
                  <DeleteOutlineRoundedIcon
                    color="error"
                    onClick={() => deleteSavedQuery(query)}
                    cursor={"pointer"}
                  />
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default SavedQueries;
