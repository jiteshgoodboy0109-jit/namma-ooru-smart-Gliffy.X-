import { useState, useMemo, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import SectionTitle from "../components/SectionTitle.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";
import ProductDetailModal from "../components/ProductDetailModal.jsx";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";
import { useLoading } from "../context/LoadingContext.jsx";

const ProductsPage = memo(() => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart, addToCart, updateQuantity } = useCart();
  const { triggerLoader } = useLoading();

  const openProduct = useCallback((product) => {
    triggerLoader(700);
    setTimeout(() => setSelectedProduct(product), 200);
  }, [triggerLoader]);

  const categories = useMemo(
    () => ["All", ...Object.values(CATEGORIES || {})],
    [],
  );

  const filteredProducts = useMemo(
    () =>
      filterCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === filterCategory),
    [filterCategory],
  );

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-12">
      <SectionTitle
        title="Product Catalogue"
        subtitle="Our premium selection of smart home essentials."
      />

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-150 border ${
              filterCategory === cat
                ? "bg-slate-900 text-white shadow-lg scale-105 border-slate-900"
                : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5 px-2 sm:px-0">
        {filteredProducts.map((product, index) => {
          const cartItemIndex = cart.findIndex(
            (item) => item.id === product.id,
          );
          const cartItem = cartItemIndex >= 0 ? cart[cartItemIndex] : null;

          return (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "100px" }}
              id={`product-card-${product.id}`}
              onClick={() => openProduct(product)}
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-50">
                  <span className="text-base font-bold text-green-700">
                    {product.price}
                  </span>
                  {cartItem ? (
                    <div
                      className="flex items-center justify-between bg-slate-50 text-slate-800 rounded-lg shadow-sm border border-slate-200 px-2 py-1 w-full sm:w-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(cartItemIndex, cartItem.quantity - 1)
                        }
                        className="p-1 hover:bg-slate-200 rounded"
                      >
                        <Minus size={16} strokeWidth={2.5} />
                      </motion.button>
                      <span className="text-sm font-bold mx-3">
                        {cartItem.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(cartItemIndex, cartItem.quantity + 1)
                        }
                        className="p-1 hover:bg-slate-200 rounded"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-slate-900 text-white px-4 py-1.5 rounded-lg shadow-sm hover:bg-green-600 transition-colors flex items-center justify-center self-end sm:self-auto w-full sm:w-auto min-h-[36px]"
                    >
                      <ShoppingCart size={18} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </section>
  );
});

ProductsPage.displayName = "ProductsPage";
export default ProductsPage;
