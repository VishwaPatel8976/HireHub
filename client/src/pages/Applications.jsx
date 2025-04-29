import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import { jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()
  const [isEdit, setIsEdit] = useState(false);
  const [resume,setResume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {
    try {
      const formData = new FormData()
      formData.append('resume',resume)

      const token = await getToken()
      const { data } = await axios.post(backendUrl+'/api/users/update-resume',
        formData,
        {headers:{Authorization : `Bearer ${token}`}}
      )
      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }      
    } catch (error) {
      toast.error(error.message)
    }
    setIsEdit(false)
    setResume(null)

  }

  useEffect(()=> {
    if (user) {
      fetchUserApplications()
    }
  },[user])

  return (
    <>
      <Navbar />
      <div className="container px-4 2xl:px-20 mx-auto my-10 mb-25 min-h-[65vh]">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 tracking-tight flex items-center gap-2">
          <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01.88 7.9M12 3v1m0 16v1m8.66-13.66l-.7.7M4.34 19.66l-.7.7M21 12h-1M4 12H3m16.66 7.66l-.7-.7M4.34 4.34l-.7-.7" /></svg>
          Your Resume
        </h2>
        <div className="flex gap-5 mt-3">
          { isEdit || userData && userData.resume === "" ? 
            <>
              <label className="flex items-center cursor-pointer group" htmlFor="resumeUpload">
                <p className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 border-blue-200 border px-4 py-1.5 rounded-full text-blue-900 shadow group-hover:from-blue-200 group-hover:to-blue-400 transition-colors duration-200">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input id="resumeUpload" onChange={e => setResume(e.target.files[0])} accept="application/pdf" type="file" hidden />
                <img src="/src/assets/profile_upload_icon.svg" alt="" className="w-7 h-7 ml-2 group-hover:scale-110 transition-transform duration-200" />
              </label>
              <button onClick={updateResume} className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg text-white hover:from-green-600 hover:to-green-700 px-4 py-1.5 rounded-full font-semibold transition-all duration-200">Save</button>
            </>
           : 
            <div className="flex gap-5">
              <a target="_blank" href={userData.resume} className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg text-white hover:bg-gradient-to-br px-4 py-1.5 rounded-full font-semibold transition-all duration-200">Resume</a>
              <button onClick={() => setIsEdit(true)} className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-700 hover:bg-gradient-to-br border border-gray-300 px-4 py-1.5 rounded-full font-semibold transition-all duration-200">Edit</button>
            </div>
          }
        </div>
        <h2 className="text-2xl font-bold text-blue-900 m-5 flex items-center gap-2">
          <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01.88 7.9M12 3v1m0 16v1m8.66-13.66l-.7.7M4.34 19.66l-.7.7M21 12h-1M4 12H3m16.66 7.66l-.7-.7M4.34 4.34l-.7-.7" /></svg>
          Jobs Applied
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/80 backdrop-blur-md">
          <table className="min-w-full bg-transparent rounded shadow-sm table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-sm h-12 border-b border-gray-400 text-left text-blue-900 text-lg">
                <th className="py-3 px-4 text-left">Company</th>
                <th>Job Title</th>
                <th className="max-sm:hidden">Location</th>
                <th className="max-sm:hidden">Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((job, index) => true ? (
                <tr key={index} className="border-b border-gray-200 hover:bg-blue-50/60 transition-colors duration-150">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img className="w-8 h-8 rounded-full border-2 border-blue-200 shadow" src={job.companyId.image} alt="" />
                    <span className="font-semibold text-blue-900">{job.companyId.name}</span>
                  </td>
                  <td className="font-medium text-gray-800">{job.jobId.title}</td>
                  <td className="max-sm:hidden text-gray-700">{job.jobId.location}</td>
                  <td className="max-sm:hidden text-gray-700">{moment(job.date).format("ll") }</td>
                  <td>
                    <div className={`w-28 px-2 py-1.5 flex justify-center text-white font-bold rounded-full shadow-md text-center
                      ${job.status === "accepted" ? "bg-gradient-to-r from-green-400 to-green-600" : job.status === "pending" ?
                        "bg-gradient-to-r from-blue-400 to-blue-600" : "bg-gradient-to-r from-red-400 to-red-600"}`}>
                      {job.status}
                    </div>
                  </td>
                </tr>
              ) : (null))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Applications;
