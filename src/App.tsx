import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetHomePage } from './pages/PetHomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Tu HU es la página principal por ahora */}
        <Route path="/" element={<PetHomePage/>} />
        
        {/* Cuando tu compa termine el login, él solo vendrá y hará esto: */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
