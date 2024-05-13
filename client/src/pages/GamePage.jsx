import Body from "../components/Body";
import StickyTopHeader from "../components/StickyTopHeader";
import GamePageHeader from "../components/GamePageHeader";
import UnityWebGL from "../components/UnityWebGL";
import GamePageBG from "../components/GamePageBG";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GamePage() {

  const { user, setUser } = useContext(UserContext)

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.accessToken) navigate('/')
  }, [])

  return (
    <Body sidebar={false}>
        {/* <StickyTopHeader /> */}
        {/* <GamePageHeader /> */}
        <GamePageBG />
        <UnityWebGL />
    </Body>
  )
}
