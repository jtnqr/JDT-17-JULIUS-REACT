import { useState } from "react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import { useGetPopularMoviesQuery } from "./moviesApi";

const Movies = () => {
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const { data, isLoading, isFetching, error } = useGetPopularMoviesQuery(page);

	const popularMovies = data?.results || [];

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		const element = document.getElementById("popular-heading");
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
			{/* Sleek Search Header */}
			<section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
				<div className="absolute inset-0 -z-10 bg-linear-to-b from-amber-500/5 to-transparent blur-3xl rounded-full" />
				<h1 className="text-3xl sm:text-5xl font-black text-zinc-50 tracking-tight mb-6 leading-tight">
					Find your next favorite movie.
				</h1>
				<form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
					<input
						type="text"
						placeholder="Search for movies, actors, or genres..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-6 pr-24 py-4 bg-zinc-900/40 border border-zinc-800/80 focus:border-amber-500/60 rounded-2xl text-base text-zinc-150 placeholder-zinc-500 focus:outline-hidden transition-all duration-300 shadow-inner"
					/>
					<button
						type="submit"
						className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors duration-200 cursor-pointer"
					>
						Search
					</button>
				</form>
			</section>

			{/* Popular Movies Section */}
			<section
				id="popular-section"
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-left"
			>
				<div className="border-t border-zinc-800/80 pt-10">
					{/* Header */}
					<div
						id="popular-heading"
						className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-900 pb-6"
					>
						<div>
							<h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-3">
								Movie Directory
							</h2>
							<h3 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
								Popular Movies Right Now
							</h3>
						</div>

						<div className="flex items-center gap-4 w-full md:w-auto shrink-0">
							<Badge
								variant="secondary"
								className="px-3 py-1 h-7 rounded-full text-sm font-semibold border-zinc-800 text-amber-400 bg-amber-500/10 shrink-0"
							>
								{isLoading || isFetching ? "Loading..." : `${popularMovies.length} Movies`}
							</Badge>
						</div>
					</div>

					{/* Directory Listing States */}
					{isLoading || isFetching ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
					) : popularMovies.length === 0 ? (
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
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
								{popularMovies.map((movie) => (
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
