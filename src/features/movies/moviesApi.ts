import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, BASE_URL } from "../../constant";
import type {
	MovieCreditsResponse,
	MovieDetails,
	MovieResponse,
	MovieReviewsResponse,
	MovieVideosResponse,
} from "./type";

export const moviesApi = createApi({
	reducerPath: "moviesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			headers.set("Authorization", `Bearer ${ACCESS_TOKEN}`);
			headers.set("Accept", "application/json");
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getPopularMovies: builder.query<MovieResponse, number>({
			query: (page = 1) => `movie/popular?page=${page}`,
		}),
		getNowPlayingMovies: builder.query<MovieResponse, number>({
			query: (page = 1) => `movie/now_playing?page=${page}`,
		}),
		getTopRatedMovies: builder.query<MovieResponse, number>({
			query: (page = 1) => `movie/top_rated?page=${page}`,
		}),
		getUpcomingMovies: builder.query<MovieResponse, number>({
			query: (page = 1) => `movie/upcoming?page=${page}`,
		}),
		searchMovies: builder.query<MovieResponse, { query: string; page?: number }>({
			query: ({ query, page = 1 }) =>
				`search/movie?query=${encodeURIComponent(query)}&page=${page}`,
		}),
		getMovieDetails: builder.query<MovieDetails, string | number>({
			query: (id) => `movie/${id}`,
		}),
		getMovieCredits: builder.query<MovieCreditsResponse, string | number>({
			query: (id) => `movie/${id}/credits`,
		}),
		getMovieVideos: builder.query<MovieVideosResponse, string | number>({
			query: (id) => `movie/${id}/videos`,
		}),
		getMovieReviews: builder.query<MovieReviewsResponse, { id: string | number; page?: number }>({
			query: ({ id, page = 1 }) => `movie/${id}/reviews?page=${page}`,
		}),
		getSimilarMovies: builder.query<MovieResponse, { id: string | number; page?: number }>({
			query: ({ id, page = 1 }) => `movie/${id}/similar?page=${page}`,
		}),
	}),
});

export const {
	useGetPopularMoviesQuery,
	useLazyGetPopularMoviesQuery,
	useGetNowPlayingMoviesQuery,
	useLazyGetNowPlayingMoviesQuery,
	useGetTopRatedMoviesQuery,
	useLazyGetTopRatedMoviesQuery,
	useGetUpcomingMoviesQuery,
	useLazyGetUpcomingMoviesQuery,
	useSearchMoviesQuery,
	useLazySearchMoviesQuery,
	useGetMovieDetailsQuery,
	useLazyGetMovieDetailsQuery,
	useGetMovieCreditsQuery,
	useLazyGetMovieCreditsQuery,
	useGetMovieVideosQuery,
	useLazyGetMovieVideosQuery,
	useGetMovieReviewsQuery,
	useLazyGetMovieReviewsQuery,
	useGetSimilarMoviesQuery,
	useLazyGetSimilarMoviesQuery,
} = moviesApi;
