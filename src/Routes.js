import React, { useContext } from "react";
import logo from "./img/logo.png";
import { Link, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { UserContext } from "./UserContext";
import MovieList from "./pages/MovieList";

function Routes() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  return (
    <>
      <header>
        <img id="logo" src={logo} alt="Sanbercode" width="200px" />
        <nav>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {isLoggedIn ? (
              <>
                <Link to="/movielist">Movie List Editor</Link>
                {/* eslint-disable-next-line */}
                <a
                  onClick={() => {
                    alert("You logged out");
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </a>
              </>
            ) : (
              // eslint-disable-next-line
              <a
                onClick={() => {
                  alert("Welcome");
                  setIsLoggedIn(true);
                }}
              >
                Login
              </a>
            )}
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/movielist">
          <MovieList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
