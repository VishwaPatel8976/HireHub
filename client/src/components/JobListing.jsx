import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard.jsx";
import Loading from "./Loading.jsx";

const JobListing = () => {
  const { jobs, searchFilter, setSearchFilter } = useContext(AppContext);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const filterJobs = () => {
      return jobs
        .filter((job) => {
          const matchesQuery = searchFilter.query
            ? job.title?.toLowerCase().includes(searchFilter.query.toLowerCase()) ||
              job.category?.toLowerCase().includes(searchFilter.query.toLowerCase()) ||
              job.location?.toLowerCase().includes(searchFilter.query.toLowerCase())
            : true;

          const matchesCategory = searchFilter.category
            ? job.category === searchFilter.category
            : true;

          const matchesLocation = searchFilter.location
            ? job.location === searchFilter.location
            : true;

          return matchesQuery && matchesCategory && matchesLocation;
        })
        .sort((a, b) => {
          if (searchFilter.sortOrder === "asc") {
            return a.title?.localeCompare(b.title);
          } else {
            return b.title?.localeCompare(a.title);
          }
        });
    };

    setFilteredJobs(filterJobs());
    setLoading(false);
  }, [jobs, searchFilter]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilter((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="job-listing-container px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Available Jobs</h2>

      {/* Filter Section */}
      <div className="filter-section mb-6 flex flex-wrap gap-4">
        <select
          name="category"
          className="border px-4 py-2 rounded"
          value={searchFilter.category}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(jobs.map((job) => job.category))).map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <select
          name="location"
          className="border px-4 py-2 rounded"
          value={searchFilter.location}
          onChange={handleFilterChange}
        >
          <option value="">All Locations</option>
          {Array.from(new Set(jobs.map((job) => job.location))).map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>

        <select
          name="sortOrder"
          className="border px-4 py-2 rounded"
          value={searchFilter.sortOrder}
          onChange={handleFilterChange}
        >
          <option value="asc">Sort by Title (A-Z)</option>
          <option value="desc">Sort by Title (Z-A)</option>
        </select>
      </div>

      {currentJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No jobs found matching your criteria.</p>
      )}

      {/* Pagination */}
      {filteredJobs.length > jobsPerPage && (
        <div className="pagination flex justify-center mt-6">
          {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListing;
