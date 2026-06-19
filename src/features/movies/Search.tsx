import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useToken } from "../auth/useToken";
import MovieCard from "./components/MovieCard";
import MovieNavigation from "./components/MovieNavigation";
import { useLazySearchMoviesQuery } from "./moviesApi";

export default function Search() {
	const { user, logout } = useToken();
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	const [triggerSearch, { data, isFetching, isError, error }] = useLazySearchMoviesQuery();

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(searchQuery);
		}, 400);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	useEffect(() => {
		if (debouncedQuery.trim()) {
			document.title = `Search: "${debouncedQuery}" | JDT-17 Page`;
			triggerSearch({ query: debouncedQuery, page: 1 });
		} else {
			document.title = "Search Movies | JDT-17 Page";
		}
	}, [debouncedQuery, triggerSearch]);

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	if (!user) {
		return null;
	}

	const searchResults = data?.results || [];

	let errorMessage = "";
	if (error) {
		if ("status" in error) {
			errorMessage = `Error: ${error.status} ${JSON.stringify(error.data)}`;
		} else {
			errorMessage = error.message || "An unexpected error occurred";
		}
	}

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
			{/* Header Navigation */}
			<header className="sticky top-0 z-50 w-full border-b border-zinc-900/60 bg-zinc-950/80 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					{/* Logo */}
					<Link to="/movies" className="flex items-center gap-3 group">
						<span className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-base shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/20">
							PH
						</span>
						<span className="font-bold text-lg tracking-tight text-zinc-50 group-hover:text-amber-400 transition-colors duration-300">
							PilemHub
						</span>
					</Link>

					{/* Center Nav Link (Back to Hub) */}
					<nav aria-label="Module navigation">
						<Button
							asChild
							variant="ghost"
							className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/40 px-4 py-2 rounded-xl text-sm font-semibold gap-1"
						>
							<Link to="/">
								<svg
									className="w-4 h-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<title>Home Icon</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
								Hub Portal
							</Link>
						</Button>
					</nav>

					{/* Right Profile / Logout */}
					<div className="flex items-center gap-4">
						<Button
							asChild
							variant="ghost"
							className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/40 p-2 rounded-xl"
						>
							<Link to="/about">
								<div className="flex items-center gap-2">
									<span className="hidden sm:inline text-xs font-semibold">{user.username}</span>
									<div className="h-8 w-8 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
										{user.image ? (
											<img
												src={user.image}
												alt={user.username}
												className="h-full w-full object-cover"
											/>
										) : (
											<span className="text-zinc-300 font-bold text-xs">
												{user.username[0].toUpperCase()}
											</span>
										)}
									</div>
								</div>
							</Link>
						</Button>

						<Button
							onClick={handleLogout}
							variant="ghost"
							className="text-zinc-400 hover:text-destructive hover:bg-destructive/10 px-3 py-1.5 text-xs font-bold rounded-xl cursor-pointer"
						>
							Log Out
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
				<MovieNavigation />

				{/* Directory Header with Search */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-900 pb-6">
					<div>
						<h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-3">
							Movie Directory
						</h2>
						<h3 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
							Search Movies
						</h3>
					</div>

					{/* Sleek Search Input */}
					<div className="flex items-center gap-4 w-full md:w-auto shrink-0">
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

						{debouncedQuery.trim() && (
							<Badge
								variant="secondary"
								className="px-3 py-1 h-7 rounded-full text-sm font-semibold border-zinc-800 text-amber-400 bg-amber-500/10 shrink-0"
							>
								{isFetching ? "Loading..." : `${searchResults.length} Matches`}
							</Badge>
						)}
					</div>
				</div>

				{/* Directory Listing States */}
				{isFetching ? (
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
				) : isError ? (
					<Card className="border-destructive/30 bg-destructive/10 text-destructive rounded-2xl p-6">
						<CardTitle className="text-destructive font-bold text-lg mb-2">
							Error Loading Movies
						</CardTitle>
						<CardDescription className="text-destructive/80 text-sm">
							{errorMessage}
						</CardDescription>
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
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{searchResults.map((movie) => (
							<MovieCard key={movie.id} movie={movie} />
						))}
					</div>
				)}
			</main>

			{/* Footer aligned with project branding */}
			<footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-3">
						<span className="text-zinc-400 text-sm font-semibold tracking-wide">
							JDT-17 © {new Date().getFullYear()}
						</span>
					</div>
					<p className="text-zinc-500 text-xs text-center sm:text-left leading-relaxed">
						Project 1: Module Selection Hub
					</p>
				</div>
			</footer>
		</div>
	);
}
