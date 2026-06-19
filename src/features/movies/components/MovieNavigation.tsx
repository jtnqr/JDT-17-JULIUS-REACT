import { Link, useLocation } from "react-router";

export default function MovieNavigation() {
	const location = useLocation();
	const paths = [
		{ name: "Now Playing", to: "/movies" },
		{ name: "Top Rated", to: "/movies/top-rated" },
		{ name: "Upcoming", to: "/movies/upcoming" },
		{ name: "Search", to: "/movies/search" },
	];

	return (
		<nav
			aria-label="Movies category navigation"
			className="flex border-b border-zinc-900 mb-8 gap-6 overflow-x-auto pb-1"
		>
			{paths.map((path) => {
				const isActive = location.pathname === path.to;
				return (
					<Link
						key={path.to}
						to={path.to}
						className={`pb-3 text-sm font-bold transition-all shrink-0 border-b-2 ${
							isActive
								? "border-amber-500 text-amber-500"
								: "border-transparent text-zinc-400 hover:text-zinc-100"
						}`}
					>
						{path.name}
					</Link>
				);
			})}
		</nav>
	);
}
