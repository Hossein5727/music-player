import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Fab, Slider } from '@mui/material'
import classes from './AudioPlayerStyles.module.css'
import { HiVolumeUp } from 'react-icons/hi'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import tnt from '../music/TNT2.mp3'
import eshgh from '../music/EshghAst.mp3'
import haabil from '../music/Haabil.mp3'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import Audio from './Audio'

const songs = [
    { id: 1, src: tnt, srcImage: "https://remixam.ir/wp-content/uploads/2021/10/photo_2021-10-19_01-27-25-300x300.jpg", title: "TNT" },
    { id: 2, src: eshgh, srcImage: "https://rasaneh3.ir/wp-content/uploads/2021/06/IMG_20210629_210112_564.jpg", title: "Ehsgh Ast" },
    { id: 3, src: haabil, srcImage: "https://leymermusic.ir/wp-content/uploads/2021/10/Reza%20Pishro%20-%20Qabil.jpg.webp", title: "Haabil" },
]

function AudioPlayer() {

    const [isPlay, setIsPlay] = useState(false);
    const audioRef = useRef();
    const progressBar = useRef()
    const animationRef = useRef();
    const [nextMusic, setNextMusic] = useState(1)
    const [backGround, setBackGround] = useState("")
    const [timeLine, setTimeLine] = useState()
    const [duration, setDuration] = useState(0);


    const playHandler = () => {
        console.log(audioRef.current.currentTime);
        if (!isPlay) {
            audioRef.current.play()
            setIsPlay(true)
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        if (isPlay) {
            audioRef.current.pause()
            setIsPlay(false)
            cancelAnimationFrame(animationRef.current);
        }
    }

    const nextSong = () => {
        if (nextMusic === songs.length) {
            setNextMusic(1)
        } else {
            setNextMusic(nextMusic + 1)
        }
    }

    const prevSong = () => {
        if (nextMusic > 1) setNextMusic(nextMusic - 1)
    }


    const whilePlaying = () => {
        progressBar.current.value = audioRef.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioRef.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setTimeLine(progressBar.current.value);
    }


    useEffect(() => {
        // if (audioRef.current, timeLine) {
        //     progressBar.current.value = audioRef.current.currentTime
        //     audioRef.current.currentTime = timeLine
        //     // setTimeLine(audioRef.current.currentTime)
        //     console.log(progressBar.current.value);
        // }
        if (progressBar.current) {
            const seconds = Math.floor(audioRef.current.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
        }
    }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

    return (
        <Container maxWidth="xs" className={classes.container} style={{
            background: backGround && `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.9)) ,url(${backGround})`,
        }}>

            {
                songs.filter(item => item.id === nextMusic).map((item) => {
                    return (
                        <Audio
                            audioRef={audioRef}
                            classes={classes}
                            item={item}
                            setBackGround={setBackGround}
                            key={item.id}
                        />
                    )
                })
            }

            < div className='flex justify-evenly items-center mt-24 w-64 m-auto' >
                <MdSkipPrevious
                    className='text-4xl text-white cursor-pointer'
                    onClick={() => {
                        prevSong()
                        setIsPlay(false)
                    }} />
                <button onClick={playHandler} className={classes.playBtn}>
                    {!isPlay ? <BsFillPlayFill className='ml-1' /> : <BsPauseFill className='' />}
                </button>
                <MdSkipNext
                    className='text-4xl text-white cursor-pointer'
                    onClick={() => {
                        nextSong()
                        setIsPlay(false)
                    }} />
            </div >
            {audioRef.current && (
                <input
                    type="range"
                    ref={progressBar}
                    defaultValue={0}
                    onChange={changeRange}
                />
            )}
            <h1 className='mt-8 text-purple-600 text-2xl text-center'>By Ho3ein Ghiasi</h1>
        </Container >
    )
}

export default AudioPlayer
