// importing components from react-router-dom package
import { Routes, Route } from "react-router-dom";
import React from "react";
import MainApp from "./Components/MainApp";
import SetupPage from "./Components/SetupPage";

function App() {
  const [userData, setUserData] = React.useState(new Map());
  const [preferences, setPreferences] = React.useState({
    startDate: "01/01/2022",
    targetPTO: 22,
    sickDays: 10,
    bereavement: 5,
  });

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
              setUserData={setUserData}
              preferences={preferences}
              setPreferences={setPreferences}
            />
          }
        />
        <Route
          path="/main"
          element={<MainApp userData={userData} preferences={preferences} />}
        />
      </Routes>
    </>
  );
}

export default App;
