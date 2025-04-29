import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import Loading from "../components/Loading"

const ViewApplications = () => {

  const {backendUrl ,  companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)
  //Function to fetch compnay Job Applications Data
  const fetchCompanyJobApplications = async () => {
     try {
       
       const { data } = await axios.get(backendUrl+'/api/company/applicants',
         {headers: {token: companyToken}}
       )
       if (data.success) {
        setApplicants(data.applications.reverse())
       } else {
        toast.error(data.message)
       }
     } catch (error) {
      toast.error(error.message)
     }
  }
  //Function to Update Job Applications status
  const changeJobApplicationStatus = async (id,status) => {
    try {
        const {data} = await axios.post(backendUrl+'/api/company/change-status',
          {id,status},
          {headers: {token: companyToken}}
        )
        if (data.success) {
          fetchCompanyJobApplications()
        } else {
          toast.error(data.message)
        }
    } catch (error) {
     toast.error(error.message) 
    }
  }
   useEffect( () => {
 
    if ( companyToken) {
      fetchCompanyJobApplications()
    }
   },[companyToken])
  return applicants ? applicants.length === 0 ? ( 
    <div className="flex items-center justify-center h-[70vh]">
      <p className="text-xl font-medium sm:text-2xl text-blue-900">No Applications Available</p>
    </div>
  ) : (
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-amber-50 rounded-2xl shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl border-2 rounded-lg border-gray-200 bg-white/80 backdrop-blur-md">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 text-center">Resume</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className="text-gray-800 hover:bg-blue-50/60 transition-colors duration-150">
                <td className="py-2 px-4 border-b border-gray-300 text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300 flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full border-2 border-blue-200 shadow-md" src={applicant.userId.image} alt="" />
                  <span className="font-semibold text-blue-900">{applicant.userId.name}</span>
                </td>
                <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden text-gray-700">{applicant.jobId.title}</td>
                <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden text-gray-700">{applicant.jobId.location}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  <a href={applicant.userId.resume} target="_blank" className="text-blue-600 hover:text-blue-800 bg-blue-50 inline-flex items-center px-3 py-1 rounded-lg">
                    Resume <img className="w-4 h-4 ml-2" src="/src/assets/resume_download_icon.svg" alt="" />
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-center relative">
                  {applicant.status === "pending" ? (
                    <div className="relative inline-block text-left group">
                      <button className="text-gray-600 action-button">...</button>
                      <div className="hidden group-hover:block absolute z-10 right-0 md:left-0 top-0 mt-3 w-32 bg-white shadow-md border border-blue-100 rounded-md">
                        <button onClick={() => changeJobApplicationStatus(applicant._id, 'accepted')} className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100">Accept</button>
                        <button onClick={() => changeJobApplicationStatus(applicant._id, 'rejected')} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Reject</button>
                      </div>
                    </div>
                  ) : (
                    <span className="font-semibold text-gray-700">{applicant.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplications