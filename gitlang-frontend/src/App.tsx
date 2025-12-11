import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import AddWordPage from "./pages/AddWordPage/AddWordPage";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/add-word" element={<AddWordPage />} />
			</Routes>
		</Router>
	);
}

export default App;
