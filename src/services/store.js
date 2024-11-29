// Import `configureStore` from Redux Toolkit to set up the global store
import { configureStore } from "@reduxjs/toolkit";

// Import the API service created with Redux Toolkit Query
import { articleApi } from "./article";

// Configure the Redux store
export const store = configureStore({
  // Define the reducers (state management logic)
  reducer: {
    // Dynamically add the reducer from the `articleApi`
    [articleApi.reducerPath]: articleApi.reducer, 
    // `articleApi.reducerPath` is a unique string (e.g., `articleApi`) used as a key in the global state
    // `articleApi.reducer` handles the state and logic for this API
  },

  // Add middleware to the store
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware() // Start with Redux Toolkit's default middleware
      .concat(articleApi.middleware), 
      // Add `articleApi.middleware` for caching, invalidation, and other features of RTK Query
});
