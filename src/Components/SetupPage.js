// setup page to set up the properties

import React from "react";
import CsvReader from "./CsvReader";
import { Typography, Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import Preferences from "./Preferences";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Test from "./test";

const SetupPage = (props) => {
  const [rawResult, setRawResult] = React.useState([]);
  // const [userData, setUserData] = React.useState(new Map());

  let navigate = useNavigate();

  const updateMap = (key, value) =>
    props.setUserData((map) => new Map(map.set(key, value)));

  // check if date is after the selected start date
  const checkDate = (dateStr) => {
    const startDate = moment(props.preferences.startDate);
    // parse date
    const date = moment(dateStr);
    // check if the given date is after today
    const day = startDate.date();
    const month = startDate.month();
    const year = startDate.year();
    return date.date() >= day && date.month() >= month && date.year() >= year;
  };

  // to process the result
  const processResult = () => {
    if (!rawResult) return;
    const result = rawResult;
    const userData = props.userData;
    for (let i = 1; i < result.length; i++) {
      const username = result[i][0];
      const type = result[i][2];
      // check if the date falls within our start date - current date
      // if not skip this date
      if (!checkDate(result[i][1]) || !result[i][1]) continue;
      const quarter = moment(result[i][1]).quarter();
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
        updateMap(username, newData);
        // setUserData((map) => new Map(map.set(username, newData)));
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
        updateMap(username, newData);
        // setUserData((map) => new Map(map.set(username, newData)));
      }
    }
  };

  // this effect process the result every time the preferences change
  // React.useEffect(() => {
  //   if (!rawResult || !props.preferences) return;
  //   console.log("raw result:", rawResult);
  //   processResult(rawResult);
  // }, [rawResult]);

  // console.log("user data from outside: ", userData);
  // console.log("preference:", props.preferences);

  const submit = () => {
    processResult();
    navigate("/main");
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
        Time off Calculator
      </Typography>

      <Typography variant="subtitle2" textAlign="center" marginTop={4}>
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
          <CsvReader
            setRawResult={setRawResult}
            // setUserData={props.setUserData}
            // processResult={processResult}
            // preferences={props.preferences}
          />
        </Box>
      </Container>
      <Preferences
        preferences={props.preferences}
        setPreferences={props.setPreferences}
        // processResult={processResult}
      />
      <Button
        variant="contained"
        sx={{ marginTop: "2vh" }}
        onClick={() => submit()}
      >
        Let's Go
      </Button>
      {/* <Test /> */}
    </Box>
  );
};

export default SetupPage;
