import { useEffect, useState, useRef } from "react";
import type { Track, TrackList, StreamUrls } from "../../types/types";
import { PLAYLISTS } from "../constants/playlists";
import Player from "./Player";

function Main() {
  const [playList, setPlaylist] = useState<TrackList | undefined>(undefined);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState<StreamUrls | undefined>();
  const [currentDuration, setCurrentDuration] = useState<string>();
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
      audioRef.current.addEventListener("ended", () => {
        setTrackIndex((i) => i + 1);
      });
      /*    audioRef.current.addEventListener("timeupdate", () => {
        const date = new Date(0);
        date.setSeconds(audioRef.current.currentTime);
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        setCurrentDuration(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      }); */
    }
  }, [currentUrl, audioRef]);

  useEffect(() => {
    if (playList && trackIndex >= 0) {
      const tracks = playList.tracks;
      getTrack(tracks[trackIndex].id.toString());
    }
  }, [playList, trackIndex]);

  const share = () => {
    // зробити логіку щоб можна було шерити ссилку на апку але з конкретним id плейлиста
    navigator.share();
  };

  const pauseHandler = () => {
    audioRef.current.pause();
  };

  const playHandler = () => {
    audioRef.current.play();
  };
  const totalTrackDuration = () => {
    const duration = playList.tracks[trackIndex].duration;
    const date = new Date(0);
    date.setMilliseconds(duration);

    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDuration = (duration: number) => {
    const date = new Date(0);
    date.setMilliseconds(duration);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col bg-foreground min-h-screen">
      <div className="pt-14 pb-6 px-6 grow">
        <ul className="grid grid-cols-3 gap-5 grid-rows-3">
          {PLAYLISTS.map((p) => (
            <li key={p.id}>
              <div className="flex flex-col">
                <button onClick={async () => await getPlaylist(p.id)}>
                  <p className="text-secondary font-semibold">{p.title}</p>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button>Share</button>

        <audio ref={audioRef} src={currentUrl?.http_mp3_128_url}></audio>
      </div>
      {audioRef && (
        <Player
          audioRef={audioRef}
          name={ playList ? playList.tracks[trackIndex].label_name : ' '}
        />
      )}
    </div>
  );
}

export default Main;
