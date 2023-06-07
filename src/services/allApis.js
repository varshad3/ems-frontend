import { BASE_URL } from "./base_url";
import { commonRequest } from "./commonRqst";


// register
export const empRegister = async (body,headers)=>{
  console.log(body);  
    return commonRequest("POST",`${BASE_URL}/employee/register`,body,headers)
}

// get all users
export const getusersapi = async(searchKey)=>{
 return await commonRequest("GET",`${BASE_URL}/employee/get-all-employee-details?search=${searchKey}`,"")
}

// view profile
export const viewprofile = async(id)=>{
  return await commonRequest("GET",`${BASE_URL}/employee/view-profile/${id}`,"")
}

// data remove from particular id

export const removeUser = async(id)=>{
  return await commonRequest("DELETE",`${BASE_URL}/employee/delete-user/${id}`,{})
}


// edit user
export const updateUser= async(id,body,headers)=>{
  return commonRequest("PUT",`${BASE_URL}/employee/update-user/${id}`,body,headers)
}