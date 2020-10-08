import Admin from "../components/Admin/Admin";
import LandingPage from "../components/Landing/LandingPage";
import Login from "../components/Login/Login";
import RecipeList from "../components/Recipes/RecipeList";
import Register from "../components/Register/Register";
import UserPage from "../components/Users.js/UserPage";

export default {
  routes: [
    {
      component: Login,
      url: "/login",
      roles: [],
    },
    {
      component: Register,
      url: "/register",
      roles: [],
    },
    {
      component: LandingPage,
      url: "/",
      roles: [],
    },
    {
      component: UserPage,
      url: "/user",
      roles: ["user"],
    },
    {
      component: RecipeList,
      url: "/recipelist",
      roles: ["recipe"],
    },
    {
      component: Admin,
      url: "/admin",
      roles: ["recipe"],
    },
  ],
};
