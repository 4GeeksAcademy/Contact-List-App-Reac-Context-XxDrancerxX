import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	
	const [showModal, setShowModal] = useState(false);
	const [selectedContact, setSelectedContact] = useState(null);


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
		<div style={{ paddingLeft: "100px", paddingRight: "100px" }} className="py-5 mx-5 d-flex flex-grow-1 flex-column min-vh-100">
			{showModal && (
				<div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Confirm Delete</h5>
								<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
							</div>
							<div className="modal-body">
								<p>Are you sure you want to delete this contact:   <strong>{selectedContact?.name}</strong>?</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => {
										deleteContacts(selectedContact.id);
										setShowModal(false);
									}}>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{store.contacts.length > 0 ? store.contacts.map((item) => {
				return (

					<div style={{ backgroundColor: "rgba(184, 198, 211, 0.33)" }} className="row  text-black p-3 m-3" key={item.id}>
						<div className="col-3">
							<img className="rounded-circle  " src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a44778ea-3457-40e0-8979-b7e3685d23d0/dfph288-3bd7b361-38d3-4d73-905d-cd36ef012f42.png/v1/fill/w_1195,h_668,q_70,strp/gojo_satoru_x_mobile_legends_8k_wallpaper_by_newjer53_dfph288-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA3NCIsInBhdGgiOiJcL2ZcL2E0NDc3OGVhLTM0NTctNDBlMC04OTc5LWI3ZTM2ODVkMjNkMFwvZGZwaDI4OC0zYmQ3YjM2MS0zOGQzLTRkNzMtOTA1ZC1jZDM2ZWYwMTJmNDIucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.owKC1nlnYRE_vYbc6qX3I-2xeYKqOJjZh--aqiYpffk"
								alt="image"
								style={{ width: "140px", height: "140px", objectFit: "cover" }} />
						</div>
						<div className="col-6">
							<h5>{item.name}</h5>
							<p className="data my-0"><i className="fa-solid fa-mobile-screen-button me-2"></i>{item.phone}</p>
							<p className="data my-0"><i className="fa-solid fa-envelope me-2"></i>{item.email}</p>
							<p className="data my-0"><i className="fa-solid fa-location-dot me-2"></i>{item.address}</p>
						</div>

						<div className="col-3 d-flex justify-content-end align-items-end">
							<Link to="/submit" >
								<button
									onClick={() => {
										dispatch({ type: "set_single_contact", payload: item })
									}}
									className="btn btn-danger"><i className="fa-solid fa-pen-to-square"></i>Edit</button>
							</Link>
							<button
								onClick={() => {
									setSelectedContact(item);
									setShowModal(true);
								}}
								className="btn btn-danger">
								<i className="fas fa-trash-alt"></i>
							</button>

						</div>
					</div>



				)
			}) :
				<div class="d-flex justify-content-center align-items-center min-vh-100">
					<h1 class="text-center">No contacts found</h1>
				</div>
			}

		</div >
	);
}