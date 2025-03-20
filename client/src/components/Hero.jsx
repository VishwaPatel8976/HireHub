import { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
  };

  return (
    <div className="container 2xl:px-20 mx-auto mt-40 mb-10 ">
      <div className="bg-gradient-to-r from-blue-800 to-[#00263C] text-white text-center mx-2 py-10 rounded-xl ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h1>
        <p className="mb-6 max-w-xl mx-auto text-m px-5 ">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex justify-around max-sm:flex-col gap-4 items-center  text-2xl text-[#00263C] p-2 md:flex flex-wrap sm:mx-auto  rounded">
          <div className="flex items-center bg-amber-50 rounded-xl pl-2">
            <img
              className="h-4 sm:h-5 pr-2"
              src="src\assets\search_icon.svg"
              alt=""
            />
            <input type="text" placeholder="Search For Jobs"
             className="max-sm:text-xs p-2 rounded  text-[#00263C]"
              ref={titleRef}/>
          </div>
          <div className="flex items-center bg-amber-50 rounded-xl pl-3">
            <img className="h-4 sm:h-5 pr-2" src="src\assets\location_icon.svg" alt="" />
            <input type="text"placeholder="Location"className="max-sm:text-xs p-2 rounded  text-[#00263C]" 
               ref={locationRef} />
          </div>
          <button
            onClick={onSearch}
            className="bg-amber-500 px-9 py-2 rounded text-white max-sm:text-xs" >
            Search
          </button>
        </div>
      </div>
      <div className="company_logos border border-gray-300 rounded-md shadow-md shadow-blue-100 py-4 flex mx-2 px-4 mt-4">
        <div className=" flex justify-center gap-10 lg:gap-16 flex-wrap ">
          <p className="font-medium ">Trusted by </p>
          <img className="h-6" src="src\assets\microsoft_logo.svg" alt="" />
          <img className="h-6" src="src\assets\samsung_logo.png" alt="" />
          <img className="h-6" src="src\assets\walmart_logo.svg" alt="" />
          <img className="h-6" src="src\assets\amazon_logo.png" alt="" />
          <img className="h-6" src="src\assets\adobe_logo.png" alt="" />
          <img className="h-6" src="src\assets\accenture_logo.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
