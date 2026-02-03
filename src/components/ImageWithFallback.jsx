import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"%3E%3Crect fill="%23f1f5f9" width="800" height="800"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394a3b8"%3EImage Not Available%3C/text%3E%3C/svg%3E';

export default function ImageWithFallback({ src, alt, className, loading = 'lazy', ...props }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-slate-900 rounded-full animate-spin" />
                </div>
            )}
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
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
                    <ImageOff size={24} />
                </div>
            )}
        </div>
    );
}
