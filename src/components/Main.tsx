import { useEffect, useRef, useState } from 'react'

import type { StreamUrls, TrackList } from '../../types/types'
import { PLAYLISTS } from '../constants/playlists'
import useAudioUpdate from '../hooks/useAudioUpdate'
import useSetupMetadata from '../hooks/useSetupMetadata'
import useVisualAudio from '../hooks/useVisualAudio'
import Player from './Player'

function Main() {
    const [playList, setPlaylist] = useState<TrackList | undefined>(undefined)
    const [trackIndex, setTrackIndex] = useState(0)
    const [currentUrl, setCurrentUrl] = useState<StreamUrls | undefined>()
    const [currentTime, setCurrentTime] = useState('00:00')
    const [totalTime, setTotalTime] = useState('00:00')

    const audioRef = useRef<HTMLAudioElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const serverUrl = import.meta.env.VITE_SC_URL
    useVisualAudio(audioRef.current, canvasRef.current)
    useSetupMetadata(playList, trackIndex)
    useAudioUpdate(
        audioRef,
        currentUrl,
        setTrackIndex,
        setTotalTime,
        setCurrentTime
    )

    const getTrack = async (track_id: string) => {
        const trackReq = await fetch(`${serverUrl}/track?track_id=${track_id}`)
        const trackUrl: StreamUrls = await trackReq.json()
        setCurrentUrl(trackUrl)
    }
    const getPlaylist = async (playlist_id: string) => {
        setTrackIndex(0)
        const playListReq = await fetch(
            `${serverUrl}/playlist?playlist_id=${playlist_id}`
        )
        const playList: TrackList = await playListReq.json()
        setPlaylist(playList)
    }

    useEffect(() => {
        if (playList && trackIndex >= 0) {
            const tracks = playList.tracks
            getTrack(tracks[trackIndex].id.toString())
        }
    }, [playList, trackIndex])
    return (
        <div className="min-w-[300px]:min-w-[300px] flex min-h-screen flex-col bg-foreground">
            <div className="relative z-30 flex-auto px-6 pb-6 pt-14">
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:grid-rows-3 sm:gap-5">
                    {PLAYLISTS.map((p) => (
                        <li key={p.id}>
                            <div className="flex flex-col">
                                <button
                                    onClick={async () =>
                                        await getPlaylist(p.id)
                                    }
                                >
                                    <p className="font-semibold text-secondary hover:text-primary">
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
                <p className="absolute bottom-3 text-secondary">
                    {currentTime}/{totalTime}
                </p>
            </div>
            <canvas
                className="absolute bottom-16 z-10 h-56 w-full opacity-55 sm:bottom-20"
                ref={canvasRef}
            ></canvas>
            {audioRef && (
                <Player
                    playlistLength={playList ? playList.tracks.length : 0}
                    setTrackIndex={setTrackIndex}
                    audioRef={audioRef}
                    name={playList ? playList.tracks[trackIndex].title : ' '}
                />
            )}
        </div>
    )
}

export default Main
