 import  { useContext, useState,useEffect } from 'react'
 import { AppContext } from '../context/AppContext'
 import JobCategories from './JobCategories.jsx'
import { JobLocations  } from '../assets/assets.js';
import JobCard from './Jobcard.jsx';
// import { assets } from '../assets/assets.js';
// import right_arrow_icon from './right_arrow_icon.svg';

const JobListing = () => {
   
    const {isSearched,searchFilter,setSearchFilter, jobs} = useContext(AppContext);

    const [showFilter,setShowFilter] = useState(true);
    const[currentPage,setCurrentPage] = useState(1);
    const [selectedCategories,setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category)? prev.filter(c => c!==category) : [...prev, category]
        );
    };  
     const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location)? prev.filter(l => l!==location) : [...prev, location]
        );      
    };

    useEffect(()=>{
        const matchesCategory = job => selectedCategories.length === 0 || 
        selectedCategories.includes(job.category)

        const matchesLocation = job => selectedLocations.length === 0 || 
        selectedLocations.includes(job.location)

        const matchesTitle = job => searchFilter.title === "" ||
         job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
    
        const matchesSearchLocation = job => searchFilter.location === "" ||
         job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
     
        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job)
             && matchesSearchLocation(job)
        )  
        setFilteredJobs(newFilteredJobs);
        setCurrentPage(1);    
    },[jobs,selectedCategories,selectedLocations,searchFilter])
    

  return (
    <div className='sidebarContainer 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 '>
        {/* sidebar */}
    
    <div className='w-full lg:w-1/4  rounded-2xl shadow-xl px-4 '>
            {/* search filter from hero component */}
            {
                isSearched && ( searchFilter.title !== "" || searchFilter.location !=="" ) && (
                    <>
                    <h3 className='font-medium text-lg mb-4'>current search</h3>
                    <div className='mb-4 text-gray-600'>
                        {searchFilter.title && (
                            <span className='inline-flex items-center gap-3 bg-blue-100 px-4 py-2 rounded '>
                                {searchFilter.title || searchFilter.location}
                                <img onClick={() => setSearchFilter(prev => ({...prev,title:""}) )} className='cursor-pointer' src="src\assets\cross_icon.svg" alt="" />
                            </span>
                        )}
                         {searchFilter.location && (
                            <span className='ml-2 inline-flex intem-center gap-3 bg-pink-100 px-4 py-2 rounded '>
                                {searchFilter.location}
                                <img onClick={ () => setSearchFilter(prev => ({...prev,location:""}) )} className='cursor-pointer' src="src\assets\cross_icon.svg" alt="" />
                            </span>
                        )}
                    </div>
                    </>
                )
            }

            <button onClick={() => setShowFilter(prev => !prev)} className='px-6 py-2 text-xl bg-blue-500 mb-5 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out lg:hidden '>
                {
                    showFilter? 'Hide Filters' : 'Filters'
  
 
                }
            </button>
            {/* Category Filter */}
            <div className={showFilter? 'categoryFilter' : 'hidden'}>
                <h4 className='font-medium text-lg py-4 '>Search by Categories</h4>
                <ul className='space-y-4 text-gray-600 '>
                    {
                      JobCategories.map((category,index) => (
                        <li key={index} className='flex items-center gap-3 '>
                            <input className='scale-120' type="checkbox"
                            onChange={() => handleCategoryChange(category)}
                            checked = {selectedCategories.includes(category)}/> 
                            {category}
                        </li>)) 
                         }
                </ul>
            </div>
            {/* Location Filter */}
             <div className={showFilter ? 'locationFilter' : 'hidden'}>
                <h4 className='font-medium text-lg py-4 pt-12'>Search by Location</h4>
                <ul className='space-y-4 text-gray-600 '>
                    {
                      JobLocations.map((location,index) => (
                        <li key={index} className='flex items-center gap-3 '>
                            <input className='scale-120' type="checkbox"
                            onChange={()=> handleLocationChange(location)}
                            checked = {selectedLocations.includes(location)}
                             name='' id='' />
                            {location}
                        </li> ))    
                    }
                </ul>
            </div>
    </div>


    {/* Job Listings */}
    <section className='w-full lg:w-3/4 px-4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
        <p className='mb-8'>Get your desired job from top companies</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
       { filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index) => (
        <JobCard key={index} job={job} />
       ))}
        </div>
        {/* Pagination */}
        {
        filteredJobs.length > 0 && (
            <div className='flex items-center justify-center gap-6 py-10'>
         <a href="#job-list"> 
         <button onClick={() => setCurrentPage(Math.max(currentPage-1,1))} className='border border-gray-300 px-4 py-2
          text-gray-600 rounded hover:bg-gray-100'>Previous</button>
         </a>
         {
             Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index) => (
             <a key={index} href="#job-list">
             <button onClick={() => setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 px-4 py-2
             text-gray-600 rounded hover:bg-gray-100 ${index+1 === currentPage ? 'bg-blue-500 text-white' : 'text-gray-600'}`}>{index+1}</button>
            </a>))  }
            <a href="#job-list">
             <button onClick={() => setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length/6)))}
             className='border border-gray-300 px-4 py-2 text-gray-600 rounded hover:bg-gray-100'>Next</button>
           </a> 
            </div>
         )
    }
    </section>
    </div>
   
  )
}

export default JobListing