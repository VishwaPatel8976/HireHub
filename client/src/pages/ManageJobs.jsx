
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import Loading from "../components/Loading"


const ManageJobs = () => {

  const navigate = useNavigate()

  const [jobs, setJobs] = useState(false)
  console.log(jobs)

  const { backendUrl, companyToken} = useContext(AppContext)

  //Function to fetch company Job Applications data
  const fetchCompanyJobs = async () => {

    try {
      const {data} = await axios.get(backendUrl+'/api/company/list-jobs',
        {headers: {token: companyToken}}
      )
      if(data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData);
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)   
    }
  }

  //Function to change job visibility
 const changeJobVisibility = async (id) => {
    try {

      const {data} = await axios.post(backendUrl+'/api/company/change-visibility',
        { id },
        {headers: {token: companyToken}}
      )

      if ( data.success) {
        
        toast.success(data.message)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }
    useEffect( () => {

      if(companyToken){

        fetchCompanyJobs()
      }
    },[companyToken])
  return jobs ? jobs.length === 0 ? (
     <div className="flex items-center justify-center h-[70vh]">
      <p className="text-xl font-medium sm:text-2xl text-[#0d47a1]">No Jobs Available or posted</p>
     </div>
     ) :(
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl border-2 rounded-full  border-gray-200 max-sm:text-sm">
          <thead className="bg-[#0d47a1] text-white">
            <tr>
              <th className="py-3 px-4 text-left max-sm:hidden">#</th>
              <th className="py-3 px-4 text-left">Job Title</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Date</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 text-center ">Applicants</th>
              <th className="py-3 px-4 text-left">Visible</th>
            </tr>
         </thead>
          <tbody>
            {jobs && jobs.map((job, index) => (
              <tr key={index} className="text-gray-800">
                <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden ">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300 ">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300  ">{moment(job.date).format("ll")}</td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300 ">{job.location}</td>
                <td className="py-2 px-4 border-b text-center border-gray-300  ">{job.applicants}</td>
                <td className="py-2 px-4 border-b border-gray-300 ">
                  <input onChange={(()=> changeJobVisibility(job._id))} className="w-5 h-5 ml-4 " type="checkbox" 
                  checked={job.visible}  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-start">
        <button onClick={() => navigate("/dashboard/add-job")} className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg text-white  hover:bg-gradient-to-br  px-4 py-2 rounded mt-5 ">
          Add new job
        </button>
      </div>
    </div>
  ) : <Loading/>
}

export default ManageJobs