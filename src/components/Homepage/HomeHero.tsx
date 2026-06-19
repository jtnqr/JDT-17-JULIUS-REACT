import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const HomeHero = () => (
	<section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
		{/* Glowing background accent */}
		<div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 w-150 h-87.5 bg-linear-to-tr from-amber-500/15 to-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

		<div className="max-w-3xl mx-auto text-center relative z-10">
			<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-wider uppercase mb-8 animate-pulse">
				<span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
				Powered by TMDB
			</div>

			<h1 className="text-5xl sm:text-6xl lg:text-7.5xl font-black tracking-tight text-zinc-50 leading-[1.08] mb-6">
				Discover{" "}
				<span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
					every film
				</span>
				<br className="hidden sm:inline" />
				worth watching.
			</h1>

			<p className="max-w-2xl mx-auto mt-6 text-zinc-400 text-base sm:text-lg leading-relaxed">
				Explore now playing, top rated, and upcoming movies. Browse details, trailers, and reviews
				in a clean, lightning-fast cinematic interface.
			</p>

			<div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
				<Button
					asChild
					size="lg"
					className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-6 rounded-xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02]"
				>
					<Link to="/movies">Browse Now Playing</Link>
				</Button>

				<Button
					asChild
					size="lg"
					variant="outline"
					className="border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/60 text-zinc-300 hover:text-zinc-50 font-semibold px-8 py-6 rounded-xl transition-all duration-300"
				>
					<a href="#features" aria-label="Learn about PilemHub features">
						About PilemHub
					</a>
				</Button>
			</div>
		</div>
	</section>
);

export default HomeHero;
