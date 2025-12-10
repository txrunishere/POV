import { Routes, Route } from "react-router";
import { ROUTES } from "./lib/constants";
import AuthLayout from "./_auth/auth-layout";
import SigninForm from "./_auth/forms/signin-form";
import SignupForm from "./_auth/forms/signup-form";
import {
  Home,
  AllUsers,
  CreatePost,
  Explore,
  PostDetails,
  Profile,
  Saved,
  UpdatePost,
  UpdateProfile,
} from "./_root/pages";
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
          <Route path={ROUTES.ALLUSERS} element={<AllUsers />} />
          <Route path={ROUTES.CREATEPOST} element={<CreatePost />} />
          <Route path={ROUTES.EXPLORE} element={<Explore />} />
          <Route path={ROUTES.POSTDETAILS} element={<PostDetails />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.SAVED} element={<Saved />} />
          <Route path={ROUTES.UPDATEPOST} element={<UpdatePost />} />
          <Route path={ROUTES.UPDATEPROFILE} element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
