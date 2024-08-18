import React from "react";

export default function Nav() {
    return (
        <nav className="flex flex-row border-solid border-gray-600 border text-white items-center w-screen">
            <h1 className="flex-1 text-4xl font-medium mx-9 my-3 sm:text-3xl max-sm:underline"><a href="/">Bepis-Chat</a></h1>
            <ul className="list-none flex flex-col sm:flex-row gap-8 text-2xl mx-9 underline">
                <li className="max-sm:hidden">
                    <a href="/">Chat</a>
                </li>
                <li className="">
                    <a href="/login">Login</a>
                </li>
            </ul>
        </nav>
    )
}