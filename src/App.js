// importing components from react-router-dom package
import { Routes, Route } from "react-router-dom";
import React from "react";
import MainApp from "./Components/MainApp";
import SetupPage from "./Components/SetupPage";
import moment from "moment";

function App() {
  const [userData, setUserData] = React.useState(new Map());
  const [preferences, setPreferences] = React.useState({
    startDate: moment().format("YYYY-MM-DD").toString(),
    targetPTO: 22,
    sickDays: 10,
    bereavement: 2,
  });

  React.useEffect(() => {
    console.log("user data changing:", userData);
  }, [userData]);

  console.log("user data :", userData);
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SetupPage
              userData={userData}
              setUserData={setUserData}
              preferences={preferences}
              setPreferences={setPreferences}
            />
          }
        />
        <Route
          path="/main"
          element={
            <MainApp
              userData={userData}
              setUserData={setUserData}
              preferences={preferences}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
