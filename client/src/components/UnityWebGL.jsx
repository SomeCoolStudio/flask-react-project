
import { Unity, useUnityContext } from "react-unity-webgl";


export default function UnityWebGL() {

  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/assets/WebGL.loader.js",
    dataUrl: "/assets/WebGL.data",
    frameworkUrl: "/assets/WebGL.framework.js",
    codeUrl: "/assets/WebGL.wasm",
  });

  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

  function StopSelect(e) {
    e.preventDefault();

  }

  return (
    <div className="container" onClick={StopSelect}>
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Unity className="unity WebGL" unityProvider={unityProvider} />
    </div>
  );
}
