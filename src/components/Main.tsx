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
  const handleEndTrack = () => {
    setTrackIndex((i) => i + 1);
  };
  const addTotalTime = () => {
    const totalTime = formatTime(audioRef.current.duration);
    setTotalTime(totalTime);
  };
  const handleTimeUpdate = () => {
    const updatedTime = formatTime(audioRef.current.duration);
    setCurrentTime(updatedTime);
  };

  useEffect(() => {
    if (currentUrl && audioRef) {
      audioRef.current!.play();
      audioRef.current.volume = 0.5;
      audioRef.current.addEventListener("ended", handleEndTrack);
      audioRef.current.addEventListener("canplay", addTotalTime);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      audioRef.current.removeEventListener("ended", handleEndTrack);
      audioRef.current.removeEventListener("canplay", addTotalTime);
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentUrl, audioRef]);

  useEffect(() => {
    if (playList && trackIndex >= 0) {
      const tracks = playList.tracks;
       
      getTrack(tracks[trackIndex].id.toString());
      if ("mediaSession" in navigator && playList) {
        //experem api
        const images = tracks[trackIndex].artwork_url

        navigator.mediaSession.metadata = new MediaMetadata({
          title: tracks[trackIndex].title.split("-")[1],
          artist: tracks[trackIndex].title.split("-")[0],
          album: tracks[trackIndex].label_name,
          artwork:  [
            {
              src: 'https://i1.sndcdn.com/artworks-vjSTwZLhlgbh0Rc7-nEdtqA-large.jpg',
              sizes: "96x96",
              type: "image/jpg",
            },
            {
              src: 'https://i1.sndcdn.com/artworks-vjSTwZLhlgbh0Rc7-nEdtqA-large.jpg',
              sizes: "128x128",
              type: "image/jpeg",
            },
            {
              src: 'https://i1.sndcdn.com/artworks-vjSTwZLhlgbh0Rc7-nEdtqA-large.jpg',
              sizes: "192x192",
              type: "image/jpg",
            },
            {
              src: 'https://i1.sndcdn.com/artworks-vjSTwZLhlgbh0Rc7-nEdtqA-large.jpg',
              sizes: "256x256",
              type: "image/jpg",
            },
            {
              src: 'https://i1.sndcdn.com/artworks-vjSTwZLhlgbh0Rc7-nEdtqA-large.jpg',
              sizes: "384x384",
              type: "image/jpg",
            },
            {
              src: 'https://i1.sndcdn.com/artworks-vjSTwZLhlgbh0Rc7-nEdtqA-large.jpg',
              sizes: "512x512",
              type: "image/jpg",
            },
          ]
        });
        console.log("Media session metadata set:", navigator.mediaSession.metadata);
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
