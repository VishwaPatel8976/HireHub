import { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchFilter((prev) => ({ ...prev, query: searchValue }));
    setIsSearched(true);
  };

  const handleSearchSubmit = () => {
    const searchValue = searchRef?.current?.value;
    setSearchFilter((prev) => ({ ...prev, query: searchValue }));
    setIsSearched(true);
  };

  return (
    <div className="container mx-auto mt-20 mb-10">
      <div className="bg-gradient-to-r from-blue-800 to-[#00263C] text-white text-center py-12 mb-5 rounded-xl">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="mb-6 text-lg">
          Discover the best opportunities tailored to your skills and preferences.
        </p>
        <div className="flex justify-center gap-4 items-center">
          <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2">
            <input
              type="text"
              placeholder="Search for jobs, locations, categories..."
              className="w-full outline-none text-gray-700"
              ref={searchRef}
              onChange={handleSearch}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
          </div>
          <button
            onClick={handleSearchSubmit}
            className="bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-lg text-white font-medium"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
