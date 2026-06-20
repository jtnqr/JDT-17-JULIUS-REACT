import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import MovieCard from "./components/MovieCard";
import MoviePageHeader from "./components/MoviePageHeader";
import Pagination from "./components/Pagination";
import { useMoviePagination } from "./hooks/useMoviePagination";
import { useGetNowPlayingMoviesQuery } from "./moviesApi";

const Movies = () => {
	const [page, setPage] = useMoviePagination();
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Now Playing Movies | JDT-17";
	}, []);

	const { data, isLoading, isFetching, error } = useGetNowPlayingMoviesQuery(page);

	const nowPlayingMovies = data?.results || [];

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		const element = document.getElementById("now-playing-section");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/movies/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	let errorMessage = "";
	if (error) {
		if ("status" in error) {
			errorMessage = `Error: ${error.status} ${JSON.stringify(error.data)}`;
		} else {
			errorMessage = error.message || "An unexpected error occurred";
		}
	}

	return (
		<div className="w-full">
			{/* Hero Search Section */}
			<section className="relative h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden bg-radial from-zinc-900 via-zinc-950 to-zinc-950 px-4 sm:px-6 lg:px-8 border-b border-zinc-900/60">
				{/* Background Glow effects */}
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
				<div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

				<form
					onSubmit={handleSearchSubmit}
					className="relative z-10 w-full max-w-2xl text-center space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
				>
					<div className="space-y-3 text-center">
						<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400">
							Explore Cinema
						</h1>
						<p className="text-zinc-400 text-base md:text-lg font-medium max-w-lg mx-auto!">
							Search millions of movies, check what's playing now, or explore top-rated films.
						</p>
					</div>

					<div className="relative w-full max-w-xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
						<input
							type="text"
							placeholder="Search movies..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/50 pl-6 pr-32 py-4 rounded-2xl text-base text-zinc-100 placeholder-zinc-500 focus:outline-hidden transition-all duration-300 shadow-inner"
						/>
						<button
							type="submit"
							className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors duration-200 cursor-pointer"
						>
							Search
						</button>
					</div>
				</form>
			</section>

			{/* Now Playing Movies Section */}
			<section
				id="now-playing-section"
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-left"
			>
				<div className="border-t border-zinc-800/80 pt-10">
					{/* Header */}
					<MoviePageHeader title="Now Playing in Theaters" />

					{/* Directory Listing States */}
					{isLoading || isFetching ? (
						<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
							{[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
								<div
									key={key}
									className="animate-pulse flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-sm"
								>
									<div className="aspect-2/3 w-full bg-zinc-800" />
									<div className="p-4 flex-1 space-y-3">
										<div className="flex justify-between gap-2">
											<div className="h-5 bg-zinc-800 rounded w-2/3" />
											<div className="h-4 bg-zinc-800 rounded w-1/6" />
										</div>
										<div className="space-y-2">
											<div className="h-3 bg-zinc-800 rounded w-full" />
											<div className="h-3 bg-zinc-800 rounded w-5/6" />
										</div>
									</div>
								</div>
							))}
						</div>
					) : error ? (
						<Card className="border-destructive/30 bg-destructive/10 text-destructive rounded-2xl p-6">
							<CardTitle className="text-destructive font-bold text-lg mb-2">
								Error Loading Movies
							</CardTitle>
							<CardDescription className="text-destructive/80 text-sm">
								{errorMessage}
							</CardDescription>
						</Card>
					) : nowPlayingMovies.length === 0 ? (
						<Card className="border-dashed border-zinc-800 bg-zinc-950 p-16 text-center max-w-md mx-auto rounded-2xl flex flex-col items-center justify-center">
							<div className="h-12 w-12 rounded-full bg-zinc-900/80 flex items-center justify-center text-zinc-500 mb-4 border border-zinc-800">
								<svg
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<title>Warning Icon</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									>
										<title>Warning Icon</title>
									</path>
								</svg>
							</div>
							<CardTitle className="font-bold text-lg mb-2 text-zinc-100">
								No Movies Found
							</CardTitle>
							<CardDescription className="text-zinc-500 text-sm">
								We couldn't find any results. Try adjusting your filter or categories.
							</CardDescription>
						</Card>
					) : (
						<>
							<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
								{nowPlayingMovies.map((movie) => (
									<MovieCard key={movie.id} movie={movie} />
								))}
							</div>

							<Pagination
								currentPage={page}
								totalPages={data?.total_pages || 1}
								onPageChange={handlePageChange}
							/>
						</>
					)}
				</div>
			</section>
		</div>
	);
};

export default Movies;
