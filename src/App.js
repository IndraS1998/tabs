import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
const url = 'https://course-api.netlify.app/api/react-tabs-project';


function App()
{
  const [loading,setLoading] = useState(true);
  const [jobs,setJobs] = useState([]);
  const [value,setValue] = useState(0);

  const onFetch = async () => {
    setLoading(true)
    let response;
    let digest;
    try{
      response = await fetch(url);
    }catch (e) {
      console.log(e);
    }
    try{
      digest = await response.json();
    }catch (e) {
      console.log(e);
    }
    setJobs(digest);
  }

  useEffect( () =>{
    onFetch().then(()=>setLoading(false));
  },[]);

  if(loading){
    return(
        <section className='section loading'>
          <h1>Loading ...</h1>
        </section>
    )
  }


  let {company,dates, duties, title} = jobs[value];

  return (
      <section className='section'>
        <div className="title">
          <h2>experience</h2>
          <div className="underline"></div>
        </div>
        <div className="jobs-center">
          {/*button container*/}
          <div className="btn-container">
            {jobs.map((job,index)=> <button key={job.id} onClick={()=>{
              setValue(index);
            }} className={`job-btn ${index === value && 'active-btn'}`}>
              {job.company}
            </button>)}
          </div>
          {/*job info*/}
          <article className="job-info">
            <h3>{title}</h3>
            <h4>{company}</h4>
            <div className="job-date">{dates}</div>
            {duties.map((duty,index)=> <div key={index} className='job-desc'>
              <FaAngleDoubleRight className='job-icon'/>
              <p>{duty}</p>
            </div>)}
          </article>
        </div>
      </section>
  );
}


export default App;
