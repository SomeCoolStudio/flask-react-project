import { useState } from "react";
import Container from "react-bootstrap/esm/Container";


export default function RegisterForm() {

    const [user, setUser] = useState({});

    async function RegisterUserFunction(){
        const res = await fetch("http://127.0.0.1:5000/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (res.ok){
            const data = await res.json();
            console.log(data);
        }else console.error("Login Failed")
    }

    function HandleRegisterFormSubmit(e){
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            window.alert("Passwords Must Match!");
            return;
        }
        delete user.confirmPassword;
        console.log(user, 'submitted');
        RegisterUserFunction();
    }

    return (
        <Container>
            <h3>Register</h3>
            <form action="" onSubmit={HandleRegisterFormSubmit}>
                <label htmlFor="username">Username</label><br />
                <input type="text" name="username" value={user.username} onChange={(e) => { setUser ({ ...user, username:e.target.value }) }} required/> <br />
                <label htmlFor="email">Email</label><br />
                <input type="text" name="email" value={user.email} onChange={(e) => { setUser ({ ...user, email:e.target.value }) }} required/> <br />
                <label htmlFor="password">Password</label><br />
                <input type="password" name="password" value={user.password} onChange={(e) => { setUser ({ ...user, password:e.target.value }) }} required/> <br />
                <label htmlFor="confirm-password">Confirm-Password</label><br />
                <input type="password" name="confirm-password" onChange={(e) => { setUser ({ ...user, confirmPassword:e.target.value }) }} required/> <br />
                <label htmlFor="first-name">First-Name</label><br />
                <input type="text" name="first-name" value={user.first_name} onChange={(e) => { setUser ({ ...user, first_name:e.target.value }) }} /> <br />
                <label htmlFor="last-name">Last-Name</label><br />
                <input type="text" name="last-name" value={user.last_name} onChange={(e) => { setUser ({ ...user, last_name:e.target.value }) }} /> <br />
                <input type="submit" name="register" value="Register"/>
            </form>
        </Container>
    )
}

