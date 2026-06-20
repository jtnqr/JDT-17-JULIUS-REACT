import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import MovieCard from "./components/MovieCard";
import MoviePageHeader from "./components/MoviePageHeader";
import Pagination from "./components/Pagination";
import { useMoviePagination } from "./hooks/useMoviePagination";
import { useSearchMoviesQuery } from "./moviesApi";

export default function Search() {
	const [searchParams, setSearchParams] = useSearchParams();

	const initialQuery = searchParams.get("q") || "";

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
	const [page, setPage] = useMoviePagination();

	const { data, isFetching, isError, error } = useSearchMoviesQuery(
		{ query: debouncedQuery, page },
		{ skip: !debouncedQuery.trim() },
	);

	// Synchronize state when URL query params change (e.g. on load or nav back)
	// biome-ignore lint/correctness/useExhaustiveDependencies: only sync when searchParams change to prevent typing lock
	useEffect(() => {
		const q = searchParams.get("q") || "";
		if (q !== searchQuery) {
			setSearchQuery(q);
			setDebouncedQuery(q);
		}
	}, [searchParams]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(searchQuery);
		}, 400);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	// Update URL search query on debounced search changes
	useEffect(() => {
		if (debouncedQuery.trim()) {
			setSearchParams({ q: debouncedQuery }, { replace: true });
		} else {
			setSearchParams({}, { replace: true });
		}
	}, [debouncedQuery, setSearchParams]);

	// Reset page to 1 when search query changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: reset page when query changes
	useEffect(() => {
		setPage(1);
	}, [debouncedQuery]);

	useEffect(() => {
		if (debouncedQuery.trim()) {
			document.title = `Search: "${debouncedQuery}" | JDT-17`;
		} else {
			document.title = "Search Movies | JDT-17";
		}
	}, [debouncedQuery]);

	const searchResults = data?.results || [];

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		const element = document.getElementById("search-results-section");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
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
		<div
			id="search-results-section"
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left"
		>
			{/* Directory Header with Search */}
			<MoviePageHeader
				title="Search Movies"
				movieCount={debouncedQuery.trim() ? data?.total_results : undefined}
				isLoading={isFetching}
			>
				{/* Sleek Search Input */}
				<div className="relative w-full md:w-80">
					<svg
						className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<title>Search Icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						placeholder="Search movies by title..."
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
						}}
						className="w-full pl-10 pr-10 py-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 focus:border-amber-500/50 rounded-xl text-sm text-zinc-150 placeholder-zinc-500 focus:outline-hidden transition-all duration-300 shadow-inner"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => {
								setSearchQuery("");
								setDebouncedQuery("");
							}}
							className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
							aria-label="Clear search"
						>
							<svg
								className="w-3.5 h-3.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2.5}
							>
								<title>Clear Icon</title>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					)}
				</div>
			</MoviePageHeader>

			{/* Directory Listing States */}
			{isFetching ? (
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
			) : isError ? (
				<Card className="border-destructive/30 bg-destructive/10 text-destructive rounded-2xl p-6">
					<CardTitle className="text-destructive font-bold text-lg mb-2">
						Error Loading Movies
					</CardTitle>
					<CardDescription className="text-destructive/80 text-sm">{errorMessage}</CardDescription>
				</Card>
			) : !debouncedQuery.trim() ? (
				<Card className="border-dashed border-zinc-800 bg-zinc-950 p-16 text-center max-w-md mx-auto rounded-2xl flex flex-col items-center justify-center">
					<div className="h-12 w-12 rounded-full bg-zinc-900/80 flex items-center justify-center text-zinc-500 mb-4 border border-zinc-800">
						<svg
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<title>Search Icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<CardTitle className="font-bold text-lg mb-2 text-zinc-100">Start Searching</CardTitle>
					<CardDescription className="text-zinc-500 text-sm">
						Type a movie title to search from our directory.
					</CardDescription>
				</Card>
			) : searchResults.length === 0 ? (
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
							/>
						</svg>
					</div>
					<CardTitle className="font-bold text-lg mb-2 text-zinc-100">No Movies Found</CardTitle>
					<CardDescription className="text-zinc-500 text-sm">
						We couldn't find any results matching "{debouncedQuery}". Try adjusting your keywords.
					</CardDescription>
				</Card>
			) : (
				<>
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
						{searchResults.map((movie) => (
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
	);
}
