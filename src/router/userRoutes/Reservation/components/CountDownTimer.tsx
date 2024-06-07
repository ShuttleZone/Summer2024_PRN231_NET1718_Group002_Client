import React, {useEffect, useState} from "react";

interface CountdownTimerProps {
    initialTime: number;
    onTimeExpired: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
    initialTime,
    onTimeExpired,
}) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeExpired();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onTimeExpired]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="text-sm">
            Time left:{" "}
            <span className="text-red-600">{formatTime(timeLeft)}</span>
        </div>
    );
};

export default CountdownTimer;
