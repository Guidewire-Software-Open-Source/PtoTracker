import React from "react";
import { Typography, TextField, Grid, Button } from "@mui/material";

const Preferences = (props) => {
  const save = () => {
    props.setPreferences("abc");
  };
  return (
    <>
      <Typography variant="h5" component="h2" textAlign="center" marginTop={1}>
        Preferences
      </Typography>
      <Typography variant="subtitle2" textAlign="center">
        You can leave this at default. Preferences will not be saved until you
        click on the "Save" button.
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "2px",
          maxWidth: "60vw",
        }}
      >
        <Grid item xs={12} md={4}>
          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue="2017-05-24"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            id="targetPTO"
            label="Target PTO"
            variant="outlined"
            autoComplete="off"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            id="sickDays"
            label="Target Sick Days"
            variant="outlined"
            autoComplete="off"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="bereavement"
            fullWidth
            label="Target Bereavement"
            variant="outlined"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ marginTop: "2vh" }}
        onClick={() => save()}
      >
        Save
      </Button>
    </>
  );
};

export default Preferences;
