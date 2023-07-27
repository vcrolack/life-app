import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { LifeRoutes } from "../life/routes/LifeRoutes"


export const AppRouter = () => {
  return (
    <>
      <Routes>

        {/* login */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* lifeApp */}
        <Route path="/*" element={<LifeRoutes />} />

      </Routes>
    </>
  )
}
