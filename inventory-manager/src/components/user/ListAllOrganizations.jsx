import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Axios from "axios";
import { Button } from "@mui/material";

export const ListAllOrganizations = (props) => {
  const [rows, setRows] = useState([]); // State to store the rows

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:8080/organization/all"
        );
        setRows(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchOrganizations();
  }, []); // The empty array ensures this effect runs once on mount

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Owner Email</TableCell>
              <TableCell align="right">Member Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.ownerEmail}</TableCell>
                <TableCell align="right">{row.memberCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
