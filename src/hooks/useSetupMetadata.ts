import { useEffect } from 'react'

import type { TrackList } from '../../types/types'

const useSetupMetadata = (playList: TrackList, trackIndex: number) => {
    useEffect(() => {
        if ('mediaSession' in navigator && playList) {
            const tracks = playList.tracks
            navigator.mediaSession.metadata = new MediaMetadata({
                title: tracks[trackIndex].title.split('-')[1],
                artist: tracks[trackIndex].title.split('-')[0],
                album: tracks[trackIndex].label_name,
                artwork: [
                    {
                        src: tracks[trackIndex].artwork_url.replace(
                            '-large',
                            '-t100x100'
                        ),
                        sizes: '96x96',
                    },
                    {
                        src: tracks[trackIndex].artwork_url.replace(
                            '-large',
                            '-t200x200'
                        ),
                        sizes: '128x128',
                    },
                    {
                        src: tracks[trackIndex].artwork_url.replace(
                            '-large',
                            '-t300x300'
                        ),
                        sizes: '384x384',
                    },
                    {
                        src: tracks[trackIndex].artwork_url.replace(
                            '-large',
                            '-t500x500'
                        ),
                        sizes: '512x512',
                    },
                ],
            })
        }
    }, [playList, trackIndex])
}
export default useSetupMetadata
