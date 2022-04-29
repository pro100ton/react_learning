import {useEffect, useState} from "react";

function useCounter(forwards = true) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (forwards) {
                setCounter((prevCounter) => prevCounter + 1);
            } else {
                setCounter((prevCounter) => prevCounter - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
        // forwards added like a dep-y, because it is passed from the outer scope of custom hook
        // So that useEffect will re-run on every forward change
    }, [forwards]);

    return counter;
}

export default useCounter;