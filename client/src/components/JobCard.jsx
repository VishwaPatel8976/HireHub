import { assets } from "../assets/assets";
import PropTypes from 'prop-types';
import {  useNavigate} from 'react-router-dom'
const JobCard = ({ job }) => {
 const navigate = useNavigate()
    return (
    <div className="border border-gray-100 p-5 shadow-sm rounded-lg ">
      <div className="flex justify-start gap-4  shadow-sm border-b-gray-100 p-2 px-2 mb-2 items-center ">
        <img className ="w-6 h-6 " src={assets.company_icon} alt="" />
      <h4 className="font-semibold text-xl">{job.title}</h4>
      </div>
      <div className="flex items-center  gap-4 text-sm font-semibold">
        <span className="bg-blue-50 border-blue-100 border px-4 py-1.5 rounded">{job.location}</span>
        <span className="bg-pink-50 border-pink-100 border  px-4 py-1.5 rounded">{job.level}</span>
      </div>
      <p className="text-gray-500 mt-4 text-sm" dangerouslySetInnerHTML={{__html:job.description.slice(0,150) + "..."}}></p>
      <div className="mt-3 flex gap-4 text-sm font-semibold">
         <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0,0)}}
          className="bg-blue-500 px-4 py-1.5
          text-white rounded hover:bg-blue-600 ">Apply Now</button>
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0,0)}}
         className="border border-gray-300 px-4
         py-1.5 text-gray-600 rounded hover:bg-gray-100">Learn More</button>
      </div>
    </div>
  );
};
JobCard.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobCard;

