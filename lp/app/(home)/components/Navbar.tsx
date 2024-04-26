import Link from "next/link";
import React from "react";

export default function Navbar(){
    return (
        <nav className="py-10 flex justify-between items-center">
            <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500">TravelWing ✈️</h1>
            {/* <Link 
            <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500">Explore</h1> */}
            <Link href="http://travelwing.online:3000/about">
                <h1 className="text-2xl font-bold underline underline-offset-8 decoration-green-500">Explore</h1>
            </Link>
        </nav>
    );
}