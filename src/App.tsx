/* import { useState } from "react";
 */ import "./App.css";
/* import SC from 'soundcloud' */

//var SC = require('soundcloud');

function App() {
  //const [count, setCount] = useState(0);
  const getPlaylists = async () => {
    fetch(
      "https://secure.soundcloud.com/authorize?client_id=5xP6vJj22M5hgD6GIEsszTFtbPJsU4zY&redirect_uri=http://localhost:5173",
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    ).then((res) => console.log(res));
  };
  return (
    <>
      <button onClick={getPlaylists}>Load Playlists</button>
    </>
  );
}

export default App;
