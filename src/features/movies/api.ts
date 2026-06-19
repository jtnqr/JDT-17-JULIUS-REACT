import axiosClient from "../../service/api";
import type {
	MovieCreditsResponse,
	MovieDetails,
	MovieResponse,
	MovieReviewsResponse,
	MovieVideosResponse,
} from "./type";

export const getPopularMovies = (page: number = 1) => {
	return axiosClient.get<MovieResponse>(`/movie/popular?page=${page}`);
};

export const getNowPlayingMovies = (page: number = 1) => {
	return axiosClient.get<MovieResponse>(`/movie/now_playing?page=${page}`);
};

export const getTopRatedMovies = (page: number = 1) => {
	return axiosClient.get<MovieResponse>(`/movie/top_rated?page=${page}`);
};

export const getUpcomingMovies = (page: number = 1) => {
	return axiosClient.get<MovieResponse>(`/movie/upcoming?page=${page}`);
};

export const getMovieDetails = (id: string | number) => {
	return axiosClient.get<MovieDetails>(`/movie/${id}`);
};

export const searchMovies = (query: string, page: number = 1) => {
	return axiosClient.get<MovieResponse>(
		`/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
	);
};

export const getMovieCredits = (id: string | number) => {
	return axiosClient.get<MovieCreditsResponse>(`/movie/${id}/credits`);
};

export const getMovieVideos = (id: string | number) => {
	return axiosClient.get<MovieVideosResponse>(`/movie/${id}/videos`);
};

export const getMovieReviews = (id: string | number, page: number = 1) => {
	return axiosClient.get<MovieReviewsResponse>(`/movie/${id}/reviews?page=${page}`);
};

export const getSimilarMovies = (id: string | number, page: number = 1) => {
	return axiosClient.get<MovieResponse>(`/movie/${id}/similar?page=${page}`);
};

export const getMovieRecommendations = (id: string | number, page: number = 1) => {
	return axiosClient.get<MovieResponse>(`/movie/${id}/recommendations?page=${page}`);
};
