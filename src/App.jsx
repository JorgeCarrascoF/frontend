import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Users from "./routes/Users";
import PrivateRoute from "./components/PrivateRoute";
import LogPage from "./routes/LogPage";
import LogEditPage from "./routes/LogEditPage";
import LogCreatePage from "./routes/LogCreatePage";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import LogCommentsPage from "./routes/LogCommentsPage";
import Unauthorized from "./routes/Unauthorized";
import Layout from "./components/Layout";
import Logs from "./routes/Logs";
import Profile from "./routes/Profile";
import UserDetail from "./routes/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/users/register"
            element={
              <AdminPrivateRoute>
                <Register />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AdminPrivateRoute>
                <Users />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <UserDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminPrivateRoute>
                <Logs />
              </AdminPrivateRoute>
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
            path="/dashboard/log/:id/comments"
            element={
              <PrivateRoute>
                <LogCommentsPage />
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
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
