import { createBrowserRouter } from "react-router";
import Home from "./container/Homepage";
import About from "./features/auth/About";
import Login from "./features/auth/Login";
import CV from "./features/cv/CV";
import MovieDetail from "./features/movies/Detail";
import Movies from "./features/movies/Movies";
import Todo from "./features/todo/Todo";
import ProtectedRoute, { AuthRoute } from "./routes/protectedRoutes";

export const router = createBrowserRouter([
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/movies",
				element: <Movies />,
			},
			{
				path: "/movies/:id",
				element: <MovieDetail />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/todo",
				element: <Todo />,
			},
			{
				path: "/cv-page",
				element: <CV />,
			},
		],
	},
	{
		element: <AuthRoute />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);
export default router;
