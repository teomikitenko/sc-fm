import { useEffect, useState, useRef } from "react";
import type { Track, TrackList, StreamUrls } from "../../types/types";
import { PLAYLISTS } from "../constants/playlists";
import useVisualAudio from "../hooks/useVisualAudio";
import Player from "./Player";

function Main() {
  const [playList, setPlaylist] = useState<TrackList | undefined>(undefined);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState<StreamUrls | undefined>();
  const [currentTime, setCurrentTime] = useState("00:00");
  const [totalTime, setTotalTime] = useState("00:00");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const serverUrl = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://sc-server-seven.vercel.app";
  useVisualAudio(audioRef.current, canvasRef.current);

  const getTrack = async (track_id: string) => {
    const trackReq = await fetch(`${serverUrl}/track?track_id=${track_id}`);
    const trackUrl: StreamUrls = await trackReq.json();
    setCurrentUrl(trackUrl);
  };
  const getPlaylist = async (playlist_id: string) => {
    setTrackIndex(0);
    const playListReq = await fetch(
      `${serverUrl}/playlist?playlist_id=${playlist_id}`
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
      audioRef.current.addEventListener("canplay", () => {
        const totalTime = formatTime(audioRef.current.duration);
        setTotalTime(totalTime);
      });
      audioRef.current.addEventListener("timeupdate", () => {
        const currentTime = formatTime(audioRef.current.currentTime);
        if (
          "mediaSession" in navigator &&
          navigator.mediaSession.setPositionState
        ) {
          navigator.mediaSession.setPositionState({
            duration: audioRef.current.duration,
            position:audioRef.current.currentTime
          });
        }
        setCurrentTime(currentTime);
      });
    }
  }, [currentUrl, audioRef]);

  useEffect(() => {
    if (playList && trackIndex >= 0) {
      const tracks = playList.tracks;
      getTrack(tracks[trackIndex].id.toString());
      if ("mediaSession" in navigator && playList) {
        //experem api
        navigator.mediaSession.metadata = new MediaMetadata({
          title: tracks[trackIndex].title.split("-")[0],
          artist: tracks[trackIndex].title.split("-")[1],
        });
      }
    }
  }, [playList, trackIndex]);

  const formatTime = (time: number) => {
    const date = new Date(0);
    date.setSeconds(time);

    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="flex flex-col bg-foreground min-h-screen min-w-[300px]:min-w-[300px]">
      <div className="pt-14 pb-6 px-6 flex-auto relative z-30">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 sm:grid-rows-3">
          {PLAYLISTS.map((p) => (
            <li key={p.id}>
              <div className="flex flex-col">
                <button onClick={async () => await getPlaylist(p.id)}>
                  <p className="text-secondary font-semibold hover:text-primary">
                    {p.title}
                  </p>
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
        <p className="text-secondary absolute bottom-3">
          {currentTime}/{totalTime}
        </p>
      </div>
      <canvas
        className="absolute z-10 bottom-16 sm:bottom-20 w-full h-56 opacity-55"
        ref={canvasRef}
      ></canvas>
      {audioRef && (
        <Player
          playlistLength={playList ? playList.tracks.length : 0}
          setTrackIndex={setTrackIndex}
          audioRef={audioRef}
          name={playList ? playList.tracks[trackIndex].title : " "}
        />
      )}
    </div>
  );
}

export default Main;
