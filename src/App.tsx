import { useEffect, useState, useRef } from "react";
import "./App.css";
import type { Track, AuthToken, UrlResponce, TrackList,StreamUrls } from "../types/types";
import { PLAYLISTS } from "./constants/playlists";

function App() {
  const [playList, setPlaylist] = useState<TrackList | undefined>(undefined);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState<StreamUrls | undefined>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getTrack = async (track_id: string) => {
    const trackReq = await fetch(
      `https://sc-server-seven.vercel.app/track?track_id=${track_id}`
    );
    const trackUrl: StreamUrls = await trackReq.json();
    setCurrentUrl(trackUrl);
  };
  const getPlaylist = async (playlist_id: string) => {
    const playListReq = await fetch(
      `https://sc-server-seven.vercel.app/playlist?playlist_id=${playlist_id}`
    );
    const playList: TrackList = await playListReq.json();
    setPlaylist(playList);
  };

  useEffect(() => {
    if (currentUrl && audioRef) {
      audioRef.current!.play();
    }
  }, [currentUrl, audioRef]);

  useEffect(()=>{
    if(playList){
      const tracks = playList.tracks
      getTrack(tracks[trackIndex].id.toString())
    }
  },[playList])

  const share = ()=>{   // зробити логіку щоб можна було шерити ссилку на апку але з конкретною композицією
    navigator.share()
  }
  return (
    <>
      <div>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            columnGap: "30px",
            gridTemplateRows: "1fr 1fr 1fr",
          }}
        >
          {PLAYLISTS.map((p) => (
            <li key={p.id}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>{p.title}</p>
                <button onClick={async () => await getPlaylist(p.id)}>
                  Play
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button>Share</button>

        <audio ref={audioRef} src={currentUrl?.http_mp3_128_url}></audio>
      </div>
    </>
  );
}

export default App;
