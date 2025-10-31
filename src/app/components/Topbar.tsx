import React from "react";

type MenuItem = {
    name: string;
    icon: string;
    disabled?: boolean;
};

const JUP = {
    neon: "#00FF9C",
    glow: "#00FFB2",
    aqua: "#13FFE2",
    dark: "#021013",
    stroke: "rgba(0,255,156,0.25)",
};

const Topbar: React.FC<{ activePage: string; setActivePage: (page: string) => void }> = ({
                                                                                             activePage,
                                                                                             setActivePage,
                                                                                         }) => {
    const menuItems: MenuItem[] = [
        { name: "Info", icon: "/icons/dreams.svg" },
        { name: "Game", icon: "/icons/heart-hand.svg" },
        { name: "Leaderboard", icon: "/icons/agent.png" },
    ];

    return (
        <div
            className="w-full flex items-center justify-center space-x-8 p-4 sticky top-0 z-20 backdrop-blur-xl"
            style={{
                background: "rgba(3, 20, 16, 0.7)",
                borderBottom: `1px solid ${JUP.stroke}`,
                boxShadow: `0 0 20px ${JUP.neon}15, inset 0 -1px 0 ${JUP.neon}30`,
            }}
        >
            {menuItems.map((item) => {
                const isActive = activePage === item.name;
                const isDisabled = item.disabled;

                return (
                    <div
                        key={item.name}
                        className={`flex items-center space-x-2 cursor-pointer transition-transform duration-200 ${
                            isDisabled
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:scale-105 active:scale-95"
                        }`}
                        onClick={() => !isDisabled && setActivePage(item.name)}
                    >
                        <img
                            src={item.icon}
                            alt={`${item.name} icon`}
                            className="h-5 w-5"
                            style={{
                                filter: isActive
                                    ? `drop-shadow(0 0 6px ${JUP.glow}) brightness(1.2)`
                                    : "brightness(0.6)",
                            }}
                        />
                        <span
                            className="text-sm font-semibold tracking-wide"
                            style={{
                                color: isActive ? JUP.neon : "#BFFFEF",
                                textShadow: isActive ? `0 0 8px ${JUP.glow}` : "none",
                                opacity: isDisabled ? 0.4 : 1,
                            }}
                        >
              {item.name}
                            {isDisabled && (
                                <span className="text-xs ml-1 text-gray-400">(maintenance)</span>
                            )}
            </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Topbar;
