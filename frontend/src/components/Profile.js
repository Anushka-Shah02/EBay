import React,{useState,useEffect} from 'react'
import './Profile.css';

function Profile() {
    const [name, setName] = useState("");
    const [middlename, setMiddleName] = useState("");
    const [lastname, setLastName] = useState("");
    const [title, setTitle] = useState("");
    const [mobileno, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [bday, setBday] = useState("");
    const [anni, setAnni] = useState("");
    const [gender,setGender]=useState('');
    const user=JSON.parse(localStorage.getItem("user"));
    

    const handleSave=async(userId)=>{
      // console.warn("Email,password",email,password)
      console.log(userId)
      let result=await fetch(`http://localhost:5000/profileupdate/${userId}`,{
      method:"PATCH",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({title,middlename,lastname,gender,mobileno,bday,anni})
      
   });
   result=await result.json();
   console.log(result);
   if(result)
   {
     alert("Profile Updated")
   }else{
     alert("Enter all the details");
   }
   
  }

  const discardChanges=async(userId)=>{
    setAnni("");
    setBday("");
    setGender("");
    setLastName("");
    setMiddleName("");
    setMobile("");
    setTitle("");
  }

  return (
    <div style={{backgroundColor:"black"}}>
      <h3 className='profile-head'>My Profile Page</h3>
      <form style={{paddingBottom:"20px"}}>
        <div className='one-line' >
        <div className='field'>
        <label className='label'>Title:</label>
        <input
          className='textfield'
          type="text" 
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>

        <div className='field'>
        <label className='label'>First Name:</label>
        <input
        className='textfield setback'
          type="text" 
          value={user.name}
          placeholder="Enter First Name"
          // onChange={(e) => setName(e.target.value)}
        />
        </div>
        </div>

        <div className='one-line'>
        <div className='field'>
        <label className='label'>Middle Name:</label>
        <input
        className='textfield'
          type="text" 
          value={middlename}
          placeholder="Enter Middle Name"
          onChange={(e) => setMiddleName(e.target.value)}
        />
        </div>

        <div className='field'>
      <label className='label'>Last Name:</label>
        <input
        className='textfield'
          type="text" 
          value={lastname}
          placeholder="Enter Lastname"
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>
        </div>
      
      <div className='radios'>
        <input type="radio" value="Male" name="gender" onChange={(e) => setGender(e.target.value)} /><p className='tags'>Male</p> 
        <input type="radio" value="Female" name="gender" onChange={(e) => setGender(e.target.value)} /><p className='tags'>Female</p> 
        <input type="radio" value="Transgender" name="gender" onChange={(e) => setGender(e.target.value)}/> <p className='tags'>Transgender</p> 
        <input type="radio" value="I'd rather not say" name="gender"onChange={(e) => setGender(e.target.value)} /><p className='tags'>I'd rather not say</p> 
      </div>

      <div className='one-line'> 
      <div className='field'>
      <label className='label'>Mobile Number:</label>
        <input
        className='textfield'
          type="number" 
          value={mobileno}
          placeholder="Enter Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div className='field'>
      <label className='label'>Email Id:</label>
        <input
        className='textfield setback'
          type="text" 
          value={user.email}
          placeholder="Enter Email Id"
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      </div>

      <div className='one-line'>
      <div className='field'>
      <label className='label'>Date of Birth:</label>
        <input
        className='textfield'
          type="date" 
          value={bday}
          placeholder="DD/MM/YYYY"
          onChange={(e) => setBday(e.target.value)}
        />
      </div>

      <div className='field'>
      <label className='label'>Date of Anniversary:</label>
        <input
        className='textfield'
          type="date" 
          value={anni}
          placeholder="DD/MM/YYYY"
          onChange={(e) => setAnni(e.target.value)}
        />
      </div>  
      </div>
    </form>

    <div className='end-btn'>
      <button className='discard' onClick={()=>discardChanges(user._id)}>Discard Changes</button>
      <button className='save' onClick={()=>handleSave(user._id)}>Save Changes</button>
    </div>
    </div>
  )
}

export default Profile