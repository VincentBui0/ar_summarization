// Import the React library to use its components and features
import React from "react";
// Import ReactDOM to render React components to the DOM
import ReactDOM from "react-dom/client";
// Import the `Provider` component from React Redux to connect the store to the app
import { Provider } from "react-redux";

// Import the main application component
import App from "./App";
// Import the Redux store configured in the `services/store` file
import { store } from "./services/store";

// Render the application to the DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  // Enable Strict Mode to catch potential issues in development
  <React.StrictMode>
    {/* Wrap the app with the Redux Provider to make the store accessible */}
    <Provider store={store}>
      {/* The main application component */}
      <App />
    </Provider>
  </React.StrictMode>
);
