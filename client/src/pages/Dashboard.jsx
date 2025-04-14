import { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


 const Dashboard = () => {

   const navigate = useNavigate()

   const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

   //Function to logout for company
   const logout = () => {

      setCompanyToken(null)
      localStorage.removeItem('companyToken')
      setCompanyData(null)
      navigate('/')
  
   }

   useEffect(() => {
      if (companyData) {
         navigate('/dashboard/manage-jobs')
      }
   },[companyData])

  return (
    <div className="min-h-screen">
     {/* Navbar for Recruiter panel */}
     <div className="logo-container bg-blue-900 w-screen h-25 px-6 flex items-center 
     justify-between  ">
        <div className="flex items-center justify-between w-full pr-4">
            <img onClick={() => navigate("/")} className="logo w-80 h-80 bg-transparent md:static cursor-pointer "
             src="/src/assets/Logo.png" alt="" />
         { companyData && (

        <div className="flex gap-5 items-center text-2xl text-amber-300  ">
        <p className="max-sm:hidden">Welcome, {companyData.name}</p>
        <div className="relative group"> 
         <img className="w-auto  h-13 rounded  " src={companyData.image} alt="" />
         <div className="absolute top-12 right-0 pt-4 px-7 text-blue-900 w-40 h-20 hidden group-hover:block
          bg-white shadow-lg rounded-lg">
            <ul className="list-none m-0 p-1 ">
               <li onClick={logout} className="cursor-pointer hover:text-red-600">Logout</li>
            </ul>
         </div>
        </div>
        </div>
         )
       }
        </div>
     </div>

     <div  className="flex items-start min-h-screen bg-[#f5f5f5]"> 
      {/* left side bar with option add job,manage jobs , view applications */}
        <div className="border-r-2 border-gray-200 shadow-xl inline-block  min-h-screen bg-[#ffbc42] ">
         <ul className="flex flex-col items-start pt-10">
            <NavLink className={({isActive}) => `flex items-center p-5 sm:px-6 hover:bg-gray-100 gap-2 w-full
             ${isActive && 'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/add-job'}  >
            <img className="min-w-4" src="/src/assets/add_icon.svg" alt="" />
            <p className="max-sm:hidden" >Add Job</p>  
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 hover:bg-gray-100 gap-2 w-full
             ${isActive && 'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/manage-jobs'}  >
            <img className="min-w-4"  src="/src/assets/home_icon.svg" alt="" />
            <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 hover:bg-gray-100 gap-2 w-full
             ${isActive && 'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/view-applications'}  >
            <img className="min-w-4"  src="/src/assets/person_tick_icon.svg" alt="" />
            <p className="max-sm:hidden">View Applications</p>
            </NavLink>
         </ul>
        </div>

        <div className="flex-1 h-full p-2 sm:p-5">
         <Outlet />
        </div>
     </div>
        </div>
  )
}

export default Dashboard;
