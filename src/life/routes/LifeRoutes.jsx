import { Navigate, Route, Routes } from "react-router-dom"
import { LifePage } from "../pages/LifePage"


export const LifeRoutes = () => {
  return (
    <Routes >
      <Route path="/" element={<LifePage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
