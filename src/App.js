import { createContext, useState } from "react";
import "./App.css";
import { Header, History, InputQuery, QueryTable } from "./Components";
import { useMediaQuery } from "@mui/material";

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
  // search functionality and  download functionality
  return (
    <div className="App">
      <Header />
      <AppContext.Provider value={contextValue}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <InputQuery />
          <History />
        </div>
        {queryLoading ? <div>Loading ....</div> : null}
        {!queryLoading && queryResponse !== null ? <QueryTable /> : null}
      </AppContext.Provider>
    </div>
  );
};

export default App;
