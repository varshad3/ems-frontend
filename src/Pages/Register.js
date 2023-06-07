import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select'
import LoadingSpinner from '../Components/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { empRegister } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { registerContext} from '../Components/ContextShare'

function Register() {

  // to get the error msg 
  const [errorMsg,setErrorMsg]=useState("")

  // to get context
  const {registerData,setregisterData}=useContext(registerContext)

  // use navigate hook
  const navigate = useNavigate()

  const [showSpin,setShowspin]=useState(true)

  // dropdown details 
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
  ];

  // create state to hold the 6 user inputdata 
  const [userData,setuserData]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  // create state to hold the uploaded image in preview
  const [preview,setPreview]=useState("")


  // create a state to hold the uploaded image
  const [image,setimage]=useState("")

  // create state for status
  const [status,setStatus] = useState("Active")

  // to update userdata when user enter the input using html
const userDetails =(e)=>{
const {name,value}=e.target
setuserData({...userData,[name]:value})
}

// update the state for image 
const updateimage =(e)=>{
setimage(e.target.files[0])
}

// update status state
const updateState=(e)=>{
setStatus(e.value)
}

  useEffect(()=>{
if(image){
// update uploadd image

setPreview(URL.createObjectURL(image))
}

    setTimeout(() => {
       setShowspin(false)
    }, 2000);
  },[image])

// defining submit button for register
const handleSubmit =async (e)=>{
// prevent the click event to stop the reload
e.preventDefault()
// get user input data from the form
const {fname,lname,email,mobile,gender,location}=userData
if(fname==="")
{
  toast.error("First Name required!!!")
}
else if(lname==="")
{
  toast.error("Last Name required!!!")
}
else if(email==="")
{
  toast.error("Email required!!!")
}
else if(mobile==="")
{
  toast.error("Mobile required!!!")
}
else if(gender==="")
{
  toast.error("Gender required!!!")
}
else if(image==="")
{
  toast.error("Profile Image required!!!")
}
else if(location==="")
{
  toast.error("Location required!!!")
}
else{
  // make register api call

  // headerConfig
  const headerConfig = {
    "Content-Type":"multipart/form-data"
  }

  // body - formData
  const data = new FormData()
  data.append("user_profile",image)
  data.append("fname",fname)
  data.append("lname",lname) 
   data.append("email",email)
   data.append("mobile",mobile)
   data.append("gender",gender)
   data.append("status",status)
   data.append("location",location)
console.log(data);
  //  api call
  const response = await empRegister(data,headerConfig)
  if(response.status===200){
    // reset all states
    setuserData({...userData,
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        gender:"",
        location:""
    })
    setStatus("")
    setimage("")
    
    // share response data to other component via context
    setregisterData(response.data)
    // navigate to home page
    navigate("/")
  }
  else{
    setErrorMsg("Error")
  }
}
}

  return (
    <>
{
  errorMsg?<Alert variant='danger' className='bg-danger' onClose={()=>setErrorMsg("")} dismissible>
    {errorMsg}
  </Alert> :""
}

    <div className="container mt-5">
    <h2 className='text-center mt-3'>Register Employee Details</h2>
   {
    showSpin?(
      <div>
      <LoadingSpinner/>
    </div>
     ):(
   <Card className='shadow p-3 mt-3'>
      {/* image  */}
      <div className='text-center mb-3'>
      <img className='rounded-circle' 
       width={'60px'}
        height={'60px'} 
        src={preview?preview:"https://secure.webtoolhub.com/static/resources/icons/set108/b5cdab07.png"} alt="profile" />
      </div>
{/* form */}
<Form>

<Row>
  {/* firstname */}
<Form.Group className='col-lg-6 mb-2'>
<Form.Label>First Name</Form.Label>
<Form.Control  required type="text" placeholder="Enter First name" 
 name="fname" value={userData.fname} onChange={userDetails} />
</Form.Group>
{/* lastname */}
<Form.Group className='col-lg-6 mb-2'>
<Form.Label>Last Name</Form.Label>
<Form.Control  name="lname" value={userData.lname} onChange={userDetails} required type="text" placeholder="Enter Last name" />
</Form.Group>
{/* email  */}
<Form.Group className='col-lg-6 mb-2'>
<Form.Label>Email Address</Form.Label>
<Form.Control  name="email" value={userData.email} onChange={userDetails} required type="email" placeholder="Enter Email Address" />
</Form.Group>
{/* mobile */}
<Form.Group className='col-lg-6 mb-2'>
<Form.Label>Mobile</Form.Label>
<Form.Control  name="mobile" value={userData.mobile} onChange={userDetails} required type="text" placeholder="Enter Mobile No:" />
</Form.Group>
{/* gender */}
<Form.Group className='col-lg-6 mb-2'>
<Form.Label>Gender</Form.Label>
<Form.Check  type={"radio"}
 label={'Male'} 
 name="gender"
 value={"Male"}
 onChange={userDetails} />

 <Form.Check  type={"radio"}
 label={'Female'} 
 name="gender"
 value={"Female"} 
 onChange={userDetails}/>
</Form.Group>
{/* select status */}
<Form.Group className='col-lg-6 mb-2'>
<Form.Label>Select Employee Status</Form.Label>
<Select className='text-dark' options={options} defaultInputValue={status}
 onChange={updateState} />
</Form.Group>
{/* upload photo */}
<Form.Group className='col-lg-6 mb-2'>
<Form.Label>Choose Profile Picture</Form.Label>
<Form.Control onChange={updateimage} name="user_profile" required type="file" />
</Form.Group>
{/* location */}
<Form.Group className='col-lg-6 mb-2'>
<Form.Label>Enter Employee Location</Form.Label>
<Form.Control 
 name="location" value={userData.location} onChange={userDetails} required type="text" placeholder="Employee Location" />
</Form.Group>

{/* submit button */}
<Button onClick={handleSubmit} className="btn btn-info mt-3">
Submit
</Button>

</Row>
</Form>
    </Card>
    )}
    </div>
    <ToastContainer position='top-center'/>
    </>
  )
}

export default Register