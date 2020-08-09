import React from "react";
import "./style.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { MovieProvider } from "./MovieContext";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <MovieProvider>
            <Routes />
          </MovieProvider>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
