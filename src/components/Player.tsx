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
  const volumeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault()
  setVolume(Number(e.currentTarget.value))
  audioRef.current.volume = Number(e.currentTarget.value)
  };

  return (
    <div className="px-10 py-6 flex gap-16">
      <div className="flex w-full justify-between">
      <div className="flex gap-5">
        <Play
          onClick={playHandler}
          size={33}
          className="fill-primary"
          strokeWidth={0}
        />
        <Pause
          onClick={pauseHandler}
          size={33}
          className="fill-primary"
          strokeWidth={0}
        />
         <p className="text-secondary font-semibold flex items-center">{name}</p>
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
