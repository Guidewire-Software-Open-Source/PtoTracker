// setup page to set up the properties

import React from "react";
import CsvReader from "./CsvReader";
import { Typography, Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import Preferences from "./Preferences";
import { useNavigate } from "react-router-dom";

const SetupPage = (props) => {
  const [rawResult, setRawResult] = React.useState([]);
  const [userData, setUserData] = React.useState(new Map());
  const [startDate, setStartDate] = React.useState("");

  let navigate = useNavigate();

  // get the quarter based on date
  const getQuarter = (dateStr) => {
    const date = new Date(dateStr);
    return Math.floor(date.getMonth() / 3 + 1);
  };

  // check if date is after the selected start date
  const checkDate = (dateStr, startDate) => {
    if (!dateStr) return;
    const date = new Date(dateStr);
    // check if the given date is after today
    const day = startDate.getDate();
    const month = startDate.getMonth();
    const year = startDate.getFullYear();
    return (
      date.getDate() >= day &&
      date.getMonth() >= month &&
      date.getFullYear() >= year
    );
  };

  // to process the result
  const processResult = (result, startDate) => {
    console.log("inside function: ", startDate, "raw data: ", result);
    console.log("user data inside:", userData);
    for (let i = 1; i < result.length; i++) {
      const username = result[i][0];
      const type = result[i][2];
      // check if the date falls within our start date - current date
      // if not skip this date
      if (!checkDate(result[i][1], new Date(startDate))) continue;
      const quarter = getQuarter(result[i][1]);
      // use for array
      const quarterIndex = quarter - 1;
      let newData = {};

      // create new obj
      if (!userData.has(username)) {
        newData = {
          pto: [0, 0, 0, 0],
          sick: [0, 0, 0, 0],
          Bereavement: [0, 0, 0, 0],
        };
        if (type === "pto") {
          newData.pto[quarterIndex]++;
        } else if (type === "Sick") {
          newData.sick[quarterIndex]++;
        } else {
          newData.Bereavement[quarterIndex]++;
        }

        setUserData((map) => new Map(map.set(username, newData)));
      } else {
        // retrieve the existing data
        newData = userData.get(username);
        if (type === "pto") {
          newData.pto[quarterIndex]++;
        } else if (type === "Sick") {
          newData.sick[quarterIndex]++;
        } else {
          newData.Bereavement[quarterIndex]++;
        }
        setUserData((map) => new Map(map.set(username, newData)));
      }
    }
    // props.setUserData(userData);
  };

  // this effect process the result every time the preferences change
  React.useEffect(() => {
    if (!rawResult || !startDate) return;
    console.log("data from use effect:", rawResult);
    processResult(rawResult, startDate);
    console.log("map: ", userData);
  }, [rawResult]);

  // get the start date from parent
  React.useEffect(() => {
    if (!props.preferences) return;
    setStartDate(props.preferences.startDate);
  }, [props.preferences]);

  const submit = () => {
    console.log("submit called");
    // navigate("/main", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h2" textAlign="center" marginTop={4}>
        Welcome to Time off Calculator!
      </Typography>

      <Typography variant="subtitle1" textAlign="center" marginTop={4}>
        Please upload your CSV file to continue. For the CSV file format, please
        refer to the README file.
      </Typography>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CsvReader setRawResult={setRawResult} />
        </Box>
      </Container>
      <Preferences
        preferences={props.preferences}
        setPreferences={props.setPreferences}
      />
      <Button
        variant="contained"
        sx={{ marginTop: "2vh" }}
        onClick={() => submit()}
      >
        Let's Go
      </Button>
    </Box>
  );
};

export default SetupPage;
