import { NavLink, Outlet, useNavigate } from "react-router-dom";


 const Dashboard = () => {

   const navigate = useNavigate()

  return (
    <div className="min-h-screen">
     {/* Navbar for Recruiter panel */}
     <div className="logo-container bg-blue-900 w-screen h-25 px-6 flex items-center justify-between  ">
        <div className="flex items-center justify-between w-full pr-4">
            <img onClick={() => navigate("/")} className="logo w-80 h-80 bg-transparent md:static cursor-pointer " src="/src/assets/Logo.png" alt="" />
        <div className="flex gap-5 items-center text-xl text-white  ">
        <p className="max-sm:hidden">Welcome , HireHub</p>
        <div className="relative group"> 
         <img className="w-10 h-10 rounded " src="/src/assets/company_icon.svg" alt="" />
         <div className="absolute top-18 right-0  pt-5 px-7 text-black w-40 h-20 hidden group-hover:block bg-white shadow-lg rounded-lg">
            <ul className="list-none m-0 p-2 ">
               <li className="cursor-pointer  hover:bg-gray-100">Logout</li>
            </ul>
         </div>
        </div>
        </div>
        </div>
     </div>

     <div className="flex items-start">
      {/* left side bar with option add job,manage jobs , view applications */}
        <div className="inline-block min-h-screen  border-r-2 border-gray-200 shadow-xl  bg-[#ffbc42]  ">
         <ul className="flex flex-col items-start pt-10">
            <NavLink className={({isActive}) => `flex items-center p-5 sm:px-6 hover:bg-gray-100 gap-2 w-full ${isActive && 'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/add-job'}  >
            <img className="min-w-4" src="/src/assets/add_icon.svg" alt="" />
            <p className="max-sm:hidden" >Add Job</p>  
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 hover:bg-gray-100 gap-2 w-full ${isActive && 'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/manage-jobs'}  >
            <img className="min-w-4"  src="/src/assets/home_icon.svg" alt="" />
            <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center p-4 sm:px-6 hover:bg-gray-100 gap-2 w-full ${isActive && 'bg-blue-100 border-r-4 border-blue-500'} `} to={'/dashboard/view-applications'}  >
            <img className="min-w-4"  src="/src/assets/person_tick_icon.svg" alt="" />
            <p className="max-sm:hidden">View Applications</p>
            </NavLink>
         </ul>
        </div>

        <div style={{backgroundImage: "url('/src/assets/bg-img1.jpg')"}} className="w-full h-screen bg-cover bg-center bg-no-repeat ">
         <Outlet />
        </div>
     </div>
        </div>
  )
}

export default Dashboard;
