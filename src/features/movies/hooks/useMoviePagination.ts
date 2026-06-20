import { useSearchParams } from "react-router";

export function useMoviePagination() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;

	const setPage = (newPage: number) => {
		const newParams = new URLSearchParams(searchParams);
		if (newPage === 1) {
			newParams.delete("page");
		} else {
			newParams.set("page", String(newPage));
		}
		setSearchParams(newParams);
	};

	return [page, setPage] as const;
}
