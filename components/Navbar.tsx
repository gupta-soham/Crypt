"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/ui/button"
import { SunIcon, MoonIcon, SearchIcon, BellIcon, UserIcon, MenuIcon } from "@/components/Icons"

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-card border-b border-card-border px-4 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="#" className="text-xl font-bold" prefetch={false}>
          Crypt
        </Link>
        <nav className={`pl-3 items-center gap-4 text-base font-medium ${isMenuOpen ? "flex flex-col" : "hidden md:flex"}`}>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link href="#" className="hover:text-cyan-400" prefetch={false}>
            Communities
          </Link>
          <Link href="#" className="hover:text-cyan-400" prefetch={false}>
            Trending
          </Link>
          <Link href="#" className="hover:text-cyan-400" prefetch={false}>
            Create
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          <span className="sr-only">Toggle Dark Mode</span>
        </Button>
        <Button variant="ghost" size="icon">
          <SearchIcon className="w-6 h-6" />
          <span className="sr-only">Search</span>
        </Button>
        <Button variant="ghost" size="icon">
          <BellIcon className="w-6 h-6" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <UserIcon className="w-6 h-6" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  )
}