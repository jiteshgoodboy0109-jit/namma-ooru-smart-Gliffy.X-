import { useState, createContext, useContext, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ToastContext = createContext()

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => removeToast(id), 3000)
    }, [removeToast])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[70] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md border pointer-events-auto ${toast.type === 'success'
                                    ? 'bg-slate-900/90 text-white border-green-500/50'
                                    : 'bg-red-900/90 text-white border-red-500/50'
                                }`}
                        >
                            <span className="font-bold text-sm">{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
