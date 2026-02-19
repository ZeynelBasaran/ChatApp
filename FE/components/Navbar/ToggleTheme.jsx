"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Monitor } from "lucide-react"

const ModeToggle = () => {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  if (!mounted) {
    return (
      <div className="w-[35px] h-[35px] border border-black rounded-lg flex flex-col justify-center items-center p-1 opacity-50">
        <div className="w-[20px] h-[20px]"></div>
      </div>
    )
  }

  const isLight = resolvedTheme === "light"

  
  const renderIcon = () => {
    if (!theme) return <Monitor size={20} className="text-color-primary" />
    
    switch (theme) {
      case "light":
        return <Sun size={20} className="text-black cursor-pointer" strokeWidth={2} />
      case "dark":
        return <Moon size={20} className="text-white cursor-pointer" strokeWidth={2} />
      case "system":
        return <Monitor size={20} className="text-color-primary cursor-pointer    " strokeWidth={2} />
      default:
        return <Monitor size={20} className="text-color-primary cursor-pointer" strokeWidth={2} />
    }
  }

  return (
    <div className="cursor-pointer">
      <button 
        onClick={handleToggle} 
        className={`border  hover:bg-color-secondary/50 transition-colors rounded-lg w-[35px] h-[35px] flex justify-center items-center p-1 ${theme === "dark" ? 'border-white' : 'border-black' }`}
        aria-label={`Current theme: ${theme}`}
        title={`Change theme (Current: ${theme})`}
      >
        {renderIcon()}
      </button>
    </div>
  )
}

export default ModeToggle
