export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path?: string;
	release_date?: string;
	vote_average?: number;
}

export interface MovieResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface Genre {
	id: number;
	name: string;
}

export interface MovieDetails extends Movie {
	backdrop_path?: string;
	genres: Genre[];
	homepage?: string;
	imdb_id?: string;
	runtime?: number;
	tagline?: string;
	budget?: number;
	revenue?: number;
	status?: string;
	vote_count?: number;
}

export interface CastMember {
	id: number;
	name: string;
	character: string;
	profile_path?: string;
	order: number;
}

export interface CrewMember {
	id: number;
	name: string;
	job: string;
	department: string;
	profile_path?: string;
}

export interface MovieCreditsResponse {
	id: number;
	cast: CastMember[];
	crew: CrewMember[];
}

export interface MovieVideo {
	id: string;
	key: string;
	name: string;
	site: string;
	type: string;
	official: boolean;
}

export interface MovieVideosResponse {
	id: number;
	results: MovieVideo[];
}

export interface MovieReview {
	id: string;
	author: string;
	content: string;
	created_at: string;
	url: string;
}

export interface MovieReviewsResponse {
	id: number;
	page: number;
	results: MovieReview[];
	total_pages: number;
	total_results: number;
}
