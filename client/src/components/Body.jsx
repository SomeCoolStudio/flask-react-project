import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Sidebar from "./Sidebar";


export default function Body({ sidebar, children }) {
    return (
        <Container>
            {sidebar && <Sidebar />}
            {children}
        </Container>
    )
}
