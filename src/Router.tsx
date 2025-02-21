import { Route, Routes } from "react-router";
import HomePage from "./pages/home";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
};
