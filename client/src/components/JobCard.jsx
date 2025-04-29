import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  console.log(job.companyId?.image);
  const navigate = useNavigate();
  return (
    <div className="border border-gray-100 p-5 shadow-xl rounded-2xl bg-white/80 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group">
      <div className="flex justify-start gap-4 shadow-sm border-b border-gray-100 p-2 px-2 mb-2 items-center">
        <img className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 shadow-md group-hover:scale-105 transition-transform duration-200" src={job?.companyId?.image} alt="" />
        <h4 className="font-bold text-2xl text-blue-900 tracking-tight group-hover:text-amber-500 transition-colors duration-200">{job.title}</h4>
      </div>
      <div className="flex items-center gap-4 text-sm font-semibold mt-2">
        <span className="bg-gradient-to-r from-blue-100 to-blue-200 border-blue-200 border px-4 py-1.5 rounded-full text-blue-900 shadow-sm">{job.location}</span>
        <span className="bg-gradient-to-r from-pink-100 to-pink-200 border-pink-200 border px-4 py-1.5 rounded-full text-pink-800 shadow-sm">{job.level}</span>
      </div>
      <p className="text-gray-600 mt-4 text-base leading-relaxed min-h-[60px]" dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + "..." }}></p>
      <div className="mt-5 flex gap-4 text-sm font-semibold">
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0); }}
          className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-2 text-white rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200">Apply Now</button>
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0); }}
          className="border border-gray-300 px-6 py-2 text-gray-700 rounded-full bg-white/70 hover:bg-gray-100 shadow hover:scale-105 transition-all duration-200">Learn More</button>
      </div>
      <span className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-amber-200/60 to-amber-400/10 rounded-bl-full blur-2xl opacity-60 pointer-events-none"></span>
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
    companyId: PropTypes.shape({
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default JobCard;

