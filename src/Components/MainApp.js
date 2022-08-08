// represents the main app

import React, { Fragment } from "react";
import Container from "@mui/material/Container";
import { Table, Typography, Box, Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Graph from "./Graph";

const MainApp = (props) => {
  const [data, setData] = React.useState();
  const [PTOPerQuarter, setPTOPerQuarter] = React.useState();
  const [sickPerQuarter, setSickPerQuarter] = React.useState();
  const [bereavementPerQuarter, setBereavementPerQuarter] = React.useState();

  let navigate = useNavigate();

  const calculateAvg = () => {
    const NUM_QUARTER = 4;
    setPTOPerQuarter(props.preferences.targetPTO / NUM_QUARTER);
    setSickPerQuarter(props.preferences.sickDays / NUM_QUARTER);
    setBereavementPerQuarter(props.preferences.bereavement / NUM_QUARTER);
  };

  // return true for red, false for green
  const determineColor = (value, type) => {
    if (type === "pto") {
      // > 20%
      if (parseInt(value) / PTOPerQuarter > 0.2) {
        return true;
      }
    } else if (type === "sick") {
      if (parseInt(value) / sickPerQuarter > 0.2) {
        return true;
      }
    } else {
      if (parseInt(value) / bereavementPerQuarter > 0.2) {
        return true;
      }
    }
    return false;
  };

  React.useEffect(() => {
    calculateAvg();
    setData(
      Array.from(props.userData, ([key, value]) => ({
        key,
        value,
      }))
    );
  }, [props.userData]);

  if (!data) return null;

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h3" textAlign="center">
        Time off Calculator
      </Typography>

      <Typography variant="h5" component="h2" textAlign="center" marginTop={2}>
        Table
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TableContainer component={Paper} sx={{ maxWidth: 500, marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quarter</TableCell>
                <TableCell align="center">PTO</TableCell>
                <TableCell align="center">Sick Days</TableCell>
                <TableCell align="center">Bereavement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <Fragment key={i}>
                  <TableRow>
                    <TableCell rowSpan={5}>{row.key}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(row.value.pto[0], "pto")
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.pto[0]}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(row.value.sick[0], "sick")
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.sick[0]}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(
                            row.value.Bereavement[0],
                            "bereavement"
                          )
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.Bereavement[0]}
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(row.value.pto[1], "pto")
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.pto[1]}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(row.value.sick[1], "sick")
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.sick[1]}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(
                            row.value.Bereavement[1],
                            "bereavement"
                          )
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.Bereavement[1]}
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">3</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(row.value.pto[2], "pto")
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.pto[2]}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(row.value.sick[2], "sick")
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.sick[2]}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(
                            row.value.Bereavement[2],
                            "bereavement"
                          )
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.Bereavement[2]}
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">4</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(row.value.pto[3], "pto")
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.pto[3]}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(row.value.sick[3], "sick")
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.sick[3]}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          color: determineColor(
                            row.value.Bereavement[3],
                            "bereavement"
                          )
                            ? "error.main"
                            : "success.main",
                          fontWeight: "bold",
                        }}
                      >
                        {row.value.Bereavement[3]}
                      </Box>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Typography variant="h5" component="h2" textAlign="center" marginTop={2}>
        Graph
      </Typography>

      {/* <Graph /> */}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ marginTop: 1, marginBottom: 1 }}
          variant="contained"
          onClick={() => {
            props.setUserData(new Map());
            navigate("/", { replace: true });
          }}
        >
          Back to home
        </Button>
      </Box>
    </Container>
  );
};

export default MainApp;
