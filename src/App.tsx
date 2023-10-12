import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameLobby from "./GameLobby";
import PlayerDashboardLobby from "./Player/PlayerDashboardLobby";
import PlayerDashboardInGame from "./Player/PlayerDashboardInGame";
import NarratorDashboardLobby from "./Narrator/NarratorDashboardLobby";
import NarratorDashboardInGame from "./Narrator/NarratorDashboardInGame";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameLobby />} />
        <Route path="/player-dashboard-lobby" element={<PlayerDashboardLobby />} />
        <Route path="/player-dashboard-in-game" element={<PlayerDashboardInGame />} />
        <Route path="/narrator-dashboard-lobby" element={<NarratorDashboardLobby />} />
        <Route path="/narrator-dashboard-in-game" element={<NarratorDashboardInGame />} />
      </Routes>
    </Router>
  );
}

export default App;
