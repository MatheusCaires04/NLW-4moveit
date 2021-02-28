import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    min: number;
    sec: number;
    hasFinished: boolean;
    isActive: boolean;
    startCount: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime]             = useState(25 * 60)
    const [isActive,setIsActive]      = useState(false)
    const [hasFinished, setHasFinish] = useState(false)

    const min = Math.floor(time / 60)
    const sec = time % 60

    function startCount() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(25 * 60)
        setHasFinish(false)
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time -1)
            }, 1000)
        } else if(isActive && time === 0) {
            setHasFinish(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider value={{
            min,
            sec,
            hasFinished,
            isActive,
            startCount,
            resetCountdown,
        }}>
            { children }
        </CountdownContext.Provider>
    );
}