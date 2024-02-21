import React, { useContext } from "react";
import { fetchQueryResponse } from "../Services/queries";
import { Box, Button, TextField } from "@mui/material";
import { AppContext } from "../App";
import { copyToClipboard } from "../Utils";

const InputQuery = () => {
  const {
    sqlQuery,
    setSqlQuery,
    setQueryResponse,
    setQueryLoading,
    setPreviousQueries,
    setSavedQueries,
  } = useContext(AppContext);

  const runQuery = async () => {
    if (sqlQuery === "") return;

    try {
      setQueryLoading(true);
      setPreviousQueries((queries) => {
        if (queries.includes(sqlQuery)) {
          return queries;
        }
        return [...queries, sqlQuery];
      });
      const res = await fetchQueryResponse(sqlQuery);
      console.log("res", res);
      setQueryResponse(res);
    } catch (e) {
      console.log("error", e);
    }
    setQueryLoading(false);
  };

  const clearInput = () => {
    setSqlQuery("");
  };

  const saveQuery = () => {
    if (!sqlQuery) return;
    const queriesFromLocalStorage = JSON.parse(localStorage.getItem("queries"));

    if (queriesFromLocalStorage?.includes(sqlQuery)) {
      return;
    }

    if (queriesFromLocalStorage) {
      localStorage.setItem(
        "queries",
        JSON.stringify([...queriesFromLocalStorage, sqlQuery])
      );
      setSavedQueries(() => [...queriesFromLocalStorage, sqlQuery]);
    } else {
      localStorage.setItem("queries", JSON.stringify([sqlQuery]));
      setSavedQueries(() => [sqlQuery]);
    }
  };

  const copyQuery = () => {
    if (!sqlQuery) return;
    copyToClipboard(sqlQuery);
  };

  return (
    <Box width={"50%"} display={"flex"} flexDirection={"column"}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        multiline={true}
        rows={8}
        value={sqlQuery}
        onChange={(e) => {
          setSqlQuery(
            e.target.value
              .replace(/select/gi, "SELECT")
              .replace(/from/gi, "FROM")
          );
        }}
        placeholder="Enter your query here..."
        style={{ flex: 1 }}
      />
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={"12px"}
        justifyContent={"flex-start"}
        marginTop={"12px"}
      >
        <Button onClick={runQuery} variant="contained">
          Run
        </Button>
        <Button onClick={saveQuery} color="success" variant="contained">
          Save
        </Button>
        <Button onClick={copyQuery} color="info" variant="contained">
          Copy
        </Button>
        <Button onClick={clearInput} color="error" variant="contained">
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default InputQuery;
