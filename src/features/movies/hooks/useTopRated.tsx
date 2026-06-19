import { useEffect, useState } from "react";
import { getTopRatedMovies } from "../api";
import type { Movie } from "../type";

const useTopRated = (initialPage = 1) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(initialPage);

	useEffect(() => {
		let isMounted = true;

		const fetchTopRated = async () => {
			try {
				setIsLoading(true);
				const response = await getTopRatedMovies(page);
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

		fetchTopRated();

		return () => {
			isMounted = false;
		};
	}, [page]);

	return { movies, isLoading, error, page, setPage };
};

export default useTopRated;
