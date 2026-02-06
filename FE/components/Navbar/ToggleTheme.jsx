"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

const ModeToggle = () => {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Hydration hatasını önlemek için client-side render'ı bekleyelim
  // Bu pattern next-themes için gerekli ve standart bir yaklaşımdır
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const getIcon = () => {
    if (!mounted || !theme) return "/svg/toggleTheme/system.svg"
    
    switch (theme) {
      case "light":
        return "/svg/toggleTheme/sun.svg"
      case "dark":
        return "/svg/toggleTheme/moon.svg"
      case "system":
        return "/svg/toggleTheme/system.svg"
      default:
        return "/svg/toggleTheme/system.svg"
    }
  }

  // İlk render'da (server-side) sabit bir placeholder göster
  // dark: class'ı kullanmıyoruz çünkü bu hydration hatasına neden olabilir
  if (!mounted) {
    return (
      <div className="w-[41px] h-[41px] border border-gray-300 rounded-lg flex flex-col justify-center items-center p-1">
        <div className="w-[25px] h-[25px]"></div>
      </div>
    )
  }

  // resolvedTheme gerçek temayı gösterir (light/dark), theme ise seçimi gösterir (light/dark/system)
  const isLight = resolvedTheme === "light"

  return (
    <div className="cursor-pointer">
      <button 
        onClick={handleToggle} 
        className={`${isLight ? "border-white" : "border-white"} cursor-pointer border rounded-lg flex flex-col justify-center items-center p-1`}
        aria-label="Toggle theme"
      >
        <Image
          src={getIcon()}
          width={25}
          height={25}
          alt="Toggle theme"
        />
      </button>
    </div>
  )
}

export default ModeToggle
