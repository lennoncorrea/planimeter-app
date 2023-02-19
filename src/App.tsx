import "reflect-metadata";
import "./App.css";
import PlanimeterPage from "./pages/planimeter/planimeter";
import OfflinePage from "./pages/offline/offline";
import { useEffect, useState } from "react";
import isTruthy from "./utils/isTruthy";
import IoCContainer from "./ioc/container/containter";

function App() {
    let [status, setStatus] = useState(false);
    const checkStatus = async () => {
        const url = `${process.env.REACT_APP_API_URL}`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("secret", process.env.REACT_APP_API_SECRET_KEY!);
        let response: Response | undefined;
        try {
            response = await fetch(url, {
                method: "GET",
                headers: headers,
            });
        } catch (e) {}

        return isTruthy(response);
    };

    useEffect(() => {
        const fetchStatus = async () => {
            setStatus(await checkStatus());
        };
        fetchStatus();
    });
    return (
        <div className="App">
            <IoCContainer>
                {status ? <PlanimeterPage /> : <OfflinePage />}
            </IoCContainer>
        </div>
    );
}

export default App;
