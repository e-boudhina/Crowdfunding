import axios from 'axios'

import React, { useState } from 'react'; 
  
function AddEvents(){


    const [newEvent,setNewEvent]=useState(
        {
        
            EventName: '' ,
            EventDescription: '',
            StartDate: '',
            EndDate: '',
        
        }
    );
    const {
        EventName,
        EventDescription,
        StartDate,
        EndDate,
        


    } = newEvent;



    const  onChange=(e)=> {

        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value,
        });




    }
   



   

    const handleSubmit=(e)=>{
e.precentDefault();

const formData =new FormData();
formData.append('EventName',newEvent.EventName);
formData.append('EventDescription',newEvent.EventDescription);
formData.append('StartDate',newEvent.StartDate);
formData.append('EndDate',newEvent.EndDate);



console.log(newEvent.Image);

axios.post('http://localhost:5000/api/events/add',formData)
.then(res=>{
    console.log(res);
})
.catch(err=>{
    console.log(err);
}

)

    }

    return (
    
        <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <div>
          <label htmlFor="name"> EventName</label>
          <input type="text"
             name="EventName"
             placeholder="EventName"
             value={EventName}
             onChange={(e) => onChange(e)}
              required />
        </div>


        <div>
          <label htmlFor="name">EventDescription</label>
          <input type="text"
             name="EventDescription"
             placeholder="EventDescription"
             value={EventDescription}
             onChange={(e) => onChange(e)}
              required />
        </div>


        <div>
          <label htmlFor="name">StartDate</label>
          <input type="text"
             name="StartDate"
             placeholder="StartDate"
             value={StartDate}
             onChange={(e) => onChange(e)}
              required />
        </div>

        <div>
          <label htmlFor="name">EndDate</label>
          <input type="text"
             name="EndDate"
             placeholder="EndDate"
             value={EndDate}
             onChange={(e) => onChange(e)}
              required />
        </div>
      



      </form>
)
}
export default AddEvents