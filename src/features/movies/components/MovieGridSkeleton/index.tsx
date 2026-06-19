const SKELETON_KEYS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const MovieGridSkeleton = () => (
	<div
		role="status"
		className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
		aria-busy="true"
		aria-label="Loading movies"
	>
		<div className="animate-pulse flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
			<div>
				<div className="h-9 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
				<div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded mt-3" />
			</div>
			<div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
		</div>
		<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
			{SKELETON_KEYS.map((key) => (
				<div
					key={key}
					className="animate-pulse flex flex-col rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm"
				>
					<div className="aspect-2/3 w-full bg-gray-200 dark:bg-gray-800" />
					<div className="p-4 flex-1 space-y-3">
						<div className="flex justify-between gap-2">
							<div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
							<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/6" />
						</div>
						<div className="space-y-2">
							<div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full" />
							<div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default MovieGridSkeleton;
