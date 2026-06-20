import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MovieCard from "./components/MovieCard";
import {
	useGetMovieCreditsQuery,
	useGetMovieDetailsQuery,
	useGetMovieRecommendationsQuery,
	useGetMovieVideosQuery,
} from "./moviesApi";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const TMDB_CAST_BASE = "https://image.tmdb.org/t/p/w185";

const MovieDetail = () => {
	const { id } = useParams<{ id: string }>();

	const trailerRef = useRef<HTMLDivElement>(null);

	const {
		data: movie,
		isLoading: isDetailsLoading,
		error: detailsError,
	} = useGetMovieDetailsQuery(id || "", { skip: !id });

	const {
		data: credits,
		isLoading: isCreditsLoading,
		error: creditsError,
	} = useGetMovieCreditsQuery(id || "", { skip: !id });

	const {
		data: videosData,
		isLoading: isVideosLoading,
		error: videosError,
	} = useGetMovieVideosQuery(id || "", { skip: !id });

	const {
		data: recommendationsData,
		isLoading: isRecsLoading,
		error: recsError,
	} = useGetMovieRecommendationsQuery({ id: id || "" }, { skip: !id });

	const isLoading = isDetailsLoading || isCreditsLoading || isVideosLoading || isRecsLoading;
	const firstError = detailsError || creditsError || videosError || recsError;

	let errorMessage = "";
	if (firstError) {
		if ("status" in firstError) {
			errorMessage = `Error: ${firstError.status} ${JSON.stringify(firstError.data)}`;
		} else {
			errorMessage = firstError.message || "An unexpected error occurred";
		}
	}

	useEffect(() => {
		if (movie?.title) {
			document.title = `${movie.title} | JDT-17`;
		}
	}, [movie?.title]);

	const formatCurrency = (amount?: number) => {
		if (!amount) return "N/A";
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatRuntime = (minutes?: number) => {
		if (!minutes) return "N/A";
		const hrs = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
	};

	const scrollToTrailer = () => {
		trailerRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const cast = (credits?.cast || []).slice(0, 6);

	const videos = videosData?.results || [];
	const officialTrailer = videos.find(
		(v) => v.site === "YouTube" && v.type === "Trailer" && v.official,
	);
	const fallbackTrailer = videos.find(
		(v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
	);
	const trailer = officialTrailer || fallbackTrailer || null;

	const recommendations = (recommendationsData?.results || []).slice(0, 4);

	if (isLoading) {
		return (
			<>
				{/* Shimmer Hero */}
				<div className="relative h-[50vh] bg-zinc-900 animate-pulse w-full flex items-end p-8">
					<div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8 items-center md:items-end">
						<div className="w-48 h-72 bg-zinc-800 rounded-2xl shrink-0" />
						<div className="flex-1 space-y-4 w-full">
							<div className="h-10 bg-zinc-800 rounded-lg w-2/3" />
							<div className="h-5 bg-zinc-800 rounded w-1/4" />
							<div className="h-6 bg-zinc-800 rounded w-1/3" />
						</div>
					</div>
				</div>

				{/* Shimmer Content Grid */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
					<div className="lg:col-span-2 space-y-8">
						<div className="space-y-3">
							<div className="h-6 bg-zinc-900 rounded w-1/4" />
							<div className="h-4 bg-zinc-900 rounded w-full" />
							<div className="h-4 bg-zinc-900 rounded w-5/6" />
							<div className="h-4 bg-zinc-900 rounded w-4/5" />
						</div>
						<div className="space-y-4">
							<div className="h-6 bg-zinc-900 rounded w-1/4" />
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<div key={i} className="h-20 bg-zinc-900 rounded-xl" />
								))}
							</div>
						</div>
					</div>
					<div className="space-y-6">
						<div className="h-64 bg-zinc-900 rounded-2xl" />
					</div>
				</div>
			</>
		);
	}

	if (firstError || !movie) {
		return (
			<div className="flex flex-col items-center justify-center p-8 py-24 min-h-[50vh]">
				<div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-6">
					<div className="h-12 w-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
						<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<title>Warning Icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h2 className="text-xl font-bold">Failed to Load Movie</h2>
					<p className="text-zinc-400 text-sm">
						{errorMessage || "The movie details could not be found."}
					</p>
					<Button
						asChild
						className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold"
					>
						<Link to="/movies">Return to Directory</Link>
					</Button>
				</div>
			</div>
		);
	}

	const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
	const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

	return (
		<>
			{/* Backdrop Hero section */}
			<section className="relative w-full h-[65vh] min-h-100 md:h-[60vh] bg-zinc-950 overflow-hidden flex items-end">
				{/* Backdrop Image */}
				{movie.backdrop_path ? (
					<div className="absolute inset-0 z-0">
						<img
							src={`${TMDB_BACKDROP_BASE}${movie.backdrop_path}`}
							alt={movie.title}
							className="w-full h-full object-cover object-center scale-105 blur-[2px] opacity-40"
						/>
						{/* Soft backdrop vignette and gradient overlays */}
						<div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/40" />
						<div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-transparent to-zinc-950/30" />
					</div>
				) : (
					<div className="absolute inset-0 z-0 bg-linear-to-br from-zinc-900 to-zinc-950" />
				)}

				{/* Hero content container */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 md:pb-12 text-left">
					<div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
						{/* Poster */}
						<div className="w-48 md:w-60 aspect-2/3 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900 group">
							{movie.poster_path ? (
								<img
									src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
									alt={movie.title}
									className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
								/>
							) : (
								<div className="w-full h-full flex flex-col items-center justify-center p-6 text-zinc-650 bg-zinc-900">
									<svg
										className="w-12 h-12 mb-2 opacity-30"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>Film Icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
										/>
									</svg>
									<span className="text-xs text-center font-semibold">{movie.title}</span>
								</div>
							)}
						</div>

						{/* Metadata */}
						<div className="flex-1 text-center md:text-left space-y-4">
							<div className="space-y-2">
								{movie.tagline && (
									<span className="text-xs md:text-sm font-bold tracking-widest text-amber-500 uppercase">
										{movie.tagline}
									</span>
								)}
								<h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-50 leading-tight">
									{movie.title}
								</h1>
							</div>

							{/* Core Badges Row */}
							<div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-zinc-300">
								<Badge className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border-amber-500/20 px-2.5 py-0.5 font-bold rounded-lg gap-1">
									<svg className="w-3.5 h-3.5 fill-current text-amber-500" viewBox="0 0 20 20">
										<title>Star Icon</title>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									{rating}
								</Badge>

								<span className="text-zinc-600">•</span>
								<span className="font-semibold text-zinc-300">{releaseYear}</span>

								<span className="text-zinc-600">•</span>
								<span className="font-semibold text-zinc-300">{formatRuntime(movie.runtime)}</span>

								{movie.status && (
									<>
										<span className="text-zinc-600">•</span>
										<Badge
											variant="outline"
											className="border-zinc-800 text-zinc-400 capitalize text-xs px-2 py-0.5 rounded-md"
										>
											{movie.status}
										</Badge>
									</>
								)}
							</div>

							{/* Genres List */}
							<div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
								{movie.genres?.map((genre) => (
									<Badge
										key={genre.id}
										variant="secondary"
										className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-full px-3 py-1 text-xs"
									>
										{genre.name}
									</Badge>
								))}
							</div>

							{/* Primary Action Buttons */}
							<div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
								{trailer && (
									<Button
										onClick={scrollToTrailer}
										className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-6 py-5 rounded-xl text-sm gap-2 transition-transform hover:scale-102"
									>
										<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
											<title>Play Icon</title>
											<path d="M8 5v14l11-7z" />
										</svg>
										Watch Trailer
									</Button>
								)}

								<Button
									asChild
									variant="outline"
									className="border-zinc-800 hover:bg-zinc-900 text-zinc-300 px-6 py-5 rounded-xl text-sm"
								>
									<Link to="/movies">Back to Directory</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Details Grid */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Main Content Area */}
					<div className="lg:col-span-2 space-y-12">
						{/* Overview */}
						<div className="space-y-4">
							<h2 className="text-2xl font-bold tracking-tight text-zinc-50 border-b border-zinc-900 pb-3">
								Synopsis
							</h2>
							<p className="text-zinc-300 leading-relaxed text-base md:text-lg">
								{movie.overview || "No synopsis available for this movie."}
							</p>
						</div>

						{/* Cast Section */}
						<div className="space-y-6">
							<h2 className="text-2xl font-bold tracking-tight text-zinc-50 border-b border-zinc-900 pb-3">
								Top Billed Cast
							</h2>

							{cast.length === 0 ? (
								<p className="text-zinc-500 text-sm">Cast list not available.</p>
							) : (
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
									{cast.map((member) => (
										<Card
											key={member.id}
											className="bg-zinc-900/40 border-zinc-900 overflow-hidden flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-900/60 transition-colors"
										>
											<div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
												{member.profile_path ? (
													<img
														src={`${TMDB_CAST_BASE}${member.profile_path}`}
														alt={member.name}
														loading="lazy"
														className="h-full w-full object-cover"
													/>
												) : (
													<div className="h-full w-full flex items-center justify-center text-zinc-700 bg-zinc-950 font-bold text-[10px]">
														{member.name
															.split(" ")
															.map((n) => n[0])
															.slice(0, 2)
															.join("")}
													</div>
												)}
											</div>
											<div className="min-w-0">
												<p className="text-xs font-bold text-zinc-100 truncate">{member.name}</p>
												<p className="text-[10px] text-zinc-400 truncate">{member.character}</p>
											</div>
										</Card>
									))}
								</div>
							)}
						</div>

						{/* Video Section */}
						{trailer && (
							<div ref={trailerRef} className="space-y-6 scroll-mt-20">
								<h2 className="text-2xl font-bold tracking-tight text-zinc-50 border-b border-zinc-900 pb-3">
									Videos & Trailers
								</h2>
								<div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-2xl relative">
									<iframe
										src={`https://www.youtube.com/embed/${trailer.key}`}
										title={trailer.name || "Movie Trailer"}
										className="absolute inset-0 w-full h-full border-0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										loading="lazy"
									/>
								</div>
							</div>
						)}
					</div>

					{/* Sidebar Facts */}
					<div className="space-y-6">
						<Card className="bg-zinc-900/40 border-zinc-900/80 rounded-2xl overflow-hidden p-6 shadow-sm sticky top-24">
							<h3 className="font-bold text-lg text-zinc-100 mb-6 border-b border-zinc-800 pb-3">
								Movie Facts
							</h3>

							<dl className="space-y-5 text-sm">
								<div className="flex flex-col gap-1">
									<dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
										Original Title
									</dt>
									<dd className="text-zinc-200 font-bold">{movie.title}</dd>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="flex flex-col gap-1">
										<dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
											Release Year
										</dt>
										<dd className="text-zinc-200 font-bold">{releaseYear}</dd>
									</div>
									<div className="flex flex-col gap-1">
										<dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
											Status
										</dt>
										<dd className="text-zinc-200 font-bold capitalize">
											{movie.status || "Released"}
										</dd>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="flex flex-col gap-1">
										<dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
											Runtime
										</dt>
										<dd className="text-zinc-200 font-bold">{formatRuntime(movie.runtime)}</dd>
									</div>
									<div className="flex flex-col gap-1">
										<dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
											Average Rating
										</dt>
										<dd className="text-zinc-200 font-bold flex items-center gap-1">
											<svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 20 20">
												<title>Star Icon</title>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
											{rating} ({movie.vote_count || 0} votes)
										</dd>
									</div>
								</div>

								<div className="flex flex-col gap-1 border-t border-zinc-800 pt-4">
									<dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
										Budget
									</dt>
									<dd className="text-zinc-200 font-bold text-base">
										{formatCurrency(movie.budget)}
									</dd>
								</div>

								<div className="flex flex-col gap-1">
									<dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
										Revenue
									</dt>
									<dd className="text-zinc-200 font-bold text-base">
										{formatCurrency(movie.revenue)}
									</dd>
								</div>

								{movie.homepage && (
									<div className="pt-2">
										<Button
											asChild
											variant="secondary"
											className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl h-10 gap-1.5"
										>
											<a href={movie.homepage} target="_blank" rel="noopener noreferrer">
												<svg
													className="w-3.5 h-3.5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={2}
												>
													<title>External Link Icon</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
													/>
												</svg>
												Visit Official Website
											</a>
										</Button>
									</div>
								)}
							</dl>
						</Card>
					</div>
				</div>
			</section>

			{/* Recommendations Section */}
			{recommendations.length > 0 && (
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-left border-t border-zinc-900 pt-16">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-2">
								More Like This
							</h2>
							<h3 className="text-2xl font-bold tracking-tight text-zinc-50">Recommended Movies</h3>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
						{recommendations.map((recMovie) => (
							<MovieCard key={recMovie.id} movie={recMovie} />
						))}
					</div>
				</section>
			)}
		</>
	);
};

export default MovieDetail;
