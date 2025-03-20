import { manageJobsData } from "../assets/assets"
import moment from "moment"
import { useNavigate } from "react-router-dom"


const ManageJobs = () => {

  const navigate = useNavigate()

  return (
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
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-gray-800">
                <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden ">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300 ">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300  ">{moment(job.date).format("ll")}</td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300 ">{job.location}</td>
                <td className="py-2 px-4 border-b text-center border-gray-300  ">{job.applicants}</td>
                <td className="py-2 px-4 border-b border-gray-300 ">
                  <input className="w-5 h-5 ml-4 " type="checkbox"  />
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
  )
}

export default ManageJobs