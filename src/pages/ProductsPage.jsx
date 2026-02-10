import { useState, useMemo, memo } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import ProductDetailModal from '../components/ProductDetailModal.jsx'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { useCart } from '../context/CartContext'

const ProductsPage = memo(() => {
    const [filterCategory, setFilterCategory] = useState('All')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const { addToCart } = useCart()

    const categories = useMemo(() => [
        'All',
        ...Object.values(CATEGORIES || {})
    ], [])

    const filteredProducts = useMemo(() =>
        filterCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filterCategory)
        , [filterCategory])

    return (
        <section id="products" className="max-w-7xl mx-auto px-6 py-12">
            <SectionTitle title="Product Catalogue" subtitle="Our premium selection of smart home essentials." />

            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-150 border ${filterCategory === cat
                            ? 'bg-slate-900 text-white shadow-lg scale-105 border-slate-900'
                            : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border-slate-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
                {filteredProducts.map((product, index) => (
                    <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "100px" }}
                        id={`product-card-${product.id}`}
                        onClick={() => setSelectedProduct(product)}
                        className="group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer will-change-transform"
                    >
                        <div className="aspect-square relative bg-gray-50 overflow-hidden">
                            <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                loading={index < 12 ? "eager" : "lazy"}
                                className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 z-20 bg-white/90 backdrop-blur-sm text-slate-900 text-[8px] md:text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                {product.category}
                            </div>
                        </div>
                        <div className="p-3 md:p-5 flex flex-col flex-1">
                            <h3 className="text-sm md:text-base font-medium mb-2 text-slate-800 leading-snug flex-1">
                                {product.name}
                            </h3>
                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                                <span className="text-sm md:text-lg font-semibold text-slate-900">{product.price}</span>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        addToCart(product)
                                    }}
                                    className="bg-slate-900 text-white p-1.5 md:p-2.5 rounded-lg md:rounded-xl shadow-lg hover:bg-green-600 transition-colors"
                                >
                                    <Plus size={16} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <ProductDetailModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addToCart}
            />
        </section>
    )
})

ProductsPage.displayName = 'ProductsPage'
export default ProductsPage
