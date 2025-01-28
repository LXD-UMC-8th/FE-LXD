import SessionPage from "./pages/Main/SessionPage";
import ScorePage from "./pages/Main/ScorePage";
import HarmonyPage from "./pages/Main/HarmonyPage";
import HomePage from "./pages/Main/HomePage";
import Result_HarmonyPage from "./pages/Main/Result_HarmonyPage";
import Result_ScorePage from "./pages/Main/Result_ScorePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/harmony" element={<HarmonyPage />} />
          <Route path="/harmony/result_harmony" element={<Result_HarmonyPage />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/score/result_score" element={<Result_ScorePage />} />
        </Routes>
    </Router>
  );
};

export default App;


/* 마이페이지
import './App.css'
import Mypagehold from'./pages/Mypagehold.jsx';
import MPYharmony from './pages/MPYharmony.jsx';
import MPYsession from './pages/MPYsession.jsx';
import MPYnote from './pages/MPYnote.jsx';
import MPYsearch from './pages/MPYsearch.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Mypagehold/>} />
          <Route path="/mypageharmony" element={<MPYharmony/>} />
          <Route path="/mypagesession" element={<MPYsession/>} />
          <Route path="/mypagenote" element={<MPYnote/>} />
          <Route path="/mypagesearch" element={<MPYsearch/>} />



          
        </Routes>
    </Router>
  )
}

export default App;
*/ 