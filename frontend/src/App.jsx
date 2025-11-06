import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Homepage from "./pages/Homepage";
import ProblemsPage from "./pages/ProblemsPage";
import { ToastContainer } from "react-toastify";

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
}

export default App;
