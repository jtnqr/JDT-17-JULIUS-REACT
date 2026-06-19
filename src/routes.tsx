import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import Home from "./container/Homepage";
import About from "./features/auth/About";
import Login from "./features/auth/Login";
import CV from "./features/cv/CV";
import MovieLayout from "./features/movies/components/MovieLayout";
import MovieDetail from "./features/movies/Detail";
import Movies from "./features/movies/Movies";
import NowPlaying from "./features/movies/NowPlaying";
import MoviesSearch from "./features/movies/Search";
import MoviesTopRated from "./features/movies/TopRated";
import MoviesUpcoming from "./features/movies/Upcoming";
import Todo from "./features/todo/Todo";
import ProtectedRoute, { AuthRoute } from "./routes/protectedRoutes";

function RootLayout() {
	return (
		<>
			<ScrollRestoration />
			<Outlet />
		</>
	);
}

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: "/",
						element: <Home />,
					},
					{
						path: "/movies",
						element: <MovieLayout />,
						children: [
							{
								index: true,
								element: <Movies />,
							},
							{
								path: "now-playing",
								element: <NowPlaying />,
							},
							{
								path: "search",
								element: <MoviesSearch />,
							},
							{
								path: "top-rated",
								element: <MoviesTopRated />,
							},
							{
								path: "upcoming",
								element: <MoviesUpcoming />,
							},
							{
								path: ":id",
								element: <MovieDetail />,
							},
						],
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
		],
	},
]);
export default router;
