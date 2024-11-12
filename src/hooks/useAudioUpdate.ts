import { useEffect } from 'react'

import type { StreamUrls } from '../../types/types'

const useAudioUpdate = (
    audioRef: React.MutableRefObject<HTMLAudioElement>,
    currentUrl: StreamUrls | undefined,
    setTrackIndex: React.Dispatch<React.SetStateAction<number>>,
    setTotalTime: React.Dispatch<React.SetStateAction<string>>,
    setCurrentTime: React.Dispatch<React.SetStateAction<string>>
) => {
    const handleEndTrack = () => {
        setTrackIndex((i) => i + 1)
    }

    const addTotalTime = () => {
        const totalTime = formatTime(audioRef.current.duration)
        setTotalTime(totalTime)
    }

    const handleTimeUpdate = () => {
        const updatedTime = formatTime(audioRef.current.currentTime)
        setCurrentTime(updatedTime)
    }
    const formatTime = (time: number) => {
        const date = new Date(0)
        date.setSeconds(time)

        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
    }

    useEffect(() => {
        if (currentUrl && audioRef) {
            console.log('play')
            audioRef.current!.play()
            audioRef.current.volume = 0.5
            audioRef.current.addEventListener('ended', handleEndTrack)
            audioRef.current.addEventListener('canplay', addTotalTime)
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
        }
        return () => {
            audioRef.current.removeEventListener('ended', handleEndTrack)
            audioRef.current.removeEventListener('canplay', addTotalTime)
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [currentUrl, audioRef])
}
export default useAudioUpdate
