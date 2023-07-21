/*specific part of our state
endpoints: what you want to call
headers: contain special API keys to make requests
useLazyGetSummaryQuery: allows to fire hook on demand, not as app loads*/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const rapidApiKey = import.meta.env.VITE_ARTICLE_KEY_RAPID_API;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
     baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
     prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host',
            'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
     },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    }),
});

export const { useLazyGetSummaryQuery } = articleApi
