import { useState } from "react"
import { Play, Pause } from "lucide-react"

interface SignupAudioPlayerProps {
  title: string
  duration: string
  progress: number
  className?: string
}

export function SignupAudioPlayer({
  title,
  duration,
  progress,
  className = ""
}: SignupAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={`bg-white rounded-lg p-6 lg:p-4 shadow-sm border border-gray-100 w-full lg:max-w-none lg:w-full ${className}`}>
      <h3 className="lg:font-bold text-gray-900 mb-4 lg:mb-6 font-manrope lg:text-lg font-bold">
        {title}
      </h3>

      <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gray-50 rounded-lg">
        <button
          onClick={togglePlay}
          className="w-10 h-10 lg:w-12 lg:h-12 bg-[#4A48FF] hover:bg-[#3A38EF] rounded-full flex items-center justify-center text-white flex-shrink-0 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 lg:w-5 lg:h-5" />
          ) : (
            <Play className="w-4 h-4 lg:w-5 lg:h-5 ml-0.5" />
          )}
        </button>

        <div className="flex-1 flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-2 lg:space-y-0">
          <div className="w-full lg:w-auto bg-gray-300 rounded-full h-2 relative">
            <div
              className="bg-gray-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-gray-200 rounded-full shadow-sm border border-gray-300"></div>
            </div>
          </div>
          <div className="flex justify-end text-xs lg:text-sm text-gray-600">
            <span className="font-manrope font-medium">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 