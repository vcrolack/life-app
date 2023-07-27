import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"


export const LifeApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  )
}
