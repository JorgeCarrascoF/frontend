import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Header from "./components/Header";
import Users from "./routes/Users";
import PrivateRoute from "./components/PrivateRoute";
import LogPage from "./routes/LogPage";
import LogEditPage from "./routes/LogEditPage";
import LogCreatePage from "./routes/LogCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/log/:id"
          element={
            <PrivateRoute>
              <LogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/log/:id/edit"
          element={
            <PrivateRoute>
              <LogEditPage />
            </PrivateRoute>
          }
          />
        <Route
          path="/dashboard/log/create"
          element={
            <PrivateRoute>
              <LogCreatePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
