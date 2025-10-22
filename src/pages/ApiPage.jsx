import React, { useState } from "react";

const ApiPage = () => {
  const [query, setQuery] = useState("");      // for user input
  const [results, setResults] = useState([]);  // for fetched words
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // pagination state
  const itemsPerPage = 10; // show 10 results per page

  const fetchWords = async (word) => {
    if (!word) return;
    setLoading(true);
    setError(null);
    setResults([]);
    setCurrentPage(1);

    try {
      const res = await fetch(`https://api.datamuse.com/words?ml=${word}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWords(query);
  };

  // Pagination logic
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = results.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
              <h2 className="text-2xl font-bold mb-4 text-center mx-8">API Data</h2>

    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col items-center py-12 px-6">

      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-3 tracking-tight">
        My Word Finder
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Search for words with similar meanings, rhymes, or associations.
      </p>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-3 bg-white shadow-md rounded-2xl px-6 py-4 w-full max-w-md border border-gray-200"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a word (e.g., happy)"
          className="flex-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg px-4 py-2 outline-none text-gray-800"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white font-semibold px-5 py-2 rounded-lg shadow-sm"
        >
          Search
        </button>
      </form>

      {/* Status Messages */}
      {loading && (
        <p className="text-gray-500 mt-6 animate-pulse">Fetching results...</p>
      )}
      {error && <p className="text-red-500 mt-6">{error}</p>}

      {/* Results Grid */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-5xl">
        {currentResults.length > 0 ? (
          currentResults.map((word, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 hover:border-indigo-300 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition duration-200"
            >
              <p className="text-indigo-700 font-medium capitalize">
                {word.word}
              </p>
            </div>
          ))
        ) : (
          !loading &&
          !error && (
            <p className="col-span-full text-gray-500 text-center italic">
              No results yet. Try searching for a word!
            </p>
          )
        )}
      </div>

      {/* Pagination Controls */}
      {results.length > 0 && (
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
    </>
  );
};

export default ApiPage;
