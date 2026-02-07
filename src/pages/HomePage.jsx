import { Suspense, lazy } from 'react'
import Hero from '../components/Hero.jsx'
import ProductsPage from './ProductsPage.jsx'

const TrustStats = lazy(() => import('../components/TrustStats.jsx'))
const Services = lazy(() => import('../components/Services.jsx'))
const Mission = lazy(() => import('../components/Mission.jsx'))
const BrandsStrip = lazy(() => import('../components/BrandsStrip.jsx'))
const ContactSection = lazy(() => import('../components/ContactSection.jsx'))
const Footer = lazy(() => import('../components/Footer.jsx'))

export default function HomePage({ onNavigate, scrollToProduct }) {
    return (
        <>
            <Hero
                onExplore={() => onNavigate('products')}
                onContact={() => onNavigate('contact')}
            />

            <Suspense fallback={null}>
                <TrustStats />
                <ProductsPage />
                <Services onScrollToProduct={scrollToProduct} />
                <Mission />
                <BrandsStrip />
                <ContactSection />
                <Footer />
            </Suspense>
        </>
    )
}
