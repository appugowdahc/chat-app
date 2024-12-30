
  import './App.css';
  import {Routes,Route} from 'react-router-dom'
  import HomePage from './pages/HomePage';
  import ChatPage from './pages/ChatPage';
  function App() {
    return (
      <div className="App">
        <Routes>
          <Route path='/' Component={HomePage}></Route>
          <Route path='/user/chat' Component={ChatPage}></Route>
        </Routes>
      </div>
    );
  }

  export default App;
