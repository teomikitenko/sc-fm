import { useState } from 'react'
import { Shuffle } from 'lucide-react'
import { Pause } from 'lucide-react'
import { Play } from 'lucide-react'

const Player = ({
    audioRef,
    name,
    setTrackIndex,
    playlistLength,
}: {
    playlistLength: number
    setTrackIndex: React.Dispatch<React.SetStateAction<number>>
    audioRef: React.MutableRefObject<HTMLAudioElement>
    name: string
}) => {
    const [volume, setVolume] = useState(0.5)
    const [copied, setCopied] = useState(false)
    const [paused, setPaused] = useState(false)
    const pauseHandler = () => {
        audioRef.current.pause()
        setPaused(true)
    }

    const playHandler = () => {
        audioRef.current.play()
        setPaused(false)
    }
    const shuffleHandler = () => {
        const index = Math.floor(Math.random() * playlistLength)
        setTrackIndex(index)
    }
    const volumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setVolume(Number(e.currentTarget.value))
        audioRef.current.volume = Number(e.currentTarget.value)
    }
    const copiedName = (name: string) => {
        setCopied(true)
        navigator.clipboard.writeText(name)
        setTimeout(() => setCopied(false), 1000)
    }

    return (
        <div className="flex max-h-28 w-full gap-16 px-5 py-4 sm:px-10 sm:py-6">
            <div className="flex w-full justify-between">
                <div className="flex gap-5">
                    <Play
                        onClick={playHandler}
                        className={`min-h-7 min-w-7 cursor-pointer fill-primary hover:fill-primary sm:h-8 sm:w-8 ${
                            !paused && 'opacity-60'
                        } hover:opacity-70`}
                        strokeWidth={0}
                    />
                    <Pause
                        onClick={pauseHandler}
                        className={`min-h-7 min-w-7 cursor-pointer fill-primary sm:h-8 sm:w-8 ${
                            paused && 'opacity-60'
                        } hover:fill-primary hover:opacity-70`}
                        strokeWidth={0}
                    />
                    <div className="relative flex w-full items-center justify-center px-3">
                        <p
                            className={
                                copied
                                    ? 'absolute left-2 top-[-15px] inline text-sm font-medium text-primary_foreground'
                                    : 'hidden'
                            }
                        >
                            Copied!
                        </p>
                        <p
                            onClick={() => copiedName(name)}
                            className="line-clamp-1 cursor-pointer items-center overflow-hidden break-words font-semibold text-secondary hover:text-primary hover:opacity-70"
                        >
                            {name}
                        </p>
                    </div>
                </div>
                <div className="flex gap-6">
                    <Shuffle
                        onClick={shuffleHandler}
                        className="min-h-7 min-w-7 cursor-pointer fill-primary hover:fill-primary hover:opacity-70 sm:h-8 sm:w-8"
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
    )
}
export default Player
