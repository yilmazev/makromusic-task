import { useState } from "react"

const useDebouncedSearch = (delay: number) => {
    const [ debounceTimeout, setDebounceTimeout ] = useState<NodeJS.Timeout | null>(null)

    const debounce = (func: () => void) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout)
        }

        const timeout = setTimeout(() => {
            func()
        }, delay)

        setDebounceTimeout(timeout)
    }

    return debounce
}

export default useDebouncedSearch