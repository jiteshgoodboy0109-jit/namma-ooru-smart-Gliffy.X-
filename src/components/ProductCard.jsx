import { motion } from 'framer-motion'

import { useState } from 'react'

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f1f5f9" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%2394a3b8"%3EImage Not Available%3C/text%3E%3C/svg%3E';

export default function ProductCard({ product, onAddToCart, onView }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
      id={`product-card-${product.id}`}
      onMouseEnter={() => {
        const img = new Image()
        img.src = getImageUrl(product.image)
      }}
    >
      <img
        src={imgError ? PLACEHOLDER_IMAGE : getImageUrl(product.image)}
        alt={product.name}
        className="w-full h-44 object-cover rounded-lg mb-3 bg-gray-100"
        loading="lazy"
        onError={() => setImgError(true)}
      />
      <h4 className="font-semibold text-slate-900 leading-tight mb-1">{product.name}</h4>
      <p className="text-xs text-slate-500 mb-2">{product.category}</p>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-green-600">{product.price}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onView(product)} className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium text-sm">
          View
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onAddToCart(product)} className="px-3 py-2 rounded-lg bg-green-600 text-white font-medium text-sm">
          Add
        </motion.button>
      </div>
    </motion.div>
  )
}
