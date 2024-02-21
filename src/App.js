import { createContext, useState } from "react";
import "./App.css";
import { Header, InputQuery } from "./Components";
import { Box, useMediaQuery } from "@mui/material";
import { HelperCards, QueryTable } from "./Views";

export const AppContext = createContext();

const App = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResponse, setQueryResponse] = useState(null);
  const [queryLoading, setQueryLoading] = useState(false);
  const [previousQueries, setPreviousQueries] = useState([]);
  const [savedQueries, setSavedQueries] = useState([]);
  const isMobile = useMediaQuery("(max-width:1200px)");

  const contextValue = {
    sqlQuery,
    setSqlQuery,
    queryResponse,
    setQueryResponse,
    queryLoading,
    setQueryLoading,
    previousQueries,
    setPreviousQueries,
    savedQueries,
    setSavedQueries,
  };

  return (
    <Box className="App">
      <Header />
      <AppContext.Provider value={contextValue}>
        <Box
          display={"flex"}
          flexDirection={isMobile ? "column" : "row"}
          justifyContent={"space-between"}
          margin={"20px"}
          gap={"20px"}
        >
          <InputQuery />
          <HelperCards />
        </Box>
        <QueryTable />
      </AppContext.Provider>
    </Box>
  );
};

export default App;
