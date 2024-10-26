import { useEffect, useState } from "react";
import { Pause } from "lucide-react";
import { Play } from "lucide-react";

const Player = ({
  audioRef,
  name,
}: {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  name: string;
}) => {
  const [volume, setVolume] = useState(0.5);

  const pauseHandler = () => {
    audioRef.current.pause();
  };
  const share = () => {
    // зробити логіку щоб можна було шерити ссилку на апку але з конкретним id плейлиста
    navigator.share();
  };

  const playHandler = () => {
    audioRef.current.play();
  };
  const volumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVolume(Number(e.currentTarget.value));
    audioRef.current.volume = Number(e.currentTarget.value);
  };

  return (
    <div className="px-5 py-4 max-h-28 sm:px-10 sm:py-6 flex gap-16">
      <div className="flex w-full justify-between">
        <div className="flex gap-5">
          <Play
            
            onClick={playHandler}
            size={32}
            className="fill-primary min-w-8"
            strokeWidth={0}
          />
          <Pause
            onClick={pauseHandler}
            size={32}
            className="fill-primary min-w-8"
            strokeWidth={0}
          />
          <div className="flex w-full justify-center items-center px-3">
            <p className="text-secondary line-clamp-1 break-words overflow-hidden font-semibold items-center">
              {name}
            </p>
          </div>
        </div>
        <input
          onChange={volumeHandler}
          className="appearance-none"
          type="range"
          name="volumecontrol"
          min={0}
          max={1}
          step={0.1}
          value={volume}
        />
      </div>
    </div>
  );
};
export default Player;
