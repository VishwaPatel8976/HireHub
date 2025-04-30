import {useRef, useState , useEffect, useContext} from 'react';
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const[location, setLocation] = useState('Banglore');
  const[category, setCategory] = useState('programming');
  const[level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken} = useContext(AppContext);

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Job title is required");
      return false;
    }
    if (!location.trim()) {
      toast.error("Job location is required");
      return false;
    }
    if (!category.trim()) {
      toast.error("Job category is required");
      return false;
    }
    if (!quillRef.current || !quillRef.current.root.innerHTML.trim()) {
      toast.error("Job description is required");
      return false;
    }
    if (salary <= 0) {
      toast.error("Please enter a valid salary");
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        { title, description, location, category, level, salary },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message || 'Job posted successfully');
        setTitle('');
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message || 'Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write something awesome...',
      });
    }  
  }, []);

  return (
   <form onSubmit={onSubmitHandler} className="container p-8 flex flex-col w-full items-start gap-6 bg-white/80 rounded-2xl shadow-2xl max-w-3xl mx-auto mt-10 backdrop-blur-md border border-blue-100">
     <h2 className="text-3xl font-extrabold text-blue-900 mb-4 tracking-tight flex items-center gap-2">
       <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01.88 7.9M12 3v1m0 16v1m8.66-13.66l-.7.7M4.34 19.66l-.7.7M21 12h-1M4 12H3m16.66 7.66l-.7-.7M4.34 4.34l-.7-.7" /></svg>
       Add a New Job
     </h2>
     <div className="w-full">
      <p className="mb-2 font-semibold text-blue-900">Job Title</p>
      <input type="text" placeholder="Type here" 
      onChange={(e) => setTitle(e.target.value)} value={title} required 
      className="w-full max-w-lg px-4 py-2 border-2 border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200"/>
      </div>
     <div className="w-full max-w-lg">
      <p className="font-semibold text-blue-900">Job Description</p>
      <div ref={editorRef} className="rounded-lg border-2 border-blue-100 bg-white/90 min-h-[120px] shadow-inner" />
     </div>
     <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-8">
      <div>
        <label htmlFor="job-category" className="mb-2 block font-semibold text-blue-900">Job Category</label>
        <input
          type="text"
          id="job-category"
          list="job-category-list"
          className="w-full px-4 py-2 border-2 border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Type a job category..."
          value={category}
          required
        />
        <datalist id="job-category-list">
          {JobCategories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="job-location" className="mb-2 block font-semibold text-blue-900">Job Location</label>
        <input
          type="text"
          id="job-location"
          list="job-location-list"
          className="w-full px-4 py-2 border-2 border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200"
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Type a location..."
          value={location}
          required
        />
        <datalist id="job-location-list">
          {JobLocations.map((location) => (
            <option key={location} value={location} />
          ))}
        </datalist>
      </div>
      <div>
        <p className="mb-2 font-semibold text-blue-900">Job Level</p>
        <select className="w-full px-4 py-2 border-2 border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200"
        onChange={(e) => setLevel(e.target.value)}
        value={level}>
          <option value="Beginner level">Beginner level</option>
          <option value="Intermediate level">Intermediate level</option>
          <option value="Senior level">Senior level</option>
        </select>
      </div>
     </div>
     <div className="w-full max-w-xs">
       <p className="mb-2 font-semibold text-blue-900">Job Salary</p>
       <input min={0} className="w-full px-4 py-2 border-2 border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200" onChange={(e) => setSalary(e.target.value )} type="Number" placeholder="2500" value={salary} required />
     </div>
      <button 
        className={`w-32 py-3 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-400 hover:scale-105'} text-blue-900 font-bold rounded-full shadow-lg transition-all duration-200 mt-4`} 
        type="submit"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'ADD'}
      </button>
   </form>
  )
}

export default AddJob