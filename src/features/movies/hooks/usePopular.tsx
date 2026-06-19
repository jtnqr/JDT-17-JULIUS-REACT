import { useEffect, useState } from "react";
import { getPopularMovies } from "../api";
import type { Movie } from "../type";

const usePopular = (initialPage = 1) => {
	const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(initialPage);

	useEffect(() => {
		let isMounted = true;

		const fetchPopularMovies = async () => {
			try {
				setIsLoading(true);
				const response = await getPopularMovies(page);
				if (isMounted) {
					setPopularMovies(response.data.results || []);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					const errorMessage =
						err instanceof Error ? err.message : "Failed to fetch popular movies";
					setError(errorMessage);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchPopularMovies();

		return () => {
			isMounted = false;
		};
	}, [page]);

	return { popularMovies, isLoading, error, page, setPage };
};

export default usePopular;
