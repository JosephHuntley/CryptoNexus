import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders: {
	'X-BingApis-SDK': string;
	'X-RapidAPI-Key': string;
	'X-RapidAPI-Host': string;
} = {
	'X-BingApis-SDK': 'true',
	'X-RapidAPI-Key': 'a97a0492f8msh8d26711a9a853e4p187839jsn61d62bae71f5',
	'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
};

const baseUrl: string = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		getCryptoNews: builder.query({
			query: ({
				newsCategory,
				count,
			}: {
				newsCategory: string;
				count: number;
			}) =>
				createRequest(
					`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
				),
		}),
	}),
});

export const { useGetCryptoNewsQuery }: any = cryptoNewsApi;
