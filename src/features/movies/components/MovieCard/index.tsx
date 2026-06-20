import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Movie } from "../../type";

interface MovieCardProps {
	movie: Movie;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const truncateText = (text: string, limit: number) => {
	if (!text) return "";
	if (text.length <= limit) return text;
	return `${text.substring(0, limit).trim()}...`;
};

const MovieCard = ({ movie }: MovieCardProps) => {
	const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
	const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
	const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null;

	const [characterLimit, setCharacterLimit] = useState(120);

	useEffect(() => {
		const handleResize = () => {
			setCharacterLimit(window.innerWidth < 640 ? 60 : 120);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Link to={`/movies/${movie.id}`} className="block w-full h-full">
			<Card className="group relative flex flex-col overflow-hidden bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-amber-500/25 shadow-sm hover:shadow-xl hover:shadow-amber-500/2 hover:-translate-y-0.5 transition-all duration-300 rounded-2xl w-full h-full">
				{/* Poster Container */}
				<div className="aspect-2/3 w-full overflow-hidden bg-zinc-950 relative">
					{posterUrl ? (
						<img
							src={posterUrl}
							alt={movie.title}
							loading="lazy"
							className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
						/>
					) : (
						<div className="flex h-full w-full flex-col items-center justify-center p-4 bg-linear-to-br from-amber-500/5 to-orange-600/5 text-zinc-650">
							<svg
								className="w-12 h-12 mb-2 opacity-30"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<title>No poster available</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
								/>
							</svg>
							<span className="text-xs text-center font-medium px-2 text-zinc-500">
								{movie.title}
							</span>
						</div>
					)}

					{/* Rating badge using shadcn Badge */}
					{movie.vote_average !== undefined && movie.vote_average > 0 ? (
						<Badge className="absolute top-3 right-3 h-6 gap-1 bg-black/60 hover:bg-black/60 backdrop-blur-md px-2 text-xs font-bold text-zinc-50 border border-white/10 rounded-lg">
							<svg
								className="w-3.5 h-3.5 text-amber-500 fill-current"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<title>Rating</title>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<span>{rating}</span>
						</Badge>
					) : null}
				</div>

				{/* Details Section */}
				<div className="flex flex-1 flex-col p-3 sm:p-4 bg-transparent relative">
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-2 pr-6">
						<h3 className="font-bold text-sm sm:text-base text-zinc-100 line-clamp-1 group-hover:text-amber-400 transition-colors duration-300">
							{movie.title}
						</h3>
						{releaseYear !== null ? (
							<Badge
								variant="outline"
								className="border-zinc-800 text-zinc-500 text-[10px] uppercase font-semibold tracking-wider shrink-0 h-5 px-1.5 rounded w-fit"
							>
								{releaseYear}
							</Badge>
						) : null}
					</div>
					<p className="text-xs text-zinc-400 leading-relaxed pr-6 pb-2">
						{movie.overview
							? truncateText(movie.overview, characterLimit)
							: "No overview available."}
					</p>

					{/* Arrow icon pinned to bottom-right */}
					<div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-zinc-500 group-hover:text-amber-500 transition-colors duration-300">
						<svg
							className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-350"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
							aria-hidden="true"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
						</svg>
					</div>
				</div>
			</Card>
		</Link>
	);
};

export default MovieCard;
