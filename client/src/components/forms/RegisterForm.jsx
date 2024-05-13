import { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";


export default function RegisterForm() {

    const [newUserData, setNewUserData] = useState({});
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.accessToken) navigate('/')
    }, [])


    async function RegisterUserFunction() {
        const res = await fetch("http://127.0.0.1:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserData)
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            toast(`${newUserData.username} Registered!`);
            navigate('/');
        } else console.error("Login Failed")
    }

    function HandleRegisterFormSubmit(e) {
        e.preventDefault();

        if (newUserData.password !== newUserData.confirmPassword) {
            window.alert("Passwords Must Match!");
            return;
        }
        delete newUserData.confirmPassword;
        console.log(newUserData, 'submitted');
        RegisterUserFunction();
    }

    return (
        <Container>

            <form id="text-for-register" action="" onSubmit={HandleRegisterFormSubmit}>
                <h3 className="title">Register To Play!</h3>
                <div id="line_break" ></div>
                <label htmlFor="username"></label>
                <input placeholder="Username" id="margin_bottom" type="text" name="username" value={newUserData.username} onChange={(e) => { setNewUserData({ ...newUserData, username: e.target.value }) }} required /> 
                <div id="line_break" ></div>
                <label htmlFor="email"></label>
                <input placeholder="Email" id="margin_bottom" type="text" name="email" value={newUserData.email} onChange={(e) => { setNewUserData({ ...newUserData, email: e.target.value }) }} required />
                <div id="line_break" ></div>
                <label htmlFor="password"></label>
                <input placeholder="Password" id="margin_bottom" type="password" name="password" value={newUserData.password} onChange={(e) => { setNewUserData({ ...newUserData, password: e.target.value }) }} required />
                <label htmlFor="confirm-password"></label>
                <input placeholder="Confirm-Password" id="margin_bottom" type="password" name="confirm-password" onChange={(e) => { setNewUserData({ ...newUserData, confirmPassword: e.target.value }) }} required /> 
                <div id="line_break" ></div>
                <label htmlFor="first-name"></label>
                <input placeholder="First-Name" id="margin_bottom" type="text" name="first-name" value={newUserData.first_name} onChange={(e) => { setNewUserData({ ...newUserData, first_name: e.target.value }) }} /> 
                <div id="line_break" ></div>
                <label htmlFor="last-name"></label>
                <input placeholder="Last-Name" id="margin_bottom" type="text" name="last-name" value={newUserData.last_name} onChange={(e) => { setNewUserData({ ...newUserData, last_name: e.target.value }) }} />
                <input  as={Link} to='/register' id='register-btn' variant="primary" type="submit" />
            </form>
        </Container>
    )
}

