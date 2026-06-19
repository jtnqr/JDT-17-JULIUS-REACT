import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	// TMDB API limits pagination results to a maximum of 500 pages.
	const maxPages = Math.min(totalPages, 500);

	if (maxPages <= 1) return null;

	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const boundaryCount = 1; // Pages to show at the start/end
		const siblingCount = 1; // Pages around the current page

		const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
		const endPages = Array.from(
			{ length: boundaryCount },
			(_, i) => maxPages - boundaryCount + i + 1,
		);

		const siblingStart = Math.max(
			Math.min(currentPage - siblingCount, maxPages - boundaryCount - siblingCount * 2 - 1),
			boundaryCount + 2,
		);
		const siblingEnd = Math.min(
			Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
			maxPages - boundaryCount - 1,
		);

		pages.push(...startPages);

		if (siblingStart > boundaryCount + 2) {
			pages.push("ellipsis-1");
		} else if (boundaryCount + 1 < maxPages - boundaryCount) {
			pages.push(boundaryCount + 1);
		}

		const middlePages = [];
		for (let i = siblingStart; i <= siblingEnd; i++) {
			if (i > boundaryCount && i < maxPages - boundaryCount + 1) {
				middlePages.push(i);
			}
		}
		pages.push(...middlePages);

		if (siblingEnd < maxPages - boundaryCount - 1) {
			pages.push("ellipsis-2");
		} else if (maxPages - boundaryCount > boundaryCount + 1) {
			if (!pages.includes(maxPages - boundaryCount)) {
				pages.push(maxPages - boundaryCount);
			}
		}

		for (const page of endPages) {
			if (!pages.includes(page) && page > 0) {
				pages.push(page);
			}
		}

		return pages;
	};

	const pages = getPageNumbers();

	return (
		<nav
			aria-label="Pagination Navigation"
			className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 border-t border-zinc-900 pt-6 px-2"
		>
			<div className="text-sm text-zinc-500 font-medium">
				Page <span className="text-zinc-300 font-semibold">{currentPage}</span> of{" "}
				<span className="text-zinc-300 font-semibold">{maxPages}</span>
			</div>

			<div className="flex items-center gap-1.5">
				{/* Previous Page Button */}
				<button
					type="button"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="flex items-center gap-1 px-3 py-2 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-50 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-hidden disabled:opacity-40 disabled:hover:bg-zinc-900/60 disabled:hover:text-zinc-300 disabled:hover:border-zinc-800 disabled:cursor-not-allowed cursor-pointer"
					aria-label="Go to previous page"
				>
					<ChevronLeft className="h-4 w-4" />
					<span className="hidden sm:inline">Prev</span>
				</button>

				{/* Page Numbers */}
				<div className="flex items-center gap-1">
					{pages.map((page, index) => {
						if (typeof page === "string") {
							return (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: static layout structure
									key={`ellipsis-${index}`}
									className="px-2.5 py-1.5 text-zinc-600 font-bold select-none text-sm"
								>
									...
								</span>
							);
						}

						const isActive = page === currentPage;

						return (
							<button
								type="button"
								key={page}
								onClick={() => onPageChange(page)}
								aria-current={isActive ? "page" : undefined}
								aria-label={`Go to page ${page}`}
								className={`min-w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-hidden cursor-pointer ${
									isActive
										? "bg-amber-500 text-zinc-950 border border-amber-500 shadow-md shadow-amber-500/10 hover:bg-amber-400"
										: "bg-zinc-900/40 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-zinc-700/80 text-zinc-400 hover:text-zinc-200"
								}`}
							>
								{page}
							</button>
						);
					})}
				</div>

				{/* Next Page Button */}
				<button
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === maxPages}
					className="flex items-center gap-1 px-3 py-2 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-50 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-hidden disabled:opacity-40 disabled:hover:bg-zinc-900/60 disabled:hover:text-zinc-300 disabled:hover:border-zinc-800 disabled:cursor-not-allowed cursor-pointer"
					aria-label="Go to next page"
				>
					<span className="hidden sm:inline">Next</span>
					<ChevronRight className="h-4 w-4" />
				</button>
			</div>
		</nav>
	);
}
