import { useState, useEffect } from 'preact/hooks';

function useScroll() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                setScrolled(globalThis.scrollY > 0);
            };

            globalThis.addEventListener('scroll', handleScroll);
            handleScroll();

            return () => globalThis.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return scrolled;
}

export default useScroll;
