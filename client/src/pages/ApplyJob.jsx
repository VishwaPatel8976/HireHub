import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar.jsx";
import Loading from "../components/Loading.jsx";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";


const ApplyJob = () => {
  const { id } = useParams();

  const { getToken } = useAuth()

  const navigate = useNavigate()

  const [JobData, setJobData] = useState(null);
  const [ isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);
  console.log(jobs);


   const fetchJob = async () => {

    try {
      const {data} = await axios.get(backendUrl+`/api/jobs/${id}`)

      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }

      } catch (error) {
      toast.error(error.message)
     }

  };

  const applyHandler = async () => {


    try {
      
      if (!userData) {
        return toast.error('Login to apply for jobs ')
      }
      if (!userData.resume) {
        navigate('/applications')
        return toast.error('upload resume to apply')
      }

      const token = await getToken()

      const {data} = await axios.post(backendUrl+'/api/users/apply',
        {jobId: JobData._id},
        {headers: {Authorization: `Bearer ${token}`}}
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
      const checkAlreadyApplied = () => {

        const hasApplied = userApplications.some( item => item.jobId._id === JobData._id)
        setIsAlreadyApplied(hasApplied)
      }


      useEffect(() => { 
          fetchJob();
  },[id]);

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied();
    }
  },[JobData,userApplications, id])

   

  return JobData ? (
    <>
      <Navbar />
      <div className="job-heading-container min-h-screen flex flex-col py-5 px-4 xl:px-20 mx-auto ">
        <div className="main-container bg-white text-black px-2 py-4 rounded-lg w-full">
          {/*job heading */}
          <div className="job-title-container flex flex-col  justify-center md:justify-between lg:flex-row 
           gap-8 px-10 py-15 mb-6 bg-sky-50 border-blue-300 border rounded-xl">
            <div className="job-info-container flex flex-col md:flex-row  items-center">
              <img
                className="h-24 bg-amber-100 rounded p-4 mr-4 max-md:mb-4 shadow"
                src={JobData.companyId.image} alt="" />
              <div className="text-center md:text-left text-xl  text-[#00263C]">
                <h1 className="text-2xl sm:text-4xl font-medium">
                  {JobData.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-8 py-4 items-center
                 text-blue-900 mt-2">
                  <span className="flex items-center gap-2">
                    <img
                      className="brightness-70"
                      src="/src/assets/suitcase_icon.svg" alt=""/>
                    {JobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      className="brightness-50"
                      src="/src/assets/location_icon.svg" alt="" />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      className="brightness-20 "
                      src="/src/assets/person_icon.svg" alt="" />
                    {JobData.level}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      className="brightness-40"
                      src="/src/assets/money_icon.svg" alt="" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-md max-md:mx-auto max-md:text-center gap-2 max-md:text-sm ">
              <button onClick={applyHandler} className="bg-blue-600 text-white px-2 py-1.5 rounded hover:bg-blue-700 w-35 lg:px-6">
               {isAlreadyApplied ? "Already Applied" : "Apply Now"}
              </button>
              <p className=" text-gray-600">
                Posted {moment(JobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Job description details*/}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4 text-[#00263C]">
                {" "}
                Job description{" "}
              </h2>
              <div
                className="rich-text "
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>
              <button onClick={applyHandler}  className="bg-blue-600 text-white px-6 py-1.5 rounded
               hover:bg-blue-700 mt-10">
               {isAlreadyApplied ? "Already applied" : "Apply Now"}
              </button>
            </div>
            {/*Right section More jobs */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-4 ">
              <h2>More Jobs from {JobData.companyId.name}</h2>
              {jobs.filter( job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
              .filter(job => {
                // set of applied jobIds
                 const appliedJobsIds = new Set(userApplications.map(app => app.jobId._id))
                  //filter jobs to only show jobs that the user has not applied for
                  //if the job id is not in the set of applied job ids, return true
                  //this will return only the jobs that the user has not applied for

                 //return true if the user has not already applied for the job
                  return !appliedJobsIds.has(job._id)
              }).slice(0,3).map((job, index) => 
                  <JobCard key={index} job={job} />
              )}
              </div>
            </div>
           </div>
          </div>
         {/* Footer */}
        <Footer/>
      </>
      ) : (
       <div>
         <Loading />
        </div>
      );
    };

export default ApplyJob;
