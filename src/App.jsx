import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegComment, FaRegHeart, FaSearch } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";


function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const newsPerPage = 6; 

 
  const getNews = async () => {
    setError(null);
    try {
      const fashionResponse = await axios.get(
        `https://newsapi.org/v2/everything?q=fashion&language=en&apiKey=5d509fe0625e4d4fa0ba1e74c436cf80`
      );
      const beautyResponse = await axios.get(
        `https://newsapi.org/v2/everything?q=beauty&language=en&apiKey=5d509fe0625e4d4fa0ba1e74c436cf80`
      );

      setNews([...fashionResponse.data.articles, ...beautyResponse.data.articles]);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch news. Please try again later.");
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // Truncate text to a word limit
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Paginate news
  const startIndex = currentPage * newsPerPage;
  const selectedNews = news.slice(startIndex, startIndex + newsPerPage);

  return (
    <div className= "bg-white  min-h-screen relative">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex gap-20 items-center p-6 text-black z-50 ml-5">
        <h1 className="text-xl font-public">My Vlog</h1>
        <nav className="flex space-x-8 font-public items-center"> {/* Added items-center for alignment */}
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">About</a>
          <a href="#" className="hover:underline">Fashion</a>
          <a href="#" className="hover:text-blue-400">Contact</a>

          {/* Search Icon */}
          <FaSearch className="text-lg cursor-pointer font-public text-black hover:text-blue-500" />
        </nav>
        <div className="ml-auto flex items-center gap-4 mr-5">
          <button className="px-2 py-1.5 bg-transparent border border-gray-400 text-sm text-black font-public rounded-md hover:bg-gray-300 transition">Login</button>
          <button className="px-2 py-1.5 bg-[#9bdce3] text-sm text-black font-public rounded-md hover:bg-[#86bec5] transition">Sign Up</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 p-6">
        {/* Hero Section */}
        <div
          className="w-full h-[550px] bg-cover bg-center flex items-center justify-start text-black font-public pl-8"
          style={{ backgroundImage: "url('src/assets/herosection.avif')" }}
        >
          <div className="flex flex-col text-6xl">
            <span>Latest in</span>
            <span className="mt-4">Fashion & Beauty</span>

            {/* Social Media Icons */}
            <div className="flex gap-8 mt-6 text-black text-3xl">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 p-6">
          {/* Text Section on the Left */}
          <div className="lg:w-1/2 text-left mt-52">
            <h2 className="text-4xl font-public mb-4">THE WORLD OF FASHION</h2>
            <p className="text-lg text-gray-700 font-public">
              Fashion is more than just clothing; it’s a form of self-expression, culture, and art. From timeless classics to bold new trends, fashion evolves constantly, influencing how we present ourselves to the world.
            </p>
            <p className="text-lg text-gray-700 mt-4 font-public">
              Whether it’s haute couture on the runway or everyday street style, fashion tells a story. It reflects personality, creativity, and confidence. Stay inspired by the latest trends, embrace your unique style, and make a statement with every outfit.
            </p>

          </div>

          {/* Image Section on the Right */}
          <div className="lg:w-1/2">
            <img src="src/assets/image1.avif" alt="Description of image" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>

        {/* blog Section */}
        <div className="container mx-auto p-2">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedNews.map((article, index) => (
              <div key={index} className="w-full h-[400px] border border-gray-400 overflow-hidden flex flex-col">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/400"}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">

                  {/* Author Info with Profile Image */}
                  <div className="flex items-center gap-2 mt-3">
                    <img
                      src={`https://i.pravatar.cc/40?u=${article.author || "unknown"}`}
                      alt="Author Profile"
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                    <div>
                      <p className="text-xs italic">By {article.author || "Unknown"}</p>
                      <p className="text-xs text-gray-500">{new Date(article.publishedAt).toDateString()}</p>
                    </div>
                  </div>

                  {/* blog Title */}
                  <h5 className="text-lg font-public mt-2 text-gray-800">{truncateText(article.title, 7)}</h5>

                  {/* Horizontal Line */}
                  <hr className="border-t border-gray-300 my-2" />

                  {/* Icons Section */}
                  <div className="flex justify-between items-center mt-2 text-gray-600">
                    <div className="flex items-center gap-3">
                      <IoEyeOutline className="text-xl cursor-pointer text-gray-500 hover:text-blue-500" />
                      <div className="flex items-center gap-1">
                        <FaRegComment className="text-lg cursor-pointer hover:text-blue-500" />
                        <span className="text-sm">Comment</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRegHeart className="text-lg cursor-pointer text-gray-500 hover:text-red-500" />
                      <span className="text-sm">Like</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-32 mx-auto rounded-lg border border-gray-400 text-black px-4 py-2 transition text-center hover:bg-gray-100"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-md border border-gray-400 ${currentPage === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-transparent hover:bg-gray-200"
                }`}
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentPage((prev) => (startIndex + newsPerPage < news.length ? prev + 1 : prev))}
              disabled={startIndex + newsPerPage >= news.length}
              className={`px-4 py-2 rounded-md bg-[#9bdce3] hover:bg-[#8fcbd2] border border-gray-400 ${startIndex + newsPerPage >= news.length ? "bg-gray-300 cursor-not-allowed" : "bg-transparent hover:bg-gray-200"
                }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="text-center mt-12 p-6">
          <h2 className="text-4xl font-public mb-4 text-gray-800">
            Let me know what's on your mind
          </h2>

          <form className="space-y-4">
            <div className="flex gap-12 justify-center">
              {/* First Name */}
              <input
                type="text"
                placeholder="First Name"
                className="w-1/3 p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500"
              />

              {/* Last Name */}
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/3 p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-2/3 p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-2/4 p-2 bg-transparent text-black font-public border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition"
            >
              Submit
            </button>
          </form>
        </div>



      </div>

      {/* Footer */}
      <footer className="bg-[#9bdce3] text-black text-center py-8 mt-8">
        {/* Footer Content Container */}
        <div className="container mx-auto px-6 lg:px-12">

          {/* Logo and Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Fashion & Beauty News</h2>
            <p className="text-sm mt-2">
              Stay updated with the latest fashion trends, beauty tips, and style inspiration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium mb-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Fashion</a>
           
            <a href="#" className="hover:underline">Contact</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 text-xl mb-6">
            <a href="#" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-red-500"><FaYoutube /></a>
          </div>

          {/* Newsletter Subscription */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
            <form className="flex justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-400 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Copyright */}
          <p className="text-sm mt-4">
            &copy; {new Date().getFullYear()} Fashion & Beauty News. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
export default App;