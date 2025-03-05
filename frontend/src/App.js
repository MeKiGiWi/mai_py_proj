import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// frontend/src/App.js

function App() {
  useEffect(() => {
    axios.get('/api/hello/')
      .then(response => console.log(response.data))
      .catch(error => console.error('Ошибка:', error));
  }, []);

  return <div>Проверка интеграции</div>;
}

export default App;
