"use client"

import Image from "next/image"
import { forwardRef } from "react"

interface SafeImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

const SafeImage = forwardRef<HTMLImageElement, SafeImageProps>(
  ({ src, alt, width, height, className, priority = false, quality = 75, placeholder = "empty", blurDataURL, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        {...props}
      />
    )
  }
)

SafeImage.displayName = "SafeImage"

export { SafeImage } 