import { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../api";
import type { Movie } from "../type";

const useNowPlaying = (initialPage = 1) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(initialPage);

	useEffect(() => {
		let isMounted = true;

		const fetchNowPlaying = async () => {
			try {
				setIsLoading(true);
				const response = await getNowPlayingMovies(page);
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

		fetchNowPlaying();

		return () => {
			isMounted = false;
		};
	}, [page]);

	return { movies, isLoading, error, page, setPage };
};

export default useNowPlaying;
