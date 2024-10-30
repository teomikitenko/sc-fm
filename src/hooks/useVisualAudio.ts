import { useEffect, useState } from 'react'

const useVisualAudio = (
    audioRef: HTMLAudioElement | null,
    canvasRef: HTMLCanvasElement | null
) => {
    const [audioContext, setAudioContext] = useState<AudioContext | undefined>()
    useEffect(() => {
        if (canvasRef && audioRef) {
            const audioCtx = new window.AudioContext()
            setAudioContext(audioCtx)

            const ctx = canvasRef.getContext('2d')

            let audioSource = null
            let analyser: any = null

            audioSource = audioCtx.createMediaElementSource(audioRef)
            analyser = audioCtx.createAnalyser()
            audioSource.connect(analyser)
            analyser.connect(audioCtx.destination)
            analyser.fftSize = 2048
            const bufferLength = analyser.frequencyBinCount
            const dataArray = new Uint8Array(bufferLength)
            const barWidth = canvasRef.width / bufferLength + 0.2
            let barHeight

            let x = 0
            function animate() {
                x = 0
                ctx!.clearRect(0, 0, canvasRef!.width, canvasRef!.height)
                if (analyser) {
                    analyser.getByteFrequencyData(dataArray)
                    for (let i = 0; i < bufferLength; i++) {
                        barHeight = dataArray[i] * 0.5
                        ctx!.fillStyle = 'hsl(0 72.2% 50.6%)'
                        ctx!.fillRect(
                            x,
                            canvasRef!.height - barHeight,
                            barWidth,
                            barHeight
                        )
                        x += barWidth
                    }
                }
                requestAnimationFrame(animate)
            }
            animate()
        }
    }, [audioRef, canvasRef])
    return {
        audioContext,
    }
}
export default useVisualAudio
