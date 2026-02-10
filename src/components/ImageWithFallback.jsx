import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"%3E%3Crect fill="%23f1f5f9" width="800" height="800"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394a3b8"%3EImage Not Available%3C/text%3E%3C/svg%3E';

// Tiny blur placeholder for instant perceived loading
const BLUR_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Cfilter id="b"%3E%3CfeGaussianBlur stdDeviation="12"/%3E%3C/filter%3E%3Crect width="400" height="400" fill="%23e2e8f0" filter="url(%23b)"/%3E%3C/svg%3E';

export default function ImageWithFallback({ src, alt, className, loading = 'lazy', ...props }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Blur-up placeholder - shows instantly */}
            {isLoading && !hasError && (
                <img
                    src={BLUR_PLACEHOLDER}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
                    aria-hidden="true"
                />
            )}

            {/* Actual image */}
            <img
                src={hasError ? PLACEHOLDER_IMAGE : src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                loading={loading}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                }}
                {...props}
            />

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
                    <ImageOff size={24} />
                </div>
            )}
        </div>
    );
}
