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
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken} = useContext(AppContext)
  const onSubmitHandler = async (e) =>{
    e.preventDefault();

    try {
            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(backendUrl+'/api/company/post-job',
              {title,description,location,category,level,salary},
              {headers: {token: companyToken}}
            )

            if(data.success){
              toast.success(data.message)
              setTitle('')
              setSalary(0)
              quillRef.current.root.innerHTML = ""
            } else {
              toast.error(data.message)
            }
    } catch (error) {
      toast.error(error.message)
      
    }
  }
 useEffect(() => {
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write something awesome...',
      });
    }  
  }, []);

  return (
   <form onSubmit={onSubmitHandler} className='container p-5 flex flex-col w-full items-start gap-4'>

     <div className='w-full'>
      <p className='mb-2'>Job Title</p>
      <input type="text" placeholder="Type here" 
      onChange={(e) => setTitle(e.target.value)} value={title} required 
      className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded outline-none'/>
      </div>

     <div className='w-full max-w-lg'>
      <p>Job Description</p>
      <div ref={editorRef} >

      </div>
     </div>

     <div className='flex flex-col sm:flex-row w-full gap-3 sm:gap-15'>
     <div>
  <label htmlFor="job-category" className="mb-2 block">Job Category</label>
  <input
    type="text"
    id="job-category"
    list="job-category-list"
    className="w-full px-3 py-2 border-2 border-gray-200 rounded outline-none hover:border-gray-300"
    onChange={(e) => setCategory(e.target.value)}
    placeholder="Type a job category..."
  />
  <datalist id="job-category-list">
    {JobCategories.map((category) => (
      <option key={category} value={category} />
    ))}
  </datalist>
</div>

      <div>
  <label htmlFor="job-location" className="mb-2 block">Job Location</label>
  <input
    type="text"
    id="job-location"
    list="job-location-list"
    className="w-full px-3 py-2 border-2 border-gray-200 rounded outline-none hover:border-gray-300"
    onChange={(e) => setLocation(e.target.value)}
    placeholder="Type a location..."
  />
  <datalist id="job-location-list">
    {JobLocations.map((location) => (
      <option key={location} value={location} />
    ))}
  </datalist>
</div>
        <div>
        <p className='mb-2'>Job Level</p>
        <select className='w-full px-3 py-2 border-2 border-gray-200 rounded outline-none hover:border-gray-300 '
        onChange={(e) => setLevel(e.target.value)}>
          <option value="Beginner level">Beginner level</option>
          <option value="Intermediate level">Intermediate level</option>
          <option value="Senior level">Senior level</option>
        </select>
      </div>
     </div>
     <div>
       <p className='mb-2'>Job Salary</p>
       <input min={0} className='w-full px-3 py-2 border-2 border-gray-200 rounded outline-none hover:border-gray-300 sm:w-[50 %] ' onChange={(e) => setSalary(e.target.value )} type="Number" placeholder='2500' />
     </div>
      <button className='w-25 py-3 bg-amber-500 text-white rounded-sm
      hover:bg-amber-600' type="submit">ADD</button>
   </form>
  )
}

export default AddJob