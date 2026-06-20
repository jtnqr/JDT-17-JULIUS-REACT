import { useLocation } from "react-router";
import { Badge } from "@/components/ui/badge";

interface MoviePageHeaderProps {
	title: string;
	subtitle?: string;
	movieCount?: number;
	isLoading?: boolean;
	isFetching?: boolean;
	children?: React.ReactNode;
}

export default function MoviePageHeader({
	title,
	subtitle = "Movie Directory",
	movieCount,
	isLoading,
	isFetching,
	children,
}: MoviePageHeaderProps) {
	const location = useLocation();
	const isSearchPage = location.pathname === "/movies/search";

	return (
		<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-900 pb-6">
			<div>
				<h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-3">
					{subtitle}
				</h2>
				<h3 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">{title}</h3>
			</div>

			{(children || (isSearchPage && movieCount !== undefined)) && (
				<div className="flex items-center gap-4 w-full md:w-auto shrink-0">
					{children}

					{isSearchPage && movieCount !== undefined && (
						<Badge
							variant="secondary"
							className="px-3 py-1 h-7 rounded-full text-sm font-semibold border-zinc-800 text-amber-400 bg-amber-500/10 shrink-0"
						>
							{isLoading || isFetching ? "Loading..." : `${movieCount} Matches`}
						</Badge>
					)}
				</div>
			)}
		</div>
	);
}
