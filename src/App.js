/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Tree from "./pages/Tree";
import routes from "./data/routes";
import { FETCHED_USER, selectUser } from "./store/reducers/auth.reducers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const userId = useSelector((state) => selectUser(state));
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user"))
      dispatch(FETCHED_USER(JSON.parse(localStorage.getItem("user"))));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute condition={userId} redirectTo="/" Component={Login} />
          }
          exact
        />
        <Route
          path="/tree"
          element={
            <AuthRoute
              condition={!userId}
              redirectTo="/login"
              Component={Tree}
            />
          }
        />

        <Route
          path="/"
          element={
            <AuthRoute
              condition={!userId}
              redirectTo="/login"
              Component={Dashboard}
            />
          }
        >
          {routes.map(({ Component, path }) => (
            <Route path={path} element={<Component />} key={path} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
