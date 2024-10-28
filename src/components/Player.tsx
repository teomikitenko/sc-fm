import { useEffect, useState } from "react";
import { Shuffle } from "lucide-react";
import { Pause } from "lucide-react";
import { Play } from "lucide-react";

const Player = ({
  audioRef,
  name,
  setTrackIndex,
  playlistLength,
}: {
  playlistLength: number;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  name: string;
}) => {
  const [volume, setVolume] = useState(0.5);
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);
  const pauseHandler = () => {
    audioRef.current.pause();
    setPaused(true);
  };


  const share = () => {
    // зробити логіку щоб можна було шерити ссилку на апку але з конкретним id плейлиста
    navigator.share();
  };

  const playHandler = () => {
    audioRef.current.play();
    setPaused(false);
  };
  const shuffleHandler = () => {
    const index = Math.floor(Math.random() * playlistLength);
    setTrackIndex(index);
  };
  const volumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVolume(Number(e.currentTarget.value));
    audioRef.current.volume = Number(e.currentTarget.value);
  };
  const copiedName = (name: string) => {
    setCopied(true);
    navigator.clipboard.writeText(name);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="px-5 py-4 max-h-28 sm:px-10 sm:py-6 flex gap-16 w-full">
      <div className="flex w-full justify-between">
        <div className="flex gap-5">
          <Play
            onClick={playHandler}
            className={`fill-primary  min-w-7 min-h-7 sm:w-8 sm:h-8 cursor-pointer  hover:fill-primary ${
              !paused && "opacity-60"
            } hover:opacity-70`}
            strokeWidth={0}
          />
          <Pause
            onClick={pauseHandler}
            className={`fill-primary  min-w-7 min-h-7 sm:w-8 sm:h-8 cursor-pointer ${
              paused && "opacity-60"
            }   hover:fill-primary hover:opacity-70`}
            strokeWidth={0}
          />
          <div className="flex relative w-full justify-center items-center px-3">
            <p
              className={
                copied
                  ? "inline text-primary_foreground absolute left-2 top-[-15px] text-sm font-medium "
                  : "hidden"
              }
            >
              Copied!
            </p>
            <p
              onClick={() => copiedName(name)}
              className="text-secondary hover:text-primary hover:opacity-70 cursor-pointer line-clamp-1 break-words overflow-hidden font-semibold items-center"
            >
              {name}
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <Shuffle
            onClick={shuffleHandler}
            className="fill-primary min-w-7 min-h-7 sm:w-8 sm:h-8 cursor-pointer hover:fill-primary hover:opacity-70"
            strokeWidth={0}
          />
          <input
            className="w-14 sm:w-20"
            onChange={volumeHandler}
            type="range"
            name="volumecontrol"
            min={0}
            max={1}
            step={0.1}
            value={volume}
          />
        </div>
      </div>
    </div>
  );
};
export default Player;
