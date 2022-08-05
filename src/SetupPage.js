// setup page to set up the properties

import React from "react";
import CsvReader from "./CsvReader";
import { Typography, Box } from "@mui/material";
import { Container } from "@mui/system";

const SetupPage = (props) => {
  return (
    <div>
      <Typography variant="h4" component="h2" textAlign="center" marginTop={4}>
        Welcome to Time off Calculator!
      </Typography>
      <Typography variant="subtitle1" textAlign="center" marginBottom={4}>
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
          <CsvReader setUserData={props.setUserData} />
        </Box>
      </Container>
    </div>
  );
};

export default SetupPage;
