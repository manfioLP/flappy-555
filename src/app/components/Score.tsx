import React from "react";

type ScoreProps = {
    score: number;
    className?: string;
};

const Score: React.FC<ScoreProps> = ({ score, className = "" }) => {
    return (
        <div className={className}>
            {score}
        </div>
    );
};

export default Score;
