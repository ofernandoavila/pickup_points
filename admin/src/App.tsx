import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import 'bootstrap/dist/css/bootstrap.min.css';
import PickupPoints from "./pages/PickupPoints";
import Settings from "./pages/Settings";

function App() {
    return (
		<HashRouter>
			<Routes>
				<Route path="/" element={ <Dashboard /> } />
				<Route path="/pickup-points" element={ <PickupPoints /> } />
				<Route path="/settings" element={ <Settings /> } />
			</Routes>
		</HashRouter>
	);
}

export default App;
