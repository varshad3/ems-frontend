import React, { createContext, useState } from 'react'
// create context and assign to a variable that is registercontext
export const registerContext = createContext();
export const deleteContext = createContext();
export const editContext = createContext();
function ContextShare({children}) {

// register data state
const [registerData,setregisterData] = useState("")
// delete data store state
const [deleteData,setDeleteData] = useState("")

// edit data store cheyan
const [editData,setEditData] = useState("")
  return (
    <>
    <registerContext.Provider value={{registerData,setregisterData}}>
       <editContext.Provider value={{editData,setEditData}}>
         <deleteContext.Provider value={{deleteData,setDeleteData}}>
           {children}
           </deleteContext.Provider>
       </editContext.Provider>
    </registerContext.Provider>
    
    </>
  )
}

export default ContextShare