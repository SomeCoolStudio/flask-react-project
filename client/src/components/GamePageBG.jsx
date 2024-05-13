
import ArcadeBorder from "../images/ArcadeBorder.png";

export default function GamePageBG() {
  return (
    <div className="ArcadeMachineImage">
      <style>{'body { background-color: black; }'}</style>
      <img src={ArcadeBorder}  style={{height: 1080, width: 1920,}}/>
    </div>
  )
}
