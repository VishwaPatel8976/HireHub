import { useState } from "react";
import Navbar from "../components/Navbar";
import { jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume,setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container px-4 2xl:px-20 mx-auto my-10 mb-25 min-h-[65vh]">
        <h2 className="text-2xl font-semibold">Your Resume</h2>
        <div className="flex gap-5 mt-3">
          { isEdit ? 
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-50 border-blue-200 shadow-sm border px-4 py-1.5 rounded">select Resume</p>
                <input id="resumeUpload" onChange={e => setResume(e.target.files[0])} accept="application/pdf" type="file" hidden />
                <img src="/src/assets/profile_upload_icon.svg" alt="" />
              </label>
              <button onClick={() => setIsEdit(false)} className="bg-green-600 shadow-lg text-white  hover:bg-green-500  px-4 py-1.5 rounded">save</button>
            </>
           : 
            <div className="flex gap-5">
              <a className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              shadow-lg text-white  hover:bg-gradient-to-br  px-4 py-1.5 rounded" href="">Resume</a>
              <button  onClick={() => setIsEdit(true)} className= "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300  text-gray-700  hover:bg-gradient-to-br border border-gray-300 px-4 py-1.5 rounded">Edit</button>
            </div>
          }
        </div>
        <h2 className="text-xl font-semibold m-5">Jobs Applied</h2>
        <table className="min-w-full bg-blue-50  rounded shadow-sm table-auto" >
          <thead>
            <tr className="bg-blue-100 shadow-sm h-10  border-b border-gray-400  text-left" >
              <th className="py-3 px-4  text-left">Company</th>
              <th>Job Title</th>
              <th className="max-sm:hidden">Location</th>
              <th className="max-sm:hidden">Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => true ? (
              <tr key={index} className="border-b border-gray-300">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img className="w-5 h-6" src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td >{job.title}</td>
                  <td className="max-sm:hidden">{job.location}</td>
                  <td className="max-sm:hidden">{moment(job.date).format("ll") }</td>
                  <td>
                    <div className={`w-25 px-2 py-1.5 flex justify-center text-white
                       ${job.status === "Accepted" ? "bg-green-400" : job.status === "Pending"?
                        "bg-blue-400" : "bg-red-400"} rounded`}>
                    {job.status}
                    </div>
                    {/* {job.status} */}
                  </td>
               </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default Applications;
