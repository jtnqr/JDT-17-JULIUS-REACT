import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import MovieCard from "../../features/movies/components/MovieCard";
import usePopular from "../../features/movies/hooks/usePopular";

const HomeTrending = () => {
	const { popularMovies, isLoading, error } = usePopular();

	if (error) {
		return null; // Fallback silently on error for home page cleanliness
	}

	const displayMovies = popularMovies.slice(0, 4);

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
			<div className="border-t border-zinc-800/80 pt-16">
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
					<div>
						<h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-3 text-left">
							Trending Spotlight
						</h2>
						<h3 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
							Most popular right now
						</h3>
					</div>
					<Button
						asChild
						variant="ghost"
						className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 self-start sm:self-auto group gap-1"
					>
						<Link to="/movies">
							Explore all movies
							<svg
								className="w-4 h-4 transition-transform group-hover:translate-x-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<title>Arrow Right</title>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</Button>
				</div>

				{isLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{[1, 2, 3, 4].map((key) => (
							<div
								key={key}
								className="animate-pulse flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden"
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
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{displayMovies.map((movie) => (
							<div
								key={movie.id}
								className="relative group rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
							>
								<MovieCard movie={movie} />
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default HomeTrending;
