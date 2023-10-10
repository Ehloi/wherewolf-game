import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameLobby from './GameLobby';
import PlayerDashboard from './PlayerDashboard';
import NarratorDashboard from './NarratorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameLobby />} />
        <Route path="/player-dashboard" element={<PlayerDashboard />} />
        <Route path="/narrator-dashboard" element={<NarratorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
