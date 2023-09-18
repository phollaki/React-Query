import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className="flex h-16 w-full items-center justify-around bg-gradient-to-r from-white to-red-600 px-5">
      <Link href="/">
        <img
          className="h-44 w-44 cursor-pointer"
          loading="lazy"
          src="https://ucarecdn.com/39dea013-fbb2-486d-b16b-bf2e1cc43af3/"
        />
      </Link>
      <div className="flex space-x-20">
        <Link href="/todos">
          <p className="cursor-pointer text-lg font-bold">Todos</p>
        </Link>
        <Link href="/product">
          <p className="cursor-pointer text-lg font-bold">Products</p>
        </Link>
        <Link href="/posts">
          <p className="cursor-pointer text-lg font-bold">Posts</p>
        </Link>
        <Link href="/rickyandmorty">
          <p className="cursor-pointer text-lg font-bold">Ricky&Morty</p>
        </Link>
      </div>
    </div>
  )
}

export default Header
