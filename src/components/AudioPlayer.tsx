"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;          // link mp3 hoặc url audio
  title?: string;
};

function formatTime(sec: number) {
  if (!isFinite(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function AudioPlayer({ src, title }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // cập nhật thời gian chạy
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

  // khi đổi rate
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate]);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      try {
        await a.play();
      } catch (e) {
        // autoplay policy hoặc lỗi load
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

  return (
    <div className="border-2 border-blue-300 rounded-lg p-4 bg-white">
      {title && <div className="font-semibold mb-3 text-gray-800">{title}</div>}

      {/* audio tag ẩn controls mặc định */}
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex gap-2 items-center flex-wrap mb-3">
        <button 
          onClick={togglePlay}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button 
          onClick={() => seek(-5)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
        >
          -5s
        </button>
        <button 
          onClick={() => seek(+5)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
        >
          +5s
        </button>

        <span className="text-sm text-gray-700 ml-2">
          {formatTime(current)} / {formatTime(duration)}
        </span>

        <span className="ml-auto font-semibold text-gray-700">Tốc độ:</span>
        {[0.5, 0.75, 1, 1.25, 1.5, 2.0].map((r) => (
          <button
            key={r}
            onClick={() => setRate(r)}
            className={`py-2 px-3 rounded-lg font-semibold transition ${
              rate === r 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {r}x
          </button>
        ))}
      </div>

      {/* progress bar */}
      <div>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          onChange={(e) => onScrub(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </div>
  );
}
