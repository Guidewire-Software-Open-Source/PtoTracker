import React from "react";
import { Typography, TextField, Grid, Button } from "@mui/material";

const Preferences = (props) => {
  if (!props.preferences) return null;
  // const save = () => {
  //   // props.setPreferences("abc");
  //   props.processResult();
  // };
  return (
    <>
      <Typography variant="h5" component="h2" textAlign="center" marginTop={1}>
        Preferences
      </Typography>
      <Typography variant="subtitle2" textAlign="center">
        You can change the start date of the period, target PTO, sick days and
        Bereavement.
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
            defaultValue={new Date(props.preferences.startDate)}
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
            defaultValue={props.preferences.targetPTO}
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
      {/* <Button
        variant="contained"
        sx={{ marginTop: "2vh" }}
        onClick={() => save()}
      >
        Save
      </Button> */}
    </>
  );
};

export default Preferences;
