import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import ProtectedRoute, { AuthRoute } from "./routes/protectedRoutes";

// Lazy-loaded components for optimal bundle splitting
const Home = lazy(() => import("./container/Homepage"));
const About = lazy(() => import("./features/auth/About"));
const Login = lazy(() => import("./features/auth/Login"));
const CV = lazy(() => import("./features/cv/CV"));
const MovieLayout = lazy(() => import("./features/movies/components/MovieLayout"));
const Movies = lazy(() => import("./features/movies/Movies"));
const NowPlaying = lazy(() => import("./features/movies/NowPlaying"));
const MoviesSearch = lazy(() => import("./features/movies/Search"));
const MoviesTopRated = lazy(() => import("./features/movies/TopRated"));
const MoviesUpcoming = lazy(() => import("./features/movies/Upcoming"));
const MovieDetail = lazy(() => import("./features/movies/Detail"));
const Todo = lazy(() => import("./features/todo/Todo"));
const NotFound = lazy(() => import("./features/auth/NotFound"));

function RootLayout() {
	return (
		<>
			<ScrollRestoration />
			<Suspense
				fallback={
					<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
						<div className="flex flex-col items-center gap-3">
							<div className="h-6 w-6 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
							<span className="text-xs font-medium tracking-wider uppercase text-zinc-500">
								Loading...
							</span>
						</div>
					</div>
				}
			>
				<Outlet />
			</Suspense>
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
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
export default router;
