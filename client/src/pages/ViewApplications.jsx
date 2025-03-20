import { viewApplicationsPageData } from "../assets/assets"


const ViewApplications = () => {
  return (
    <div className="container mx-auto p-6  ">
      <div className=" ">
        <table className="w-full max-w-4xl border-2 rounded-full  border-gray-200 max-sm:text-sm ">
          <thead className="  bg-[#0d47a1] text-white">
            <tr className="shadow-sm  ">
               <th className="py-4  px-4 text-left">#</th>
               <th className="py-4 px-4 text-left" >User Name</th>
               <th className="py-4 px-4 text-left max-sm:hidden">Job Title</th>
               <th className="py-4 px-4 text-left max-sm:hidden">Location</th>
               <th className="py-4 px-4 text-left">Resume</th>
               <th className="py-2 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody >
            {viewApplicationsPageData.map((applicant,index)=>(
              
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b border-gray-300 text-center">{index+1} </td>
                <td className="py-2 px-4 text-center border-b border-gray-300  flex items-center ">
                  <img className="w-10 h-10 rounded-full mr-3 max-sm:hidden" src={applicant.imgSrc} alt="" />
                  <span className="max-sm:pt-4 max-sm:pb-2">{applicant.name}</span>
                </td>
                  <td  className="py-2 px-4 border-b border-gray-300  max-sm:hidden">
                  {applicant.jobTitle}</td>
                  <td className="py-2 px-4 border-b border-gray-300  max-sm:hidden">{applicant.location}</td>
                  <td className="py-2 px-4 border-b border-gray-300  text-center">
                    <a href="" target="_blank"
                    className="text-blue-600 hover:text-blue-800 bg-blue-50 inline-flex  items-center px-3 py-1 rounded-lg">
                      Resume <img className="w-4 h-4 m-2  text-blue-500 hover:bg-blue-200" src="/src/assets/resume_download_icon.svg" alt="" />
                    </a>
                  </td>

                  <td className="py-2 px-4 border-b border-gray-300  text-center relative">
                    <div className="realative inline-block text-left group">
                      <button className="text-gray-600 action-button">...</button>
                    <div className="hidden group-hover:block absolute z-10 right-0 md:left-0 top-0 mt-3 w-32 bg-white shadow-md border-1 border-blue-100 rounded-md ">
                       <button className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 ">Accept</button>
                        <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 ">Reject</button>
  
                    </div>
                    </div>
                  </td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications