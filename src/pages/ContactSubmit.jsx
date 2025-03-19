import React, {useState} from 'react';

export const ContactSubmit = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    
    const submitContact = () => {
    const option = {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "name": name,
            "phone": phone,
            "email": email,
            "address": address
          })
    }
    fetch("https://playground.4geeks.com/contact/agendas/israel-diaz/contacts",option)
    .then((resp)=>resp.json())
    .then((data)=>console.log("contact created",data))
}
    return(
	<div>
        <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="name" />
        <input onChange={(e)=>setPhone(e.target.value)} type="text" placeholder="phone" />  
        <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="email" />   
        <input onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="address" />    
        <button onClick={submitContact}>Submit</button>
    </div>
)};