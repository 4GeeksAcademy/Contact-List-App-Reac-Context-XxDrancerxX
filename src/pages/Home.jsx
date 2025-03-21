import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [contacts, setContacts] = useState([])  //We changed the state to a global state to re-use it in other components//
	//Using the useGlobalReducer hook above//
	const createAgenda = () => {
		const option = {
			method: "POST",
			headers: {
				"content-Type": "application/json"
			},
			body: JSON.stringify({
				"slug": "israel-diaz",
				"id": 0

			})
		}
		fetch("https://playground.4geeks.com/contact/agendas/israel-diaz", option)
			.then((resp) => {
				if (resp.ok == false) {
					console.log("failed to create agenda");
				}
				else {
					getContactsfromAgenda()
				}
				return resp.json()
			})
			.then((data) => console.log("Agenda Created(Data):", data))
	}


	const getContactsfromAgenda = () => {            //Gets the contacts from a specific agenda from the database.//
		fetch("https://playground.4geeks.com/contact/agendas/israel-diaz/contacts")
			.then((resp) => {
				console.log("Contacts from agenda(resp):", resp)
				if (resp.ok == false) {         //if it doesn't exist, it creates a new agenda with the function named there//
					return createAgenda();
				}
				else {
					return resp.json()
				}

			})
			.then((data) => {
				// const arrayOfContacts = data.contacts
				// console.log("Array of Contacts from agenda(data):", arrayOfContacts); //This is the array of contacts from the agenda 
				// setContacts(arrayOfContacts);
				dispatch({ type: "set_contact_list", payload: data.contacts })  //Another way to set the contacts in the global state to re-use it//
				console.log("Contacts from agenda", data)

			})
	}


	const getAllagendas = () => {   //Gets all the agendas from the database.//
		fetch("https://playground.4geeks.com/contact/agendas")
			.then((resp) => {
				console.log("All Agendas(RESP):", resp)
				return resp.json()
			})
			.then((data) => {
				console.log("All Agendas(DATA):", data)
				return data
			});
	}

	const deleteContacts = (id) => {
		const option = {
			method: "DELETE"			
		};
		fetch(`https://playground.4geeks.com/contact/agendas/israel-diaz/contacts/${id}`, option)
		.then((resp) => {
		  if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}, statusText: ${resp.statusText}`);
		  }
		  
		})
		.then((data) => {
			const updatedContacts = store.contacts.filter(contact => contact.id !== id);
			dispatch({ type: "set_contact_list", payload: updatedContacts });
		
		});
	}
	useEffect(() => {
		getContactsfromAgenda();
		getAllagendas();
	}, [])


	console.log("store.contacts", store.contacts);
	console.log("store", store);

	return (
		<div className="text-center p-3 mt-5">
			{store.contacts.length > 0 ? store.contacts.map((item) => {
				return (

					<div className="row-auto bg-primary text-white p-3 m-3" key={item.id}>

						<p>{item.name}</p>
						<p>{item.phone}</p>
						<p>{item.email}</p>
						<p>{item.address}</p>
						<Link to="/submit" >
							<button
								onClick={() => {
									dispatch({ type: "set_single_contact", payload: item })
								}}
								className="btn btn-danger">Edit</button>
						</Link>
						<button onClick={() => deleteContacts(item.id)} className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
					</div>


				)
			}) : "No contacts found"}
		</div>
	);
}