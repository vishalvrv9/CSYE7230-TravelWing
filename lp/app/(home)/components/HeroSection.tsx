import React from "react";

export default function HeroSection(){
    return <div className="min-h-[60vh] flex items-center justify-between">
        <div className="space-y-10">
            <h1 className="text-4xl lg:text-7xl font-bold">
                One stop 
                <br /><span className="underline underline-offset-8 decoration-green-500">{ "for all your plans"}</span>
                </h1>
        </div>
    </div>
}