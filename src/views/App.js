import { BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom'; 
import './App.scss';
import NewPage from './pages/NewPage/NewPage';


function App() {
  return (
    <Router>
            <div>
		<Routes>
                <Route path="/New" element={NewPage} />
		</Routes>
		<Link to="/New">Trang mới</Link>
		<h1>Hâhha</h1>
            </div>
        </Router>

  );
}

export default App;
