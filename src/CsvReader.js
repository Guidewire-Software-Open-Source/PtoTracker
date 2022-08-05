import React from "react";
import { useCSVReader } from "react-papaparse";

import { useNavigate } from "react-router-dom";

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  browseFile: {
    width: "20%",
  },
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%",
  },
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  },
  progressBarBackgroundColor: {
    backgroundColor: "red",
  },
};

const CsvReader = (props) => {
  const [userData, setUserData] = React.useState(new Map());

  const { CSVReader } = useCSVReader();

  let navigate = useNavigate();

  // get the quarter based on date
  const getQuarter = (dateStr) => {
    const date = new Date(dateStr);
    return Math.floor(date.getMonth() / 3 + 1);
  };

  // to process the result
  const processResult = (result) => {
    for (let i = 1; i < result.length; i++) {
      const username = result[i][0];
      const type = result[i][2];
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

    props.setUserData(userData);
  };

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        console.log("---------------------------");
        console.log(results);
        console.log("---------------------------");
        processResult(results.data);
        navigate("/main", { replace: true });
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <div style={styles.csvReader}>
            <button type="button" {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
  );
};

export default CsvReader;
