import axios from 'axios'

import React, { useState } from 'react'; 
  
function AddProject(){


    const [newProject,setNewProject]=useState(
        {
        
          labelproject: '' ,
            projectdescriptiob: '',
            fundneeded: '',
            fundcollected: '',
             Image:''
        
        }
    );
    const {
        labelproject,
        projectdescriptiob,
        fundneeded,
        fundcollected,
        Image


    } = newProject;



    const  onChange=(e)=> {

        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value,
        });




    }
    const onChangeFile = (e) => {

        setNewProject({
            ...newProject,
            Image: e.target.file?.[0]
        });




    }



   

    const handleSubmit=(e)=>{
e.precentDefault();

const formData =new FormData();
formData.append('Image',newProject.Image);
formData.append('labelproject',newProject.labelproject);
formData.append('projectdescriptiob',newProject.projectdescriptiob);
formData.append('fundneeded',newProject.fundneeded);
formData.append('fundcollected',newProject.fundcollected);


console.log(newProject.Image);

axios.post('http://localhost:5000/api/project/add',formData)
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
          <label htmlFor="name"> labelproject</label>
          <input type="text"
             name="labelproject"
             placeholder="labelproject"
             value={labelproject}
             onChange={(e) => onChange(e)}
              required />
        </div>


        <div>
          <label htmlFor="name">projectdescriptiob</label>
          <input type="text"
             name="projectdescriptiob"
             placeholder="projectdescriptiob"
             value={projectdescriptiob}
             onChange={(e) => onChange(e)}
              required />
        </div>


        <div>
          <label htmlFor="name">fundneeded</label>
          <input type="text"
             name="fundneeded"
             placeholder="fundneeded"
             value={fundneeded}
             onChange={(e) => onChange(e)}
              required />
        </div>

        <div>
          <label htmlFor="name">fundcollected</label>
          <input type="text"
             name="fundcollected"
             placeholder="fundcollected"
             value={fundcollected}
             onChange={(e) => onChange(e)}
              required />
        </div>
      



        <div>
          <label htmlFor="Image">Image</label>
          <input 
          type="file" 
          id="Image" 
          name="Image" 
          onChange={(e) => onChangeFile(e)}
          required />
        </div>
        <div>
          <button type="submit" >Submit</button>
        </div>
      </form>
)
}
export default AddProject