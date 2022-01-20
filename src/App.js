import logo from './logo.svg';
import './App.css';
import MessageList from './MessageList';

function App() {
  return (
    <div className="App">
      <h1>Guild Chat</h1>
      <header className="App-header">
       <MessageList />
      </header>
    </div>
  );
}

export default App;
