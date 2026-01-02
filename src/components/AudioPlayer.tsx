"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title?: string;
  showVideo?: boolean;
};

function formatTime(sec: number) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function AudioPlayer({ src, title, showVideo = false }: Props) {
  const audioRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => setIsPlaying(false);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      try {
        await a.play();
      } catch (e) {
        console.error(e);
      }
    } else {
      a.pause();
    }
  };

  const seek = (delta: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.currentTime + delta, duration || a.duration || 0));
  };

  const onScrub = (value: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = value;
    setCurrent(value);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="border border-gray-300 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg max-w-2xl mx-auto">
      {title && <div className="font-semibold mb-4 text-gray-800 text-center">{title}</div>}

      <video 
        ref={audioRef} 
        src={src} 
        preload="metadata" 
        className={showVideo ? "w-full rounded-lg mb-4" : "hidden"}
        controls={false}
      />

      <div className="flex items-center justify-between gap-4 mb-4">
        <button 
          onClick={() => seek(-10)}
          className="p-2 hover:bg-gray-200 rounded-full transition"
          title="Previous (10s back)"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button 
          onClick={togglePlay}
          className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <button 
          onClick={() => seek(10)}
          className="p-2 hover:bg-gray-200 rounded-full transition"
          title="Next (10s forward)"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 18h-2V6h2zm-3.5-6L4 6v12z"/>
          </svg>
        </button>

        <div className="text-sm text-gray-700 font-medium min-w-fit px-2">
          {formatTime(current)} / {formatTime(duration)}
        </div>

        <div className="flex-1 mx-4">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(e) => onScrub(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-800"
            style={{
              background: `linear-gradient(to right, #1f2937 0%, #1f2937 ${(current / duration) * 100}%, #d1d5db ${(current / duration) * 100}%, #d1d5db 100%)`
            }}
          />
        </div>

        <button 
          onClick={toggleMute}
          className="p-2 hover:bg-gray-200 rounded-full transition"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
