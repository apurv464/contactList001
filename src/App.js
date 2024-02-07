import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const promise = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/users/')
                .then((response) => response.json())
                .then((json) => {
                    return json.map((contact) => ({
                        id: contact.id,
                        name: contact.name,
                        number: contact.phone,
                        email: contact.email
                    }));
                });
            dispatch({ type: 'FETCH_CONTACTS', payload: data });
        };
        promise();
    }, [dispatch]);

    return (
        <div className="App">
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/add" element={<AddContact />} />
                <Route path="/edit/:id" element={<EditContact />} />
            </Routes>
        </div>
    );
}

export default App;