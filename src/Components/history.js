import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { copyToClipboard } from "../Utils";

const History = () => {
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#f5f5f5", borderRadius: "24px" }}
      >
        <CardContent>
          <SavedQueries />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#f5f5f5", ml: "20px", borderRadius: "24px" }}
      >
        <CardContent>
          <QueryHistory />
        </CardContent>
      </Card>
    </Box>
  );
};

export default History;

const QueryHistory = () => {
  const { previousQueries } = useContext(AppContext);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Box width={"280px"}>
      <Typography variant="h5" mb={"10px"}>
        Query History
      </Typography>
      <Box height={"160px"} overflow={"auto"}>
        {previousQueries.length === 0 ? (
          <Box>
            <Typography variant={"body1"}>No queries to show</Typography>
          </Box>
        ) : (
          previousQueries.map((query, index) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              borderBottom={"1px solid #e0e0e0"}
              paddingY={"5px"}
              key={index}
            >
              <Typography variant={"body2"}>{query}</Typography>
              <Button onClick={() => copyToClipboard(query)}>
                <ContentCopyRoundedIcon />
              </Button>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

const SavedQueries = () => {
  const { savedQueries, setSavedQueries } = useContext(AppContext);

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
        {savedQueries?.map((query, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderBottom={"1px solid #e0e0e0"}
            paddingY={"5px"}
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
