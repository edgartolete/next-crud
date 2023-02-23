import { headers } from "@/next.config";
import { useState } from "react"

export default function AddEmployee({employees, fetchEmployees}){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");      
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
    const addEmployee = async () =>{
            const timestamp = new Date().getTime();
            const id = timestamp.toString();
            let newEmployee = {first_name: firstName, last_name: lastName, birthday, age: getAge(birthday), employee_id: id}

            const response = await fetch('./api/employees',{
                method: 'POST',
                body: JSON.stringify({newEmployee}),
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const data = response.json()
            console.log(data)
            
            fetchEmployees();
            setFailedStatus(false)
            setSuccessStatus(true)
            
    }

    return(
    <div className='add-employee-form'>
        <label>First Name: <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/></label>
        <label>Last Name: <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} /></label>
        <label>Birthday: <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/></label>
        <button onClick={addEmployee}>Add</button>
        
        {(successStatus) ? <p>Submit Success</p>: ""}
        {(failedStatus) ? <p>Failed: Record already exist</p>: ""}
      </div>
    )
}