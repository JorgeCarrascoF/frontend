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
import Unauthorized from "./routes/Unauthorized";
import Layout from "./components/Layout";
import Logs from "./routes/Logs";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users/create"
            element={
              <AdminPrivateRoute>
                <Register />
              </AdminPrivateRoute>
            }
          />
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
                <Logs />
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
      </Layout>
    </BrowserRouter>
  );
}

export default App;
