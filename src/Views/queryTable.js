import {
  Box,
  IconButton,
  Input,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { mockDesertData } from "../Utils/constants";
import styled from "@emotion/styled";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";
import { AppContext } from "../App";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "lightblue",
    color: "black",
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "lightgrey",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      sx={{ ml: 2.5 }}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <Typography variant="body1">{"0"}</Typography>
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <ArrowLeft />
      </IconButton>
      <Typography variant="body1">{page}</Typography>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <ArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <Typography variant="body1">
          {Math.ceil(count / rowsPerPage) - 1}
        </Typography>
      </IconButton>
    </Box>
  );
}

const QueryTable = () => {
  const { queryResponse, queryLoading } = useContext(AppContext);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTableValue, setSearchTableValue] = React.useState("");
  const [tableData, setTableData] = React.useState(queryResponse);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (searchTableValue) {
      setTableData((tableData) =>
        tableData.filter((row) => {
          for (let key in row) {
            if (
              row[key]
                .toString()
                .toLowerCase()
                .includes(searchTableValue.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        })
      );
    } else {
      setTableData(mockDesertData);
    }
  }, [searchTableValue]);

  if (queryLoading) {
    return (
      <Box mt={"8%"} marginX={"20px"}>
        <Skeleton variant="rectangular" width={"100%"} height={60} />
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={20}
          sx={{ marginY: "20px" }}
        />
        <Skeleton variant="rectangular" width={"100%"} height={20} />
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={20}
          sx={{ marginY: "20px" }}
        />
        <Skeleton variant="rectangular" width={"100%"} height={20} />
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={20}
          sx={{ marginY: "20px" }}
        />
      </Box>
    );
  }

  if (!queryResponse) return;

  return (
    <Box mt={"80px"} mx={"20px"}>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={"10px"}
      >
        <CSVLink data={tableData} filename={"my-data.csv"}>
          <DownloadIcon />
        </CSVLink>
        <Input
          value={searchTableValue}
          onChange={(event) => {
            setSearchTableValue(event.target.value);
          }}
          placeholder={"Search Table"}
          sx={{
            border: "1px solid black",
            margin: "5px",
            padding: "5px",
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell>Calories</StyledTableCell>
              <StyledTableCell>Fat</StyledTableCell>
              <StyledTableCell>Carbs</StyledTableCell>
              <StyledTableCell>Protein</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tableData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableData
            ).map((row) => (
              <StyledTableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.protein}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QueryTable;
