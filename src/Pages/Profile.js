import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import LoadingSpinner from '../Components/LoadingSpinner'
import { useParams } from 'react-router-dom'
import { viewprofile } from '../services/allApis'
import { BASE_URL } from '../services/base_url'

function Profile() {

  // creatae a state to hold user details 
  const [userDetails,setuserDetails] = useState({})

  // use useparams hook to get a path parameter of route
  const {id} = useParams()
  // console.log(id);

  const [showSpin,setShowspin]=useState(true)

  // define function to get profile for a specific user
  const getProfile = async ()=>{

    // api call -viewprofile
    const {data} = await viewprofile(id)
    setuserDetails(data);
  }
  // console.log(userDetails);

useEffect(()=>{
  // call getprofile function
  getProfile()
    setTimeout(() => {
       setShowspin(false)
    }, 2000);
  },[])
  return (
    <>

<div className="container mt-4">
  {
    showSpin?(
      <div>
      <LoadingSpinner/>
    </div>
     ):(
  <Card className='shadow col-lg-6 mx-auto' >
<Card.Body>
  <Row>
    <div className="col">
      <div className="profile_img justify-content-center d-flex">
      <img className='rounded-circle border p-1'  
      width={'200px'} 
      height={'200px'} 
      src={`${BASE_URL}/uploads/${userDetails.profile}`}
      alt="profile" />
      </div>
    </div>
  </Row>
  <div className="text-center mt-3">
<h3> {userDetails.fname}&nbsp;{userDetails.lname}</h3>
<h5>{" "} <i class="fa-solid fa-envelope text-primary me-2"></i>:- {userDetails.email}{" "} </h5>
<h5>{" "}  <i class="fa-solid fa-mobile text-danger me-2"></i>:- {userDetails.mobile}{" "} </h5>
<h5>{" "}  <i class="fa-solid fa-venus-mars text-warning me-2"></i>:- {userDetails.gender}{" "}  </h5>
<h5>{" "}  <i class="fa-solid fa-location-dot text-info me-2"></i>:- {userDetails.location} {" "} </h5>
<h5> {" "} <i class="fa-solid fa-chart-line text-dark me-2"></i>:- {userDetails.status} {" "} </h5>


  </div>
</Card.Body>
  </Card>
  )}
</div>

    </>
  )
}

export default Profile