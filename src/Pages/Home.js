import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import HomeTable from '../Components/HomeTable'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import {deleteContext, editContext, registerContext} from '../Components/ContextShare'
import { getusersapi, removeUser } from '../services/allApis'

function Home() {

  // get editcontest using usecontext
  const {editData,setEditData} = useContext(editContext)

  // get deletecontext using usecontext
  const {deleteData,setDeleteData} = useContext(deleteContext)

  // define delete user
  const deleteUser = async (id)=>{
    console.log("inside home delete function"+id);
    // make api call to service
    const res = await removeUser(id)
    console.log(res);
    if(res.status === 200){
      // data successdully removed
      // pass response data to context
      setDeleteData(res.data)
      // call getuser api
      getusers()
    }
    else{
      // api call failed
      console.log("Error");
    }
  }
// create a state to hold for search employee name
const [searchKey,setsearchKey]=useState("")
// console.log(searchKey);

// create state to hold all users
const [allusers,setallusers] = useState([])

// define a function to call get all users api
const getusers = async ()=>{
  const serverResponse = await getusersapi(searchKey)
  setallusers(serverResponse.data)
}

// console.log(allusers);

// get register context using usecontext
const {registerData,setregisterData} = useContext(registerContext)

// create state to display spinner
const [showSpin,setShowspin]=useState(true)

  // navigate to another page-useNavigate
  const navigate =useNavigate()

  // to redirect register page when the button click
  const addUser=()=>{
    // navigate to register
    navigate('/register')
  }

  useEffect(()=>{
    // call getusers api
    getusers()
    // show spin as false after 2 second
    setTimeout(() => {
       setShowspin(false)
    }, 2000);
  },[searchKey])


  return (
    <>

    {
      registerData?<Alert className='bg-success' variant='success' onClose={()=>setregisterData("")} 
      dismissible> {registerData.fname.toUpperCase()} 
        Successfully Registered...
      </Alert>:""
    }
    {
      editData?<Alert className='bg-success' variant='success' onClose={()=>setEditData("")} 
      dismissible> {editData.fname.toUpperCase()} 
        Successfully Updated...
      </Alert>:""
    }
    {
      deleteData?<Alert className='bg-danger' variant='danger' onClose={()=>setDeleteData("")} 
      dismissible> {deleteData.fname.toUpperCase()} 
        Successfully deleted...
      </Alert>:""
    }
      <div className='container mt-5'>
          <div className="first_div">
              {/* search add btn */}
              <div className="search_add d-flex justify-content-between">
            {/* search */}
            <div className="search col-md-4">
            <Form className='d-flex'>
            <Form.Control
                        type="text"
                        placeholder="Search employee name here"
                        onChange={e=>setsearchKey(e.target.value)}
                      />
                <Button className='ms-2' variant='success'>Search</Button>
            </Form>
            </div>
  
            {/* add btn */}
          <div className="add">
  
  <button onClick={addUser} className='btn btn-info'> <i className="fa-solid fa-user-plus fa-fade me-2"></i>Add</button>
  </div>
              </div>
          </div>
          <div className="sec_div">
  
         { 
         showSpin?(
          <div>
          <LoadingSpinner/>
        </div>
         ):(
          <div>
          {/* table */}
          <HomeTable displayData={allusers} 
          handleDelete = {deleteUser}
          />
       </div>
         )}
  
  
          </div>
  
      </div>
    </>
  )
}

export default Home