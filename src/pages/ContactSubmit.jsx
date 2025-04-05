import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export const ContactSubmit = () => {
    const { store, dispatch } = useGlobalReducer();



    const [name, setName] = useState(store.singleContact?.name || "");
    const [phone, setPhone] = useState(store.singleContact?.phone || "");
    const [email, setEmail] = useState(store.singleContact?.email || "");
    const [address, setAddress] = useState(store.singleContact?.address || "");

    const submitContact = () => {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "phone": phone,
                "email": email,
                "address": address
            })
        };
        fetch("https://playground.4geeks.com/contact/agendas/israel-diaz/contacts", option)
            .then((resp) => {
                console.log("Status:", resp.status, "OK:", resp.ok);
                if (resp.ok) {
                    return resp.json();
                } else {
                    return resp.text().then(text => {
                        throw new Error(`Failed to create contact: Status ${resp.status}, Response: ${text}`);
                    });
                }
            })
            .then((data) => {
                dispatch({ type: "submit_single_contact", payload: data });
                setName("");
                setPhone("");
                setEmail("");
                setAddress("");
            })
            .catch((error) => {
                console.error("Error creating contact:", error);
                alert("Error: " + error.message);
            });
    };

    const updateContact = (id) => {
        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "phone": phone,
                "email": email,
                "address": address
            })
        };
        fetch("https://playground.4geeks.com/contact/agendas/israel-diaz/contacts/" + id, option)
            .then((resp) => {
                console.log("Status:", resp.status, "OK:", resp.ok);
                if (resp.ok) {
                    return resp.json();
                } else {
                    return resp.text().then(text => {
                        throw new Error(`Failed to update contact: Status ${resp.status}, Response: ${text}`);
                    });
                }
            })
            .then((data) => {
                dispatch({ type: "update_single_contact", payload: data });
            })
            .catch((error) => {
                console.error("Error updating contact:", error);
                alert("Error: " + error.message);
            });
    };


    return (
        //  className="container  d-flex justify-content-center flex-column"
        <div style={{ paddingLeft: "100px", paddingRight: "100px" }} className="py-5 mx-5 d-flex flex-column min-vh-100">

            <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Name:</label>
                <input className="form-control" id="formGroupExampleInput" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" />
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" className="form-label">Phone:</label>
                <input className="form-control" id="formGroupExampleInput1" onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder="Phone" />
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Email:</label>
                <input className="form-control" id="formGroupExampleInput2" onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" className="form-label">Address:</label>
                <input className="form-control" id="formGroupExampleInput3" onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="Address" />
            </div>
            <div className="d-flex py-2 ">
                <button
                    onClick={() => {
                        submitContact();
                    }}
                    type="button"
                    className="btn btn-primary"
                >
                    SubmitContact

                </button>
                <button onClick={() => {
                    if (store.singleContact?.id) {
                        updateContact(store.singleContact.id);
                    }
                    else {
                        console.log("No contact ID found. Cannot update.");
                        alert("Please select a contact to update.");
                    }
                }} type="button" className="btn btn-secondary">
                    Update
                </button>
            </div>
            <Link to="/">
                <button className="btn btn-link p-0">Get back to Contacts</button>
            </Link>
        </div>
    )
};

