// Import necessary React hooks and dependencies
import { useState, useEffect } from 'react'; // useState for state management, useEffect for lifecycle methods
import { copy, linkIcon, loader, tick } from '../assets'; // Importing assets like icons
import { useLazyGetSummaryQuery } from '../services/article'; // API hook for lazy loading the article summary

// Functional component "Demo"
const Demo = () => {
  // State variables
  const [article, setArticle] = useState({
    url: '',       // Stores the URL entered by the user
    summary: '',   // Stores the fetched summary of the article
  });
  const [allArticles, setAllArticles] = useState([]); // List of all fetched articles (including history)
  const [copied, setCopied] = useState(""); // Tracks the URL that was recently copied to the clipboard

  // useLazyGetSummaryQuery provides a function to fetch summaries and status of the request
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // useEffect runs once when the component mounts (empty dependency array [])
  useEffect(() => {
    // Retrieve stored articles from localStorage
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage); // Populate state with stored articles
    }
  }, []);

  // Handle form submission for fetching the article summary
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    // Fetch summary from the API
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      // Update state with the new article and its summary
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles]; // Add the new article to the history

      setArticle(newArticle); // Update current article state
      setAllArticles(updatedAllArticles); // Update articles history

      // Save updated history to localStorage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  // Handle copying a URL to the clipboard
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl); // Set the currently copied URL
    navigator.clipboard.writeText(copyUrl); // Copy the URL to the clipboard
    setTimeout(() => setCopied(false), 3000); // Reset the copied state after 3 seconds
  };

  return (
    <section className="mt-16 w-full max-w-x1">
      {/* Search section */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit} // Form submission handler
        >
          {/* Icon for URL input */}
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          {/* Submit button */}
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            Submit
          </button>

          {/* URL input field */}
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url} // Controlled input bound to `article.url`
            onChange={(e) => setArticle({ ...article, url: e.target.value })} // Update state on input change
            required
            className="url_input peer"
          />
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`} // Unique key for each article
              onClick={() => setArticle(item)} // Set current article when clicked
              className="link_card"
            >
              {/* Copy button */}
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy} // Display "tick" icon if URL is copied
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              {/* Truncated URL display */}
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? ( // Show loader while fetching data
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? ( // Show error message if API request fails
          <p className="font-inter font-bold text-red-600 text-center">
            Looks like we got a problem...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && ( // Display article summary if available
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-g">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
