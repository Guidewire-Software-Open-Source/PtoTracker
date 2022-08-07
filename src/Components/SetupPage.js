// setup page to set up the properties

import React from "react";
import CsvReader from "./CsvReader";
import { Typography, Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import Preferences from "./Preferences";
import { useNavigate } from "react-router-dom";

const SetupPage = (props) => {
  let navigate = useNavigate();

  const submit = () => {
    console.log("submit called");
    navigate("/main", { replace: true });
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
          <CsvReader
            setUserData={props.setUserData}
            preferences={props.preferences}
          />
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
