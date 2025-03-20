import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import assets from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/Jobcard";
import Footer from "../components/Footer";
const ApplyJob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    if (jobs.length > 0) {
      const fetchJob = async () => {
        const data = jobs.filter((job) => job._id === id);
        if (data.length !== 0) {
          setJobData(data[0]);
          console.log(data[0]);
        }
      };
      fetchJob();
    }
  }, [id, jobs,]);

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
                      src={assets.suitcase_icon} alt=""/>
                    {JobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      className="brightness-50"
                      src={assets.location_icon}  alt="" />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      className="brightness-20"
                      src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      className="brightness-40"
                      src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-md max-md:mx-auto max-md:text-center gap-2 max-md:text-sm ">
              <button className="bg-blue-600 text-white px-2 py-1.5 rounded hover:bg-blue-700 w-35 lg:px-6">
                Apply Now
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
              <button className="bg-blue-600 text-white px-6 py-1.5 rounded
               hover:bg-blue-700 mt-10">
                Apply Now
              </button>
            </div>
            {/*Right section More jobs */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-4 ">
              <h2>More Jobs from {JobData.companyId.name}</h2>
              {jobs.filter(job => job.companyId._id === JobData.companyId._id &&
               job._id !== JobData._id).slice(0, 3).map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
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
 