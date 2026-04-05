import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const ContactSection = lazy(() => import("../components/ContactSection.jsx"));

export default function ContactPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="pt-24 min-h-screen bg-white"
    >
      <Suspense fallback={<div className="h-[50vh] flex items-center justify-center">Loading contact info...</div>}>
        <ContactSection />
      </Suspense>
    </motion.div>
  );
}
