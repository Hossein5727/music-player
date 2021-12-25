import React from 'react'

function Audio({ item, setBackGround, classes, audioRef }) {
    return (
        <div key={item.id} className='flex justify-center items-center flex-col p-2'>
            <audio
                src={item.src}
                controls
                className={classes.audio}
                ref={audioRef}
                loop
            />
            <img
                src={item.srcImage}
                className='w-36 h-36 border-2 border-orange-500 border-solid rounded-full mb-6 shadow-slate-100 shadow-2xl'
                alt={item.title}
                onLoad={() => setBackGround(item.srcImage)}
            />
            <h1 className='text-5xl text-center text-white'>{item.title}</h1>
        </div>
    )
}

export default Audio
