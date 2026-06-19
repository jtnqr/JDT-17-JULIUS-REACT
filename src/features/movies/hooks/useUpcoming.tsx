import { useEffect, useState } from "react";
import { getUpcomingMovies } from "../api";
import type { Movie } from "../type";

const useUpcoming = (initialPage = 1) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(initialPage);

	useEffect(() => {
		let isMounted = true;

		const fetchUpcoming = async () => {
			try {
				setIsLoading(true);
				const response = await getUpcomingMovies(page);
				if (isMounted) {
					setMovies(response.data.results || []);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					const errorMessage = err instanceof Error ? err.message : "Failed to fetch movies";
					setError(errorMessage);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchUpcoming();

		return () => {
			isMounted = false;
		};
	}, [page]);

	return { movies, isLoading, error, page, setPage };
};

export default useUpcoming;
