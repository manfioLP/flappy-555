"use client";

import React from "react";

export function FlappyIframe() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md aspect-[9/16] md:max-w-2xl md:aspect-[16/9] rounded-3xl overflow-hidden border border-emerald-400/40 shadow-lg">
        <iframe
          src="/flappybird/index.html"
          title="Flappybird"
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
