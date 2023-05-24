import {useState,useEffect} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

function ExcelPage(){
 
    const[result,setResult]= useState([]);
    const theme = useTheme();
    const [age, setAge] = useState('');
    const [point, setPoint] = useState(0);
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const getData = ()=>
    {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(res => setResult( res));
    }
    
    useEffect(() => {
        getData();
    },)
        return (
            <Box m="1.5rem 2.5rem">
            <Header title="CHẤM ĐIỂM 3P" subtitle="List of 3P Points" />
            <div className="container">
                <h3 className="mt-3 text-success"><center>Export React Table Data into EXCEL Sheet</center></h3>
                <div className="row mt-4">
                    <Button variant="primary">
                        Link
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success mb-3"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Export Data to Excel Sheet"/>
                    </Button>
                    <Table className="table" id="table-to-xls">
                        <TableHead className="thead-dark">
                        <TableRow>
                            <TableCell>Firstname</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Firstname</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Firstname</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={point}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Điểm min</MenuItem>
                                    <MenuItem value={20}>Điểm max</MenuItem>
                                    <MenuItem value={30}>Điểm chuẩn</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                    
                            {result.map((res)=>
                                <TableRow>
                                <TableCell>{res.name}</TableCell>
                                <TableCell>{res.username}</TableCell>
                                <TableCell>{res.email}</TableCell>
                                <TableCell>{res.website}</TableCell>
                                <TableCell>{res.name}</TableCell>
                                <TableCell>{res.username}</TableCell>
                                <TableCell>{res.email}</TableCell>
                                <TableCell>{res.website}</TableCell>
                                <TableCell>{res.name}</TableCell>
                                <TableCell>{res.username}</TableCell>
                                <TableCell>{res.email}</TableCell>
                                <TableCell>{res.website}</TableCell>
                                </TableRow>
                            )}   
                        
                        </TableBody>   
                    </Table>
             </div>
            </div>
            </Box>
        );
    }
  
export default ExcelPage