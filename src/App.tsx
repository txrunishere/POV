import { Routes, Route } from "react-router";
import { ROUTES } from "./utils/constants";
import AuthLayout from "./_auth/auth-layout";
import SigninForm from "./_auth/forms/signin-form";
import SignupForm from "./_auth/forms/signup-form";
import { Home } from "./_root/pages";
import RootLayout from "./_root/root-layout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.SIGNIN} element={<SigninForm />} />
          <Route path={ROUTES.SIGNUP} element={<SignupForm />} />
        </Route>

        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
