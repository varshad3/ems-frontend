import React from 'react'
import { Spinner } from 'react-bootstrap'

function LoadingSpinner() {
  return (
    <div style={{width:'100%',height:'30vh'}} className='d-flex justify-content-center align-items-center m-5'>
        <Spinner animation="border" variant="light" />
        <span className='ms-2 text-dark fs-3'>Loading...</span>
    </div>
  )
}

export default LoadingSpinner