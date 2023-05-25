import React, {useState, useEffect} from "react";
import { Box, useTheme , Button} from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const URL = "http://222.252.17.89:5000/api/farms"
  async function logJSONData() {
    const response = await fetch(URL);
    const jsonData = await response.json();
    console.log(jsonData['msg']);
    setGateways(jsonData['msg']);
    return jsonData;
  }
  const [gateways, setGateways] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    logJSONData();
  }, [])

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="FARMERS" subtitle="Danh sách farm đang thương mại" />
      <TextField 
        id="outlined-basic" 
        label="ID của farm" 
        variant="outlined" 
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())} 
      />  
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
      
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên Farms</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Số greenhouse</TableCell>
            <TableCell align="right">Mac greenhouse</TableCell>
            <TableCell align="right">Update lúc</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gateways.filter((asd) =>
           asd._id.toLowerCase().includes(query)).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row._id}</TableCell>
              <TableCell align="right">{row.greenhouseList.length}</TableCell>
            {row.greenhouseList.length == 1 &&
              <TableCell align="right">{row.greenhouseList[0]["ID"]}</TableCell>
            }
            {row.greenhouseList.length > 1 &&
              <TableCell align="right">Nhiều hơn 1 gateway</TableCell>
            }
              <TableCell align="right">{row.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Box>
  );
};

export default Customers;
