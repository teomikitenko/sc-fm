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
  const [currentDuration, setCurrentDuration] = useState<string>("00:00");
  useEffect(() => {
    if (audioRef) {
      audioRef.current.addEventListener("timeupdate", () => {
        const date = new Date(0);
        date.setSeconds(audioRef.current.currentTime);
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        setCurrentDuration(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      });
    }
  }, [audioRef]);

  return (
    <div className="border-t border-secondary px-8 py-6 flex gap-16">
      <div>
        <p className="text-secondary">{name}</p>
        <p className="text-secondary">{currentDuration}</p>
      </div>

      <div className="flex gap-3">
        <Play size={33} className="fill-primary" />
        <Pause size={33} className="fill-primary" />
      </div>
    </div>
  );
};
export default Player;
