// Import necessary functions from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Retrieve the RapidAPI key from environment variables
const rapidApiKey = import.meta.env.VITE_ARTICLE_KEY_RAPID_API; 
// `import.meta.env` is used in Vite projects to access environment variables

// Create an API service using Redux Toolkit Query
export const articleApi = createApi({
  // The name of the slice of state managed by this API
  reducerPath: 'articleApi', 

  // Define the base query configuration for API requests
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/', 
    // The base URL for all API calls

    // Function to prepare headers for each request
    prepareHeaders: (headers) => {
      // Add the RapidAPI key to the request headers
      headers.set('X-RapidAPI-Key', rapidApiKey);

      // Add the RapidAPI host to the request headers
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

      return headers; // Return the updated headers
    },
  }),

  // Define the API endpoints
  endpoints: (builder) => ({
    // Endpoint for fetching a summarized article
    getSummary: builder.query({
      // The function to construct the query string
      query: (params) => 
        `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`, 
        // `params.articleUrl` contains the URL of the article to summarize
        // `length=3` specifies the desired length of the summary
    }),
  }),
});

// Export the hook to use the `getSummary` endpoint on demand
export const { useLazyGetSummaryQuery } = articleApi; 
// `useLazyGetSummaryQuery` allows you to call the `getSummary` endpoint when needed, not automatically on component load
