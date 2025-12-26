'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface FluidRevealProps {
    topImage: string;
    bottomImage: string;
    revealSize?: number;
    smoothness?: number;
    deformation?: number;
    trailDecay?: number;
    className?: string;
    alt?: string;
}

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    age: number;
}

const FluidReveal: React.FC<FluidRevealProps> = ({
    topImage,
    bottomImage,
    revealSize = 120,
    smoothness = 0.08,
    deformation = 25,
    trailDecay = 0.95,
    className = '',
    alt = 'Interactive image reveal',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const topImageRef = useRef<HTMLImageElement | null>(null);
    const bottomImageRef = useRef<HTMLImageElement | null>(null);
    const animationRef = useRef<number>(0);
    const [isHovering, setIsHovering] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Mouse position with smoothing
    const mouseRef = useRef({ x: 0, y: 0 });
    const smoothMouseRef = useRef({ x: 0, y: 0 });
    const velocityRef = useRef({ x: 0, y: 0 });

    // Trail points for organic trailing effect
    const trailRef = useRef<Point[]>([]);

    // Time for noise animation
    const timeRef = useRef(0);

    // Simple noise function for edge deformation
    const noise = useCallback((x: number, y: number, t: number): number => {
        const sin1 = Math.sin(x * 0.5 + t);
        const sin2 = Math.sin(y * 0.7 + t * 1.3);
        const sin3 = Math.sin((x + y) * 0.3 + t * 0.7);
        return (sin1 + sin2 + sin3) / 3;
    }, []);

    // Load images
    useEffect(() => {
        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        };

        Promise.all([loadImage(topImage), loadImage(bottomImage)])
            .then(([top, bottom]) => {
                topImageRef.current = top;
                bottomImageRef.current = bottom;
                setImagesLoaded(true);
            })
            .catch(console.error);
    }, [topImage, bottomImage]);

    // Handle mouse movement
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate velocity
        velocityRef.current = {
            x: x - mouseRef.current.x,
            y: y - mouseRef.current.y,
        };

        mouseRef.current = { x, y };

        // Add trail point
        trailRef.current.push({
            x,
            y,
            vx: velocityRef.current.x,
            vy: velocityRef.current.y,
            age: 1,
        });

        // Limit trail length
        if (trailRef.current.length > 30) {
            trailRef.current.shift();
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        trailRef.current = [];
    }, []);

    // Animation loop
    useEffect(() => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const render = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            // Set canvas size
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Draw top image (full)
            if (topImageRef.current) {
                ctx.drawImage(topImageRef.current, 0, 0, width, height);
            }

            if (!isHovering || !bottomImageRef.current) {
                animationRef.current = requestAnimationFrame(render);
                return;
            }

            // Smooth mouse following with spring physics
            const dx = mouseRef.current.x - smoothMouseRef.current.x;
            const dy = mouseRef.current.y - smoothMouseRef.current.y;

            smoothMouseRef.current.x += dx * smoothness;
            smoothMouseRef.current.y += dy * smoothness;

            // Update time for noise
            timeRef.current += 0.05;

            // Update trail points
            trailRef.current = trailRef.current
                .map(point => ({
                    ...point,
                    age: point.age * trailDecay,
                }))
                .filter(point => point.age > 0.01);

            // Create clipping mask
            ctx.save();
            ctx.beginPath();

            // Draw main reveal circle with deformation
            const centerX = smoothMouseRef.current.x;
            const centerY = smoothMouseRef.current.y;

            // Calculate dynamic size based on velocity
            const speed = Math.sqrt(
                velocityRef.current.x ** 2 + velocityRef.current.y ** 2
            );
            const dynamicSize = revealSize + Math.min(speed * 2, 50);

            // Draw morphing blob shape
            const segments = 64;
            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * Math.PI * 2;

                // Apply noise-based deformation to the edge
                const noiseValue = noise(
                    Math.cos(angle) * 2,
                    Math.sin(angle) * 2,
                    timeRef.current
                );

                // Add velocity-based stretching
                const stretchX = velocityRef.current.x * 0.3;
                const stretchY = velocityRef.current.y * 0.3;

                const radius = dynamicSize + noiseValue * deformation;
                const x = centerX + Math.cos(angle) * radius + stretchX * Math.cos(angle);
                const y = centerY + Math.sin(angle) * radius + stretchY * Math.sin(angle);

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            // Add trail blobs for organic feel
            trailRef.current.forEach((point, index) => {
                if (point.age < 0.1) return;

                const trailRadius = revealSize * 0.6 * point.age;
                const trailSegments = 32;

                ctx.moveTo(point.x + trailRadius, point.y);

                for (let i = 0; i <= trailSegments; i++) {
                    const angle = (i / trailSegments) * Math.PI * 2;
                    const noiseVal = noise(
                        Math.cos(angle) + index * 0.5,
                        Math.sin(angle) + index * 0.5,
                        timeRef.current
                    );

                    const r = trailRadius + noiseVal * deformation * 0.5 * point.age;
                    const x = point.x + Math.cos(angle) * r;
                    const y = point.y + Math.sin(angle) * r;

                    ctx.lineTo(x, y);
                }
            });

            ctx.closePath();
            ctx.clip();

            // Draw bottom image (revealed)
            ctx.drawImage(bottomImageRef.current, 0, 0, width, height);

            // Add soft glow edge effect
            ctx.restore();

            // Draw subtle glow around reveal area
            ctx.save();
            const gradient = ctx.createRadialGradient(
                centerX, centerY, dynamicSize * 0.8,
                centerX, centerY, dynamicSize * 1.3
            );
            gradient.addColorStop(0, 'rgba(249, 115, 22, 0)');
            gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.1)');
            gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');

            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, dynamicSize * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            animationRef.current = requestAnimationFrame(render);
        };

        animationRef.current = requestAnimationFrame(render);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [imagesLoaded, isHovering, revealSize, smoothness, deformation, trailDecay, noise]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden cursor-none ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="img"
            aria-label={alt}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ touchAction: 'none' }}
            />

            {/* Custom cursor indicator */}
            {isHovering && (
                <div
                    className="pointer-events-none fixed z-50 w-4 h-4 border-2 border-saffron-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
                    style={{
                        left: mouseRef.current.x,
                        top: mouseRef.current.y,
                    }}
                />
            )}

            {/* Fallback for loading state */}
            {!imagesLoaded && (
                <div className="absolute inset-0 bg-parchment flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {/* Instruction hint */}
            {imagesLoaded && !isHovering && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-ink/70 text-cream px-4 py-2 rounded-full text-sm font-body backdrop-blur-sm animate-bounce-gentle">
                    ✨ Hover to reveal magic!
                </div>
            )}
        </div>
    );
};

export default FluidReveal;
