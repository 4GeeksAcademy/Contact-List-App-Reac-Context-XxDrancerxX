import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<nav className="navbar" style={{ backgroundColor: " #dce9f5" }}>
			<div className="container-fluid">
				<div className="d-flex justify-content-center flex-grow-1">
					<h1 className="navbar-brand ">Contacts</h1>
				</div>
				<div className="ms-auto">
					<Link to="/submit">
						<button onClick={() => {
							let emptyContact = {
								name: "",
								email: "",
								phone: "",
								address: ""
							}
							dispatch({ type: "set_single_contact", payload: emptyContact })
						}}
							className="btn btn-primary">Add a new Contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};


