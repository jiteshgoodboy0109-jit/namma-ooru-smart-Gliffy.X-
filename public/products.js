// =========================================================================
// 🛒 HOW TO ADD A NEW PRODUCT
// =========================================================================
// 1. Copy the "TEMPLATE" section below.
// 2. Paste it inside the "window.PRODUCTS" list (after the last product).
// 3. Change the details (id, name, price, etc.).
// 4. Save this file!
// =========================================================================

/*
    {
        id: 'unique-product-id-no-spaces',      // 🆔 Unique ID (e.g. 'iphone-15')
        name: 'Product Name',                   // 🏷️ Display Name
        category: CATEGORIES.WATER_PURIFIER,    // 📂 Category (Pick from CATEGORIES list below)
        price: '₹20,000',                       // 💰 Selling Price
        mrp: '₹25,000',                         // 🏷️ MRP (Original Price)
        savings: '₹5,000',                      // 💸 Savings Amount
        description: `Description here...`,     // 📝 Description (Key features, Warranty, etc.)
        image: '/namma-ooru-smart/ASSETS/path-to-image.jpg',     // 🖼️ Main Image
        images: [                               // 📸 Gallery Images (Optional)
            '/namma-ooru-smart/ASSETS/path-to-image.jpg',
            '/namma-ooru-smart/ASSETS/path-to-image-2.jpg'
        ],
        features: ['Feature 1', 'Feature 2'],   // ✨ Short highlights
        specifications: {                       // ⚙️ Technical Specs
            Capacity: '10L',
            Warranty: '1 Year'
        },
        badges: ['Bestseller'],                 // 🏅 Badges (e.g. 'New', 'Sale')
        rating: 4.5,                            // ⭐ Rating (0 to 5)
        reviewCount: 10                         // 💬 Number of Reviews
    },
*/

// Define Categories first for easy management
const CATEGORIES = {
    WATER_PURIFIER: 'Water Purifier',
    WATER_SOFTENER: 'Water Softener',
    INVERTER_BATTERY: 'Inverter & Battery',
    HEAT_PUMP: 'Heat Pump Water Heater',
    SOLAR_WATER_HEATER: 'Solar Water Heater',
    CAMERA: 'Camera',
    ROBOTIC_VACUUM: 'Robotic Vacuum Cleaner'
};

// Make categories available globally if needed
window.CATEGORIES = CATEGORIES;

window.PRODUCTS = [
    // ========== WATER PURIFIERS ==========
    {
        id: 'aquaguard-aspire-nova',
        name: 'Aquaguard Aspire Nova Ro+Uv 2x',
        category: CATEGORIES.WATER_PURIFIER,
        price: '₹22,000',
        mrp: '₹26,000',
        savings: '₹4,000',
        description: `Aquaguard Aspire Nova Water Purifier

Eureka Aspire Nova RO UV 2X 6.2 L Gravity Based Water Purifier | Mega Sediment Filter At No Extra Cost | (Black) .

Warranty and Installation – Comes with a 1-year free warranty and includes complimentary installation.`,
        image: '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Aspire_Nova_Ro_Uv_2x/a1.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Aspire_Nova_Ro_Uv_2x/a1.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Aspire_Nova_Ro_Uv_2x/a11.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Aspire_Nova_Ro_Uv_2x/a111.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Aspire_Nova_Ro_Uv_2x/a1111.webp'
        ],
        features: ['RO+UV 2X', '6.2L Capacity', 'Gravity Based'],
        specifications: { Capacity: '6.2L', Type: 'Gravity Based', Warranty: '1 Year' },
        badges: ['Bestseller', 'Free Installation'],
        rating: 4.5,
        reviewCount: 120
    },
    {
        id: 'aquaguard-enrich-victor',
        name: 'Aquaguard Enrich Victor Ro+Uv+Mc 2x',
        category: CATEGORIES.WATER_PURIFIER,
        price: '₹17,000',
        mrp: '₹20,000',
        savings: '₹3,000',
        description: `Aquaguard Enrich Victor Ro+Uv+Mc 2x

Eureka Vector ENRICH RO+UV+MC 2X Water Purifier | Suitable for all type of Borewell, Tanker & Municipal Water | Saves More Than 60% water | Compact & Ergonic Design | 30X Impurity Removal.
Ample Storage: Enjoy a generous 6.2 Litres of Storage with a Sleek, Compact & Mordern Design.
LED Indicators: To let you know the Purifier is On/Off, Full Tank Indicator and Service Indicator.
Compact and Ergonomic: Sleek and space-saving, this purifier boasts a compact, ergonomic design that seamlessly integrates into your living space.`,
        image: '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Enrich_Victor_Ro_Uv_Mc_2x/a21.jpeg',
        images: [
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Enrich_Victor_Ro_Uv_Mc_2x/a21.jpeg',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Enrich_Victor_Ro_Uv_Mc_2x/a22.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Enrich_Victor_Ro_Uv_Mc_2x/a23.jpeg'
        ],
        features: ['RO+UV+MC', '6.2L Storage', 'Eco-friendly'],
        specifications: { Capacity: '6.2L', Type: 'RO+UV+MC', Warranty: '1 Year' },
        badges: ['Bestseller', 'Smart Choice'],
        rating: 4.8,
        reviewCount: 95
    },
    {
        id: 'aquaguard-blaze-insta-hot',
        name: 'Aquaguard Blaze Insta Hot & Ambient',
        category: CATEGORIES.WATER_PURIFIER,
        price: '₹28,500',
        mrp: '₹37,000',
        savings: '₹8,500',
        description: `Aquaguard Blaze Insta Hot & Ambient

Aquaguard Blaze Insta Hot & Ambient Water Purifier | Hot and ambient water available instantly.
Top highlights:
- Special Feature: Automatic Shut-Off
- Capacity: 5.6 litres
- Maximum Flow Rate: 15 Liters Per Hour
- Operating Pressure Range: 3 Kilograms Per Square Centimeter
- Upper Temperature Rating: 40 Degrees Celsius
- Material: Stainless Steel, Polypropylene, Acrylonitrile Butadiene Styrene

Included Components: Water Purifier (Input pipe, Diverter valve & Warranty Card, Reject pipe).`,
        image: '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Blaze_Insta_Hot_Ambient/a31.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Blaze_Insta_Hot_Ambient/a31.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Blaze_Insta_Hot_Ambient/a32.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Blaze_Insta_Hot_Ambient/a33.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Blaze_Insta_Hot_Ambient/a34.webp'
        ],
        features: ['Insta Hot Water', 'Automatic Shut-Off', '5.6L Capacity'],
        specifications: { Capacity: '5.6L', 'Flow Rate': '15 LPH', 'Temp Rating': '40°C' },
        badges: ['Hot & Ambient', 'Premium', 'Fast Heating'],
        rating: 4.9,
        reviewCount: 20
    },
    {
        id: 'aquaguard-designo-nxt',
        name: 'Aquaguard Designo NXT Under Sink RO',
        category: CATEGORIES.WATER_PURIFIER,
        price: '₹31,500',
        mrp: '₹39,500',
        savings: '₹8,000',
        description: `Aquaguard Designo NXT Under Shink Ro

Aquaguard Designo NXT 9-Stage Under The Counter Water Purifier | Active Copper+RO+UV Tech | 7L Storage | Inbuilt Pressure Pump | Suitable for Tanker, Borewell & Municipal Water.

Key Features:
- 3-in-1 Patented Active Copper Technology: Infuses the right amount of copper from the first drop (As per BIS norms).
- Clean Free Technology: Suitable for all age groups.
- Free Service Plan (worth ₹2000): Includes free installation, 1 free maintenance visit, and unlimited repair visits within 1 year.
- Certifications: NABL and WQIA certified for reliability and performance.`,
        image: '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Designo_NXT_Under_Sink_Ro/a41.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Designo_NXT_Under_Sink_Ro/a41.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Designo_NXT_Under_Sink_Ro/a42.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Designo_NXT_Under_Sink_Ro/a43.webp'
        ],
        features: ['Under Sink', 'Active Copper', '9-Stage Purification'],
        specifications: { Capacity: '7L Storage', Type: 'Under Counter', Tech: 'RO+UV+Copper' },
        badges: ['NABL Certified', 'Free Service Plan', 'Premium'],
        rating: 4.8,
        reviewCount: 18
    },
    {
        id: 'aquaguard-nova-ro-uv-ss',
        name: 'Aquaguard Nova Ro+UV+SS',
        category: CATEGORIES.WATER_PURIFIER,
        price: '₹24,500',
        mrp: '₹33,000',
        savings: '₹8,500',
        description: `Eureka NOVA WS RO+UV+UF+TA+ALKALINE+Stainless steel

A fashionable purifier that comes with the dual purification of RO and UV along with double goodness of Copper and Zinc. Uses many filters to remove salts & microbes in multiple stages.
Best suited for municipal water.

Key Features:
- 6.2 L Capacity: More the capacity, more the users can be served with drinking water.
- Purification capacity: 1.5 liters per minute for a steady supply.
- Sedi Shield, Particulate Filter, Chemi-Block, Taste Adjuster, Reverse Osmosis Cartridge, UV E boiling, Ultra Filtration, 2-in-1 Alkaline Boost.
- Active Copper with Zinc Booster Cartridge & Mineral Magnet.

Included: Water Purifier 1N, Installation Kit 1N, Warranty Card + QR Code 1N.`,
        image: '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Nova_Ro_UV_SS/a51.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Nova_Ro_UV_SS/a51.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Nova_Ro_UV_SS/a52.webp',
            '/namma-ooru-smart/ASSETS/Water_Purifier_a/Aquaguard_Nova_Ro_UV_SS/a53.webp'
        ],
        features: ['RO+UV+UF+TA', 'Alkaline+SS', '6.2L Storage'],
        specifications: { Capacity: '6.2L', Rate: '1.5 L/min', Type: 'Wall/Table Mount' },
        badges: ['Alkaline Boost', 'Stainless Steel', 'Copper+Zinc'],
        rating: 4.7,
        reviewCount: 15
    },

    // ========== WATER SOFTENERS ==========
    {
        id: 'aquaguard-aws-i-2500',
        name: 'Aquaguard AWS I-2500 Water Softener',
        category: CATEGORIES.WATER_SOFTENER,
        price: '₹56,500',
        mrp: '₹64,990',
        savings: '₹8,490',
        description: `Aquaguard Select AWS I-2500 Water Softener

Fully automatic water softener for independent homes with advanced ionic transfer technology to soften hard water with flow rate support upto 2100 LPH. Get rid of hard water which may cause hair fall, dry itchy skin, and stains on tiles & bathroom fittings.

Key Specifications:
- Resin Volume: 25 liters
- Max Input Hardness: 1900 ppm
- Max Input Flow Rate: 2100 LPH
- Dimensions: 112 cm (H) x 20 cm (D) x 20 cm (W)
- Technology: Ionic-Transfer Technology
- Regeneration: Fully Automatic Programmable (Time-based or Flow-based)
- Salt Storage: 50 kg
- Power: 18W (100-240V AC)

Features:
- Compact Design: Easy installation in homes.
- Intelligent Control: Auto-selects regeneration.
- LCD Display Panel: Shows current settings.
- Auto Setting Lock: Retains settings during power cuts.`,
        image: '/namma-ooru-smart/ASSETS/Water_Softener_b/Aquaguard_AWS_I_2500_Water_Softener/b11.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Water_Softener_b/Aquaguard_AWS_I_2500_Water_Softener/b11.webp',
            '/namma-ooru-smart/ASSETS/Water_Softener_b/Aquaguard_AWS_I_2500_Water_Softener/b12.webp',
            '/namma-ooru-smart/ASSETS/Water_Softener_b/Aquaguard_AWS_I_2500_Water_Softener/b13.webp'
        ],
        features: ['2100 LPH Flow', 'Auto Regeneration', 'Ionic-Transfer'],
        specifications: { Capacity: '25L Resin', Flow: '2100 LPH', Hardness: 'Max 1900 ppm' },
        badges: ['Fully Automatic', 'High Capacity', 'Hard Water Solution'],
        rating: 4.9,
        reviewCount: 10
    },
    {
        id: 'automatic-water-softener-1000l',
        name: 'Fully Automatic Water Softener 1000L',
        category: CATEGORIES.WATER_SOFTENER,
        price: '₹59,500',
        mrp: '₹69,990',
        savings: '₹10,490',
        description: `Fully Automatic Water Softener System (1000 Liters)

Residential automatic water softener system designed to remove hardness (calcium, magnesium) from borewell or municipal water using ion exchange technology.

Key Specifications:
- Capacity: 1000 Liters/Day
- Vessel Height: 48 inch
- Material: FRP (Fiber Reinforced Plastic)
- Automation Grade: Automatic
- Voltage: 230 V
- Usage: Domestic / Residential
- Water Source: Suitable for Borewell Water

How it works:
Hard water enters the system, passes through resin beads which trap calcium and magnesium, and exchanges them for sodium/potassium, delivering soft water to your home.

Included: Warranty 1 Year.`,
        image: '/namma-ooru-smart/ASSETS/Water_Softener_b/Fully_Automatic_Water_Softener_1000L_Day/b21.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Water_Softener_b/Fully_Automatic_Water_Softener_1000L_Day/b21.webp',
            '/namma-ooru-smart/ASSETS/Water_Softener_b/Fully_Automatic_Water_Softener_1000L_Day/b22.webp',
            '/namma-ooru-smart/ASSETS/Water_Softener_b/Fully_Automatic_Water_Softener_1000L_Day/b23.webp'
        ],
        features: ['1000L Capacity', 'Fully Automatic', 'Ion Exchange'],
        specifications: { Capacity: '1000L', Type: 'Vertical', Height: '48 inch' },
        badges: ['Borewell Special', 'Automatic', 'Soft Water'],
        rating: 4.8,
        reviewCount: 12
    },

    // ========== HOME INVERTERS ==========
    {
        id: 'luminous-1050-ups-150ah-battery',
        name: '1050 UPS & 150Ah Battery Luminous Bin',
        category: CATEGORIES.INVERTER_BATTERY,
        price: '₹20,500',
        mrp: '₹25,000',
        savings: '₹4,500',
        description: `1050 VA UPS with 150Ah Battery Combo - Luminous

Complete power backup solution for your home.
- Capacity: 1050 VA UPS
- Battery: 150Ah Tubular Battery
- Backup: Approx 60 minutes (at full load)

Load Capacity:
- 4 Fans
- 6 LED Lights
- 4 Tube Lights
- 2 TVs
- 1 Mobile Charger
- Mixer Grinder (Mixi) can also be used

Warranty:
- Inverter: 3 Years
- Battery: 5 Years

Note: Installation and delivery charges are extra.`,
        image: '/namma-ooru-smart/ASSETS/Inverter_Battery/1050_UPS_150Ah_Battery_Luminous_e/e11.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Inverter_Battery/1050_UPS_150Ah_Battery_Luminous_e/e11.webp',
            '/namma-ooru-smart/ASSETS/Inverter_Battery/1050_UPS_150Ah_Battery_Luminous_e/e12.webp',
            '/namma-ooru-smart/ASSETS/Inverter_Battery/1050_UPS_150Ah_Battery_Luminous_e/e13.webp'
        ],
        features: ['1050 VA UPS', '150Ah Battery', 'High Load Capacity', 'Long Warranty'],
        specifications: {
            "Brand": "Luminous",
            "Inverter Capacity": "1050 VA",
            "Battery Capacity": "150 Ah",
            "Inverter Warranty": "3 Years",
            "Battery Warranty": "5 Years",
            "Backup": "60 mins (Full Load)"
        },
        badges: ['Best Seller', 'Combo Offer', 'Long Warranty'],
        rating: 4.7,
        reviewCount: 25
    },

    {
        id: 'exide-1050-ups-150ah-battery',
        name: '1050UPS & 150Ah Battery Exide',
        category: CATEGORIES.INVERTER_BATTERY,
        price: '₹22,500',
        mrp: '₹27,500',
        savings: '₹5,000',
        description: `1050VA UPS with 150Ah Battery Combo - Exide

Power Backup Solution for Home & Office
- Model: IPTT 1500 (Tubular Battery)
- Capacity: 150Ah
- Voltage: 12V
- Backup: 2 to 14 Hours (depending on load)

Load Capacity:
- 4 Fans
- 6 LED Lights
- 4 Tube Lights
- 2 TVs
- 1 Mobile Charger
- Mixer Grinder (Mixi) compatible

Product Features:
- Batteries specially designed for places with frequent power cuts.
- Readily available factory-changed batteries reduce commissioning time.
- Aesthetically designed with a low footprint to suit homes, offices, and business centers.
- Ideal For: Double / Three bedroom house.
- Country of Origin: Made in India.

Warranty:
- 2 Years Warranty (Installation & Delivery Free)
- Battery Warranty: 3 Years`,
        image: '/namma-ooru-smart/ASSETS/Inverter_Battery/1050UPS_150Ah_Battery_Exide_f/f11.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Inverter_Battery/1050UPS_150Ah_Battery_Exide_f/f11.webp',
            '/namma-ooru-smart/ASSETS/Inverter_Battery/1050UPS_150Ah_Battery_Exide_f/f12.webp',
            '/namma-ooru-smart/ASSETS/Inverter_Battery/1050UPS_150Ah_Battery_Exide_f/f13.webp'
        ],
        features: ['1050 VA UPS', '150Ah Tubular Battery', 'Frequent Power Cut Design', 'Installation Free'],
        specifications: {
            "Brand": "Exide",
            "Model": "IPTT 1500",
            "Capacity": "150Ah",
            "Type": "Tubular",
            "Voltage": "12V",
            "Warranty": "3 Years (Battery)",
            "Origin": "India"
        },
        badges: ['Best Seller', 'Free Installation', 'Heavy Duty'],
        rating: 4.8,
        reviewCount: 30
    },
    {
        id: 'luminous-optimus-1250-150ah-combo',
        name: 'Luminous Optimus 1250 inverter & 150Ah Battery',
        category: CATEGORIES.INVERTER_BATTERY,
        price: '₹22,500',
        mrp: '₹27,500',
        savings: '₹5,000',
        description: `Luminous Optimus 1250 inverter & 150Ah Battery 48m

Charging current: User settable charging current between (8A-18A) for optimized performance.
Optimized performance: User settable Output voltage between (200V-240V) to optimize between Longer Backup time and Performance.
Fast battery charging: Low voltage battery charging begins from 95V and fast charging from 135V input supply voltage.
Mode selector: Eco and UPS mode availability.

Safety For Your Home:
Complete safety for your home with protection features and alarms on short circuit, overload, Over temperature and low battery.

Battery Supported:
Supports all Battery types (Flat, Tubular and SMF) and all battery capacities (80Ah-220Ah).

Informative LCD display:
Smart LCD display with unique indication that displays backup and charging time, along with Mains On, Eco/UPS Mode.

Battery Details (RC 18000 150 Ah):
- Type: Recyclable tall tubular inverter battery with rugged construction
- Water Level Indicators: 6
- Nominal Voltage: 12V
- Rated Capacity: 150 Ah
- Dimensions: 502mm x 191mm x 440mm
- Weight: 53.3 Kg (Filled)

Inverter Compatibility: Designed for all types of power cut situation with high charge acceptance and low maintenance.
Running Load: 1 fridge (250 liters), 1 LED TV 40", 3 fans, 2 tube light, 1 LED bulb.
Warranty: 3 years on inverter battery.`,
        image: '/namma-ooru-smart/ASSETS/Inverter_Battery/Luminous Optimus 1250 inverter & 150Ah Battery 48m/g11.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Inverter_Battery/Luminous Optimus 1250 inverter & 150Ah Battery 48m/g11.webp',
            '/namma-ooru-smart/ASSETS/Inverter_Battery/Luminous Optimus 1250 inverter & 150Ah Battery 48m/g12.webp',
            '/namma-ooru-smart/ASSETS/Inverter_Battery/Luminous Optimus 1250 inverter & 150Ah Battery 48m/g13.webp'
        ],
        features: ['1250VA Inverter', '150Ah Tubular Battery', 'Fast Charging', 'LCD Display'],
        specifications: {
            "Inverter Capacity": "1250 VA",
            "Battery Capacity": "150 Ah",
            "Charging": "Fast Charging (8A-18A)",
            "Warranty": "3 Years",
            "Display": "Smart LCD"
        },
        badges: ['Combo Offer', 'Fast Charging', 'Best Seller'],
        rating: 4.8,
        reviewCount: 42
    },
    // ========== SOLAR OFF-GRID ==========
    {
        id: 'luminous-solar-1kva',
        name: "LUMINOUS Solar 1KVA PCU",
        category: CATEGORIES.SOLAR_WATER_HEATER,
        price: "Contact for Price",
        mrp: "₹10,499",
        savings: "₹2,500",
        description: "Off-Grid Solar PCU. Complete solar power control unit for home use.",
        image: "/logo.png",
        images: [
            "/logo.png"
        ],
        features: ["1 KVA", "Off-Grid", "Solar PCU"],
        specifications: {
            "Capacity": "1 KVA",
            "Type": "Off-Grid PCU",
            "Efficiency": "92%",
            "Warranty": "2 Years"
        },
        badges: ["Energy Independent", "Solar Ready", "Complete Solution"],
        rating: 4,
        reviewCount: 12
    },
    {
        id: 'luminous-solar-2kva',
        name: "LUMINOUS Solar 2KVA PCU",
        category: CATEGORIES.SOLAR_WATER_HEATER,
        price: "Contact for Price",
        mrp: "₹10,499",
        savings: "₹2,500",
        description: "Off-Grid Solar PCU. Medium capacity for residential solar systems.",
        image: "/logo.png",
        images: [
            "/logo.png"
        ],
        features: ["2 KVA", "Off-Grid", "Solar PCU"],
        specifications: {
            "Capacity": "2 KVA",
            "Type": "Off-Grid PCU",
            "Efficiency": "93%",
            "Warranty": "2 Years"
        },
        badges: ["Residential", "Energy Independent", "Reliable"],
        rating: 5,
        reviewCount: 11
    },
    // ========== HEAT PUMP WATER HEATER ==========
    {
        id: 'heat-pump-200l',
        name: 'Heat Pump Water Heater 200L',
        category: CATEGORIES.HEAT_PUMP,
        price: '₹65,000',
        mrp: '₹85,000',
        savings: '₹20,000',
        description: `Energy efficient heat pump water heater for residential use. Uses air-to-water heat transfer technology to save up to 70% on electricity bills.`,
        image: '/logo.png',
        images: ['/logo.png'],
        features: ['70% Energy Saving', 'Quick Heating', 'LCD Display'],
        specifications: { Capacity: '200L', Type: 'Air Source', Warranty: '2 Years' },
        badges: ['Energy Efficient', 'Smart Eco'],
        rating: 4.8,
        reviewCount: 5
    },
    // ========== SMART CAMERAS ==========
    {
        id: 'smart-wifi-camera-1080p',
        name: 'Smart WiFi Camera 1080p',
        category: CATEGORIES.CAMERA,
        price: '₹2,999',
        mrp: '₹4,500',
        savings: '₹1,501',
        description: `Full HD 1080p Smart WiFi Security Camera with night vision, motion detection, and two-way audio.`,
        image: '/logo.png',
        images: ['/logo.png'],
        features: ['1080p HD', 'Night Vision', 'Motion Detection'],
        specifications: { Resolution: '1080p', Storage: 'Micro SD Slot', Audio: 'Two-way' },
        badges: ['Bestseller', 'Easy Setup'],
        rating: 4.5,
        reviewCount: 50
    },
    // ========== ROBOTIC VACUUMS ==========

    {
        id: 'eureka-forbes-smartclean-auto-bin',
        name: 'Robotic Vaccum Cleaner with Auto Bin',
        category: CATEGORIES.ROBOTIC_VACUUM,
        price: '₹38,500',
        mrp: '₹46,800',
        savings: '₹8,300',
        description: `Eureka Forbes SmartClean, 5000Pa HyperSuction Robotic Vacuum Cleaner with Auto Bin (65 Days Hands-Free Cleaning) | LiDAR 3.0 & Home Mapping | Wet Mopping | 5-Hour Run Time | Smart App Control

Free Post-Purchase Virtual Demo: Get fully acquainted with all the features of your new smart cleaner through a complimentary virtual demo
Self-Emptying Dust Bin: Enjoy up to 65 days of hands-free cleaning with automatic dust disposal into a 4L bag, minimizing the need for maintenance
5000Pa HyperSuction Power & Unmatched 5-Hour Runtime: Experience the incredible power of 5000Pa HyperSuction (in Max mode), engineered to lift even the finest dust and debris, leaving your floors impeccably clean with minimal effort. Powered by a 5000mAh battery (typical), enjoy up to 5 hours of continuous cleaning (in Quiet mode), perfect for large homes or extended cleaning sessions without interruptions
Advanced LiDAR 3.0 Precision Navigation with 360° Real-Time Quick Home Mapping in 5 Minutes: Navigate smarter with LiDAR 3.0 technology, delivering accurate home mapping and precise, thorough cleaning across every room with seamless efficiency. Enjoy complete home coverage with 360° real-time mapping, finished in just 5 minutes
Designed for Indian Homes & All Floor Types: Tailored specifically for Indian homes, the Forbes SmartClean with Home Mapping Nuo performs exceptionally well on wood, tile, marble, and carpeted floors, ensuring flawless cleaning across all surfaces
3S Mopping Technology: Smart, Scratch-Free, Silent (Quiet Mode) offers customisable mopping levels suitable for tiles, marble, wooden floors, and carpets
Smart App Control with Custom CleanAssist: Take control from anywhere with the Smart Life app. Customize your cleaning schedule, target specific areas, and adjust modes with just a few taps for a hassle-free experience
Voice Control with Alexa & Google Assistant: Control your cleaning, hands-free! With Alexa and Google Assistant compatibility, you can start, stop, or schedule cleaning using simple voice commands
Quiet Operation for Undisturbed Cleaning, Anti-Collision & Anti-Drop Sensors: Enjoy powerful cleaning without the noise. With ultra-quiet operation, your robotic vacuum cleaner works seamlessly in the background, ensuring a peaceful environment. Features advanced anti-collision and anti-drop sensors, ensuring smooth navigation and protection from falls
HEPA H13 Grade Filtration for Allergy-Friendly Cleaning: Breathe easy with HEPA H13 Grade filtration, which captures dust and allergens, providing cleaner air and a healthier living environment—ideal for allergy-sensitive households`,
        image: '/namma-ooru-smart/ASSETS/Robotics_c/c11.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Robotics_c/c11.webp',
            '/namma-ooru-smart/ASSETS/Robotics_c/c12.webp',
            '/namma-ooru-smart/ASSETS/Robotics_c/c13.webp',
            '/namma-ooru-smart/ASSETS/Robotics_c/c14.webp',
            '/namma-ooru-smart/ASSETS/Robotics_c/c15.webp'
        ],
        features: ['5000Pa Suction', 'Auto Bin', 'LiDAR 3.0', 'Wet Mopping', 'App Control'],
        specifications: {
            "Brand": "Eureka Forbes",
            "Model": "SmartClean with Auto Bin",
            "Suction": "5000Pa",
            "Runtime": "300 Minutes",
            "Bin Capacity": "4 Litres",
            "Navigation": "LiDAR 3.0",
            "Warranty": "1 Year"
        },
        badges: ['Best Seller', 'Auto Empty', 'Smart Home'],
        rating: 4.8,
        reviewCount: 42
    },
    {
        id: 'eureka-forbes-smartclean-nuo-s2',
        name: 'Robotic Vaccum Cleaner with Auto Bin',
        category: CATEGORIES.ROBOTIC_VACUUM,
        price: '₹28,500',
        mrp: '₹33,000',
        savings: '₹4,500',
        description: `The Eureka Forbes Smartclean Home Mapping Nuo S2 Robotic Vacuum Cleaner is engineered for powerful, intelligent cleaning in large Indian homes. Combining advanced AI navigation, ultra-high suction, and customisable cleaning controls, it delivers thorough, quiet, and uninterrupted cleaning across diverse floor types while adapting seamlessly to everyday household needs.

Free Post-Purchase Virtual Demo: Includes a complimentary virtual demo to help users understand features and optimise usage after installation.

9000Pa Hyper Suction Power: Delivers up to 9000Pa suction in Max mode, effectively lifting fine dust, debris, and embedded dirt.

5-Hour Long Runtime with Wide Coverage: Powered by a 5000mAh battery, providing up to five hours of uninterrupted cleaning and covering approximately 3000 sq. ft. in Quiet Mode.

AI-Powered LiDAR 3.0 Navigation: Uses LiDAR 3.0 technology for precise navigation, accurate path planning, and efficient room-to-room cleaning.

360° Real-Time Quick Home Mapping: Completes full home mapping in just five minutes, ensuring structured and complete coverage.

Designed for Indian Homes & All Floor Types: Performs efficiently on wood, tile, marble, and carpeted floors found in Indian households.

2-in-1 Dry Vacuuming and Wet Mopping: Cleans up to 15 floor types using combined dry vacuuming and wet mopping technology.

3S Mopping Technology: Offers Smart, Scratch-Free, Silent mopping with customisable levels suitable for multiple floor surfaces.

Smart App Control with Custom CleanAssist: Enables scheduling, area selection, and mode adjustments through the Smart Life app.

Voice Control with Alexa & Google Assistant: Allows hands-free control for starting, stopping, or scheduling cleaning using voice commands.

Quiet Operation: Ensures powerful cleaning with minimal noise for an undisturbed home environment.

HEPA H13 Grade Filtration: Captures dust and allergens, supporting cleaner air and allergy-friendly cleaning.

No-Go Zones and Spot Cleaning: Allows restricted areas and targeted cleaning of specific spots.

Anti-Collision & Anti-Drop Sensors: Ensures safe navigation by avoiding obstacles and preventing falls.

Ultimate Pet-Pro Cleaning System: Effectively cleans pet hair and mess without disturbing pets.

Cleans 100+ Dirt Types: Handles a wide variety of dirt commonly found in Indian homes.`,
        image: '/namma-ooru-smart/ASSETS/Robotics_d/d11.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Robotics_d/d11.webp',
            '/namma-ooru-smart/ASSETS/Robotics_d/d12.webp',
            '/namma-ooru-smart/ASSETS/Robotics_d/d13.webp',
            '/namma-ooru-smart/ASSETS/Robotics_d/d14.webp',
            '/namma-ooru-smart/ASSETS/Robotics_d/d15.webp'
        ],
        features: ['9000Pa Suction', 'LiDAR 3.0', '2-in-1 Vacuum & Mop', '5-Hour Runtime', 'Pet-Pro System'],
        specifications: {
            "Brand": "Eureka Forbes",
            "Model": "Smartclean Home Mapping Nuo S2",
            "Suction": "9000Pa",
            "Runtime": "300 Minutes",
            "Coverage": "3000 sq. ft.",
            "Navigation": "AI LiDAR 3.0",
            "Warranty": "1 Year"
        },
        badges: ['9000Pa Power', 'Pet-Friendly', 'AI Navigation'],
        rating: 4.9,
        reviewCount: 38
    },

    // ========== SOLAR CAMERA ==========
    {
        id: 'solar-camera-3mp-4g',
        name: 'Solar Camera 3MP +3MP 4G Battery Camera with Solar Panel',
        category: CATEGORIES.CAMERA,
        price: '₹12,500',
        mrp: '₹15,000',
        savings: '₹2,500',
        description: `Solar Camera 3MP +3MP 4G Battery Camera with Solar Panel

⚠️ Important Note:
- Installation Charges: Extra
- Memory Card: Extra
- G.I Pipe & Civil Work: Customer Scope

✔ Recommended For:
Outdoor Security, Remote Areas, Farms, Construction Sites

✔ Connectivity:
4G Cellular (SIM Based – No WiFi Required)

✔ Dual Lens System (3MP + 3MP):
Two 4MM Fixed Lenses for Wide View and Pan-Tilt Monitoring

✔ Pan & Tilt Coverage:
- Horizontal: 266°
- Vertical: 90°
- Full Area Coverage Without Blind Spots

✔ Two-Way Audio:
Built-in Microphone & Speaker for Real-Time Communication

✔ Zoom & Preset Points:
- 10X Digital Zoom
- Supports Up to 6 Preset Locations

✔ Active Defense System:
Built-in Siren and Warning Lights to Deter Intruders

✔ Night Vision:
All-Time Color Night Vision for Clear Viewing in Low Light

✔ Smart Security Features:
- Motion Detection
- Human Tracking
- Intruder Alarm
- Instant Alerts

✔ Device Compatibility:
Supports Mobile, Desktop, and Laptop

✔ Indoor & Outdoor Use:
Weather-Resistant Design for All Environments`,
        image: '/namma-ooru-smart/ASSETS/Solar camera/solar_camera_3mp_plus_3mp/h1.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Solar camera/solar_camera_3mp_plus_3mp/h1.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/solar_camera_3mp_plus_3mp/h2.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/solar_camera_3mp_plus_3mp/h3.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/solar_camera_3mp_plus_3mp/h4.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/solar_camera_3mp_plus_3mp/h5.webp'
        ],
        features: [
            '4G Cellular (No WiFi)',
            'Dual 3MP Lenses',
            'Solar Powered',
            'Pan & Tilt (266°/90°)',
            'Two-Way Audio',
            '10X Digital Zoom',
            'Color Night Vision',
            'Motion Detection',
            'Human Tracking',
            'Active Defense System'
        ],
        specifications: {
            'Resolution': 'Dual 3MP + 3MP',
            'Connectivity': '4G Cellular (SIM Based)',
            'Lens': '4MM Fixed (x2)',
            'Pan Range': '266° Horizontal',
            'Tilt Range': '90° Vertical',
            'Zoom': '10X Digital',
            'Night Vision': 'All-Time Color',
            'Audio': 'Two-Way (Mic + Speaker)',
            'Power': 'Solar Panel + Battery',
            'Preset Points': 'Up to 6',
            'Weather Rating': 'Indoor & Outdoor',
            'Compatibility': 'Mobile, Desktop, Laptop'
        },
        badges: ['4G Ready', 'Solar Powered', 'No WiFi Required', 'Outdoor Security'],
        rating: 4.6,
        reviewCount: 28
    },
    {
        id: 'solar-camera-4mp-4g-cp-plus',
        name: 'Solar Camera 4MP 4G Battery Camera with Solar Panel',
        category: CATEGORIES.CAMERA,
        price: '₹10,500',
        mrp: '₹14,000',
        savings: '₹3,500',
        description: `Solar Camera 4MP 4G Battery Camera with Solar Panel - CP Plus CP-Z44R

⚠️ Important Note:
- Installation Charges: Extra
- Memory Card: Extra
- G.I Pipe & Civil Work: Customer Scope

Product Overview:
The CP Plus CP-Z44R is a 4MP 4G battery-powered security camera with a solar panel, designed for outdoor surveillance without the need for WiFi or direct power supply. It is ideal for homes, farms, shops, and remote locations.

⭐ KEY FEATURES:

📡 4G SIM Connectivity (No WiFi Required)
Works on 4G cellular network, perfect for areas without WiFi coverage.

🎥 4MP High-Resolution Video Quality
Crystal clear 4-megapixel video recording for detailed surveillance.

🔄 266° Pan & 90° Tilt Coverage
Wide coverage area with motorized pan and tilt functionality.

🌙 Smart Night Vision (IR & Full Color)
Dual night vision modes - infrared and full-color for low-light conditions.

🎙️ Two-Way Audio Communication
Built-in microphone and speaker for real-time communication.

🚨 Motion & Human Detection Alerts
Intelligent detection system sends instant alerts to your phone.

🔋 Solar Powered with Long Battery Backup
Eco-friendly solar panel ensures continuous operation without wiring.

💾 Supports Micro SD Card (Up to 256GB)
Local storage support for continuous recording.

🌧️ IP66 Waterproof Outdoor Design
Weather-resistant construction for all outdoor conditions.

📱 Mobile App Monitoring (Android & iOS)
Monitor and control from anywhere using your smartphone.`,
        image: '/namma-ooru-smart/ASSETS/Solar camera/Solar Camera 4MP 4G Battery Camera with Solar Panel/I1.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Solar camera/Solar Camera 4MP 4G Battery Camera with Solar Panel/I1.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/Solar Camera 4MP 4G Battery Camera with Solar Panel/I2.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/Solar Camera 4MP 4G Battery Camera with Solar Panel/I3.webp'
        ],
        features: [
            '4G SIM Connectivity',
            '4MP Resolution',
            'Solar Powered',
            'Pan 266° & Tilt 90°',
            'Two-Way Audio',
            'Smart Night Vision',
            'Motion Detection',
            'Human Detection',
            'IP66 Waterproof',
            'Mobile App Control'
        ],
        specifications: {
            'Model': 'CP Plus CP-Z44R',
            'Resolution': '4MP',
            'Connectivity': '4G Cellular (SIM Based)',
            'Pan Range': '266° Horizontal',
            'Tilt Range': '90° Vertical',
            'Night Vision': 'IR + Full Color',
            'Audio': 'Two-Way (Mic + Speaker)',
            'Power': 'Solar Panel + Battery',
            'Storage': 'Micro SD (Up to 256GB)',
            'Weather Rating': 'IP66 Waterproof',
            'App Support': 'Android & iOS',
            'Detection': 'Motion & Human'
        },
        badges: ['4G Ready', 'Solar Powered', 'CP Plus', 'Waterproof'],
        rating: 4.7,
        reviewCount: 35
    },
    {
        id: 'cctv-2mp-ip-cameras-4nos-nvr',
        name: '2MP CCTV IP Cameras 4nos with NVR',
        category: CATEGORIES.CAMERA,
        price: '₹27,750',
        mrp: '₹32,500',
        savings: '₹4,750',
        description: `2MP CCTV IP Cameras 4nos - Complete Surveillance Package

⚠️ Important Note:
- Extra Cable: ₹34/- per Meter
- Wiring Charges (Without Electrical Materials): ₹22/- per Meter
- Internet Connection: ₹3,000/-

🎥 KEY FEATURES:

🎥 High-Definition 2MP Full HD Cameras
Crystal clear 1920×1080 resolution for detailed surveillance footage.

📡 PoE Support (Power & Data via Single Cable)
Simplified installation with Power over Ethernet technology.

🌙 30 Meter IR Night Vision
Clear visibility up to 30 meters in complete darkness.

💾 H.265+ Video Compression
Advanced compression saves storage space without compromising quality.

📱 Mobile & CMS Monitoring Support
Monitor your cameras from anywhere using mobile apps or CMS software.

🌧️ IP67 Weatherproof Design
Fully protected against dust and water for outdoor use.

🔒 Secure Recording with NVR
4-channel NVR with support for up to 6TB storage.

🛠️ Professional Installation Included
Expert installation ensures optimal camera placement and performance.

📷 2MP IR Dome Camera Specifications:
- Sensor: 1/2.7" 2MP PS CMOS
- Resolution: 1920 × 1080 @ 20fps
- Lens: 2.8mm (3.6mm Optional)
- Compression: H.265+ / H.265
- IR Range: Up to 30m
- Features: DWDR, ICR, 3D-DNR, ROI, AWB, AGC, BLC, HLC
- Protection: IP67
- Power: PoE
- Mobile App: iCMOB, gCMOB
- CMS: KVMS Pro

📷 2MP IR Bullet Camera Specifications:
- Sensor: 1/2.7" 2MP PS CMOS
- Resolution: 1920 × 1080 @ 25/30fps
- Lens: 2.8mm (3.6mm Optional)
- Compression: H.265+ / H.265
- IR Range: Up to 30m
- Features: DWDR, ICR, 3D-DNR, ROI, AWB, AGC, BLC, HLC
- Protection: IP67
- Power: PoE

📀 4 Channel 4K NVR Specifications:
- Channels: Supports Up to 4 IP Cameras
- Compression: H.265 / H.264
- Resolution Support: Up to 8MP
- Bandwidth: 80 Mbps Incoming
- Storage: 1 SATA HDD (Up to 6TB)
- USB Ports: 2 × USB 2.0
- Video Output: HDMI & VGA (Simultaneous)
- ONVIF: Version 2.4
- Mobile App: iCMOB, gCMOB
- CMS: KVMS Pro`,
        image: '/namma-ooru-smart/ASSETS/Solar camera/2mp Cctv IP Cameras 4nos/j1.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Solar camera/2mp Cctv IP Cameras 4nos/j1.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/2mp Cctv IP Cameras 4nos/j2.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/2mp Cctv IP Cameras 4nos/j3.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/2mp Cctv IP Cameras 4nos/j4.webp'
        ],
        features: [
            '4 × 2MP Full HD Cameras',
            'PoE Support',
            '30m Night Vision',
            'H.265+ Compression',
            'Mobile Monitoring',
            'IP67 Weatherproof',
            '4-Channel NVR',
            'Up to 6TB Storage',
            'HDMI & VGA Output',
            'Professional Installation'
        ],
        specifications: {
            'Package': '4 Cameras + NVR',
            'Resolution': '2MP (1920×1080)',
            'Camera Types': 'Dome & Bullet',
            'Lens': '2.8mm (3.6mm Optional)',
            'IR Range': '30 Meters',
            'Compression': 'H.265+ / H.265',
            'NVR Channels': '4 Channel',
            'Storage': 'Up to 6TB HDD',
            'Power': 'PoE',
            'Protection': 'IP67',
            'Mobile App': 'iCMOB, gCMOB',
            'CMS': 'KVMS Pro'
        },
        badges: ['Complete Package', 'PoE', 'Professional Installation', '4K NVR'],
        rating: 4.8,
        reviewCount: 42
    },
    {
        id: 'cctv-2mp-ip-cameras-8nos-cp-plus',
        name: '2MP CCTV IP Cameras 8nos - CP Plus',
        category: CATEGORIES.CAMERA,
        price: '₹47,750',
        mrp: '₹52,500',
        savings: '₹4,750',
        description: `2MP CCTV IP Cameras 8nos - CP Plus Advanced Security Package

⚠️ Extra Charges:
- Extra Cable: ₹34/- per Meter
- Wiring Charges (Without Electrical Materials): ₹22/- per Meter
- Internet Router: ₹3,000/-

🏢 About CP Plus:
CP Plus is globally known for developing advanced security solutions that make surveillance easy, reliable, and effective. This 8-camera IP CCTV package is designed using the latest smart technologies to meet modern security requirements for homes, offices, shops, and commercial spaces.

The system is powered with advanced features such as H.265+ video compression, smart detection, live viewing, and intelligent tracking, ensuring high performance with low storage consumption. The 2MP Full HD cameras provide clear and detailed video footage for complete area monitoring.

With durable build quality and vandal-resistant design, this CCTV package delivers long-lasting security in all environments.

🧠 Smart Analytical Support:
This system includes advanced smart analytics for enhanced security.

✅ Motion Detection
Automatically detects movement in monitored areas.

✅ Intrusion Detection
Alerts when unauthorized entry is detected in restricted zones.

✅ Tripwire Alerts
Triggers alerts when objects cross predefined virtual lines.

✅ Missing / Abandoned Object Detection
Identifies objects that are removed or left behind in monitored areas.

✅ Real-Time Mobile Notifications
Instant alerts help you respond quickly to security threats.

🎥 Key Features:
- 2MP Full HD Resolution (1920×1080)
- H.265+ Video Compression for Low Storage
- Smart Detection & Intelligent Tracking
- Live Viewing from Mobile & Desktop
- Vandal-Resistant & Durable Design
- PoE Support for Easy Installation
- Night Vision up to 30 Meters
- IP67 Weatherproof Rating
- 8-Channel NVR with Large Storage Support
- ONVIF Compliant for Universal Compatibility`,
        image: '/namma-ooru-smart/ASSETS/Solar camera/2Mp Cctv IP Cameras 8nos/k1.webp',
        images: [
            '/namma-ooru-smart/ASSETS/Solar camera/2Mp Cctv IP Cameras 8nos/k1.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/2Mp Cctv IP Cameras 8nos/k2.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/2Mp Cctv IP Cameras 8nos/k3.webp',
            '/namma-ooru-smart/ASSETS/Solar camera/2Mp Cctv IP Cameras 8nos/k4.webp'
        ],
        features: [
            '8 × 2MP Full HD Cameras',
            'H.265+ Compression',
            'Smart Analytics',
            'Motion Detection',
            'Intrusion Detection',
            'Tripwire Alerts',
            'Object Detection',
            'Mobile Notifications',
            'PoE Support',
            'IP67 Weatherproof'
        ],
        specifications: {
            'Brand': 'CP Plus',
            'Package': '8 Cameras + NVR',
            'Resolution': '2MP (1920×1080)',
            'Compression': 'H.265+ / H.265',
            'IR Range': '30 Meters',
            'NVR Channels': '8 Channel',
            'Power': 'PoE',
            'Protection': 'IP67',
            'Analytics': 'Motion, Intrusion, Tripwire',
            'Detection': 'Missing/Abandoned Object',
            'Notifications': 'Real-Time Mobile',
            'Design': 'Vandal-Resistant'
        },
        badges: ['CP Plus', 'Smart Analytics', '8 Cameras', 'Advanced Security'],
        rating: 4.9,
        reviewCount: 56
    },
];
