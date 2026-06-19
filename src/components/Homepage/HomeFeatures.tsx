import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface Feature {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
}

const FEATURES: Feature[] = [
	{
		id: "realtime",
		title: "Real-time TMDB",
		description:
			"Directly integrated with the official TMDB API. Get instant access to now playing, popular, top rated, and upcoming movies.",
		icon: (
			<svg
				className="w-6 h-6 text-amber-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
				aria-hidden="true"
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
			</svg>
		),
	},
	{
		id: "ui",
		title: "Premium Design",
		description:
			"Experience a cinematic layout with glassmorphic elements, smooth gradients, hover micro-animations, and full dark-mode optimization.",
		icon: (
			<svg
				className="w-6 h-6 text-amber-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
				/>
			</svg>
		),
	},
	{
		id: "client",
		title: "Centralized Client",
		description:
			"Built on a robust, interceptor-driven Axios architecture ensuring secure request signing, error handling, and type safety.",
		icon: (
			<svg
				className="w-6 h-6 text-amber-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
				/>
			</svg>
		),
	},
];

const HomeFeatures = () => (
	<section
		id="features"
		aria-labelledby="features-heading"
		className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28"
	>
		<div className="border-t border-zinc-800/80 pt-16">
			<div className="text-center md:text-left mb-12">
				<h2
					id="features-heading"
					className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-3"
				>
					Why PilemHub?
				</h2>
				<h3 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
					Engineered for movie enthusiasts
				</h3>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{FEATURES.map((feature) => (
					<Card
						key={feature.id}
						className="relative group bg-zinc-900/30 border-zinc-850 hover:border-amber-500/25 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/2"
					>
						<div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							{feature.icon}
						</div>
						<CardTitle className="font-semibold text-zinc-50 text-lg mb-3">
							{feature.title}
						</CardTitle>
						<CardDescription className="text-sm text-zinc-400 leading-relaxed">
							{feature.description}
						</CardDescription>
					</Card>
				))}
			</div>
		</div>
	</section>
);

export default HomeFeatures;
