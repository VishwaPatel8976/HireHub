
import PropTypes from "prop-types";
import jobsData from "../assets/assets";
// import AppContext from "./AppContext";

import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false)

  const [jobs, setJobs] = useState([]);

  const[showRecruiterLogin, setShowRecruiterLogin] = useState(false)

  const [companyToken, setCompanyToken] = useState(null)
  const [companyData, setCompanyData] = useState(null)

  //function to fetch jobs
  const fetchJobs = async () =>{

      setJobs(jobsData)
  }

  useEffect(() => {
    fetchJobs()
  },[]);

  const value = {
    searchFilter, setSearchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin,  setShowRecruiterLogin,
    companyToken, setCompanyToken,
    companyData, setCompanyData,
    backendUrl
    // Add other state variables and methods here if needed.  For example:
  }; // Define the value variable
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
