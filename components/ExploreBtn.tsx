"use client"

import Image from "next/image";

const ExploreBtn = () => {
    return (
        <button 
        type="button"
        id="explore-btn"
        className="mt-7 mx-auto"
        onClick={() => console.log('testando umas paradas')}>
            <a href="#events">Explore Btn</a>
            <Image src="/icons/arrow-down.svg" alt="Arrow Down" width={24} height={24} />      
        </button>
    )
}

export default ExploreBtn;