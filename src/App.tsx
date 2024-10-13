 import { useEffect, useState } from "react";
 import "./App.css";
/* import SC from 'soundcloud' */

//var SC = require('soundcloud');

function App() {
  const [track, setTrack] = useState<Response|undefined>();
  const getTrack = async () => {
    fetch("https://api.soundcloud.com/tracks/1904730203/stream", {
      headers: {
        Authorization: "OAuth 2-297539--hEoQM6Re2yEKbs59HgxpXB2",
        "Cache-control": "no-cache",
        Accept: "application/json; charset=utf-8",
      },
    }).then(res=>setTrack(res))
  };

useEffect(()=>{
  if(track){
    console.log(track)
  }
},[track])


  return (
    <>
      <button onClick={getTrack}>Load Track</button>
    </>
  );
}

export default App;
