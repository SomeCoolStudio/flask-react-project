import Body from "../components/Body"
import LoginForm from "../components/forms/LoginForm"
import BackgroundVideo from "../components/BackgroundVideo"
import Header from "../components/Header"

export default function LandingPage() {
  return (
    <Body sidebar={false}>
        <BackgroundVideo/>
        <Header/>
        <LoginForm />
    </Body>
  )
}
