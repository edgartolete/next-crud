import { useState } from "react"

export default function UpdateEmployee({setUpdate, employee, fetchEmployees}){

    const [firstName, setFirstName] = useState(employee.first_name);
    const [lastName, setLastName] = useState(employee.last_name);
    const [birthday, setBirthday] = useState(employee.birthday);      
    const [successStatus, setSuccessStatus] = useState(false);
    const [failedStatus, setFailedStatus] = useState(false);

    const getAge = (birthday) => {
        const birthdate = new Date(birthday)
        const today = new Date()
        const ageInMilliseconds = today - birthdate;
        const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
        const age = Math.floor(ageInMilliseconds / millisecondsPerYear); 
        return age;
    }
    const updateEmployee = async () =>{
            let updateEmployee = {first_name: firstName, last_name: lastName, birthday, age: getAge(birthday)}
            const response = await fetch(`./api/employees/${employee.employee_id}`,{
                method: 'PATCH',
                body: JSON.stringify({updateEmployee}),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if(data.changedRows == 1){
                setUpdate(false)
            }
            console.log(data)
            
            fetchEmployees();
    
    }


    return(
    <div className='add-employee-form'>
        <label>First Name: <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/></label>
        <label>Last Name: <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} /></label>
        <label>Birthday: <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/></label>
        <button onClick={updateEmployee}>Update</button>
        <button onClick={()=> setUpdate(false)}>Cancel</button>
        
        {(successStatus) ? <p>Update Success</p>: ""}
        {(failedStatus) ? <p>Update Failed</p>: ""}
      </div>
    )
}