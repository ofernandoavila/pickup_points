import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import PickupPoints from "./pages/PickupPoints";
import Settings from "./pages/Settings";
import ModalContextProvider from "./components/modal/ModalContext";
import GlobalContextProvider from "./contexts/GlobalContext";

function App() {
    return (
        <GlobalContextProvider>
            <ModalContextProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            path="/pickup-points"
                            element={<PickupPoints />}
                        />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </HashRouter>
            </ModalContextProvider>
        </GlobalContextProvider>
    );
}

export default App;
