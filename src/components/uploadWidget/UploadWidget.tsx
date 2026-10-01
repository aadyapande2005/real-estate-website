import { createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext<{ loaded: boolean }>({ loaded: false });

function UploadWidget<T extends string[] | string | null | undefined>({ uwConfig, setState }: { uwConfig: Record<string, unknown>; setState: Dispatch<SetStateAction<T>> }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            const secureUrl = result.info?.secure_url;
            if (secureUrl) setState((prev) => (Array.isArray(prev) ? [...prev, secureUrl] : secureUrl) as T);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener("click", () => myWidget.open(), false);
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };