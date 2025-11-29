"use client"

import Image from "next/image";
import posthog from "posthog-js";
import { MouseEvent } from "react";

const handleClick = (e?: MouseEvent<HTMLButtonElement>) => {
  posthog.capture('my event', { property: 'value' })
};

const ExploreBtn = () => {
    return (
        <button
            type="button"
            id="explore-btn"
            className="mt-7 mx-auto flex items-center gap-2"
            onClick={handleClick}
            aria-label="Explore events"
        >
            <span>Explore</span>
            <Image src="/icons/arrow-down.svg" alt="Arrow Down" width={24} height={24} />
        </button>
    );
};

export default ExploreBtn;