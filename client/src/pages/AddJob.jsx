import {useRef, useState , useEffect} from 'react';
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
const AddJob = () => {

  const [title, setTitle] = useState('');
  const[location, setLocation] = useState('Banglore');
  const[category, setCategory] = useState('programming');
  const[level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write something awesome...',
      });
    }
   
  }, []);

  return (
   <form className='container p-5 flex flex-col w-full items-start gap-4'>

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
        <p className='mb-2'>Job Category</p>
        <select className='w-full px-3 py-2 border-2 border-gray-200 rounded outline-none hover:border-gray-300 '
         onChange={(e) => setCategory(e.target.value)}>
          {JobCategories.map((category,index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <p className='mb-2'>Job Location</p>
        <select className='w-full px-3 py-2 border-2 border-gray-200 rounded outline-none hover:border-gray-300 '

        onChange={(e) => setLocation(e.target.value)}>
          {JobLocations.map((location,index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
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