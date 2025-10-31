import Image from 'next/image';

interface AdaptiveLogoProps {
    lightSrc: string;
    darkSrc: string;
    width: number | `${number}` | undefined;
    height: number | `${number}` | undefined;
    alt: string;
    className?: string;
}

export default function AdaptiveLogo({
    lightSrc,
    darkSrc,
    width,
    height,
    alt,
    className = ''
}: AdaptiveLogoProps) {
    return (
        <>
            <Image
                src={lightSrc}
                width={width}
                height={height}
                alt={alt}
                className={`dark-mode-hidden ${className}`}
            />
            <Image
                src={darkSrc}
                width={width}
                height={height}
                alt={alt}
                className={`light-mode-hidden ${className}`}
            />
        </>
    )
}