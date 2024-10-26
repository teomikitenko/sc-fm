import { useEffect, useState, useRef } from "react";
import type { Track, TrackList, StreamUrls } from "../../types/types";
import { PLAYLISTS } from "../constants/playlists";
import useVisualAudio from "../hooks/useVisualAudio";
import Player from "./Player";

function Main() {
  const [playList, setPlaylist] = useState<TrackList | undefined>(undefined);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState<StreamUrls | undefined>();
  const [currentDuration, setCurrentDuration] = useState<string>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useVisualAudio(audioRef.current, canvasRef.current);

  const getTrack = async (track_id: string) => {
    const trackReq = await fetch(
      `${import.meta.env.VITE_SC_URL}/track?track_id=${track_id}`
    );
    const trackUrl: StreamUrls = await trackReq.json();
    setCurrentUrl(trackUrl);
  };
  const getPlaylist = async (playlist_id: string) => {
    setTrackIndex(0);
    const playListReq = await fetch(
      `${import.meta.env.VITE_SC_URL}/playlist?playlist_id=${playlist_id}`
    );
    const playList: TrackList = await playListReq.json();
    setPlaylist(playList);
  };

  useEffect(() => {
    if (currentUrl && audioRef) {
      audioRef.current!.play();
      audioRef.current.volume = 0.5;
      audioRef.current.addEventListener("ended", () => {
        setTrackIndex((i) => i + 1);
      });
    }
  }, [currentUrl, audioRef]);

  useEffect(() => {
    if (playList && trackIndex >= 0) {
      const tracks = playList.tracks;
      getTrack(tracks[trackIndex].id.toString());
    }
  }, [playList, trackIndex]);

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
    <div className="flex flex-col bg-foreground min-h-screen min-w-[460px]">
      <div className="pt-14 pb-6 px-6 flex-auto relative z-30">
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

        <audio
          ref={audioRef}
          crossOrigin="anonymous"
          src={currentUrl?.http_mp3_128_url}
        ></audio>
      </div>
      <canvas
        className="fixed z-10 bottom-16 sm:bottom-20 w-full h-56 opacity-55"
        ref={canvasRef}
      ></canvas>
      {audioRef && (
        <Player
          audioRef={audioRef}
          name={playList ? playList.tracks[trackIndex].title : " "}
        />
      )}
    </div>
  );
}

export default Main;
