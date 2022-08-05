import "./App.css";
// importing components from react-router-dom package
import { Routes, Route } from "react-router-dom";
import React from "react";
import MainApp from "./MainApp";
import SetupPage from "./SetupPage";

function App() {
  const [userData, setUserData] = React.useState(new Map());
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
          element={<SetupPage setUserData={setUserData} />}
        />
        <Route path="/main" element={<MainApp userData={userData} />} />
      </Routes>
    </>
  );
}

export default App;
