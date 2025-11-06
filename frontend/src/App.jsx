import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Homepage from "./pages/Homepage";
import ProblemsPage from "./pages/ProblemsPage";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <Homepage /> : <Navigate to={"/dashboard"} />}
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
}

export default App;
