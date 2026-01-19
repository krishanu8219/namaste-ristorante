'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CounterProps {
    from: number;
    to: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export default function Counter({ from, to, duration = 2, suffix = '', className = '' }: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start({
                count: to,
                transition: { duration, ease: 'easeOut' },
            });
        }
    }, [isInView, to, duration, controls]);

    return (
        <motion.span
            ref={ref}
            animate={controls}
            initial={{ count: from }}
            className={className}
        >
            {({ count }: { count: number }) => (
                <>
                    {Math.floor(count)}
                    {suffix}
                </>
            )}
        </motion.span>
    );
}
