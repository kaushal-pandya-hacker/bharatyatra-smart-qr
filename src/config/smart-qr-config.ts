/**
 * BharatYatra — Smart QR Landing Page Master Configuration
 */

export interface SmartQrButtonConfig {
  id: string;
  order: number;
  label: string;
  subtitle: string;
  destinationUrl: string;
  isExternal?: boolean;
  iconName: 'Sparkles' | 'MapPin' | 'Compass' | 'Instagram' | 'Building2' | 'PhoneCall';
  themeColor: 'saffron' | 'green' | 'navy';
  badgeText: string;
}

export const SMART_QR_CONFIG = {
  brand: {
    name: 'BharatYatra',
    subNameGujarati: 'ભારત યાત્રા',
    tagline: 'DISCOVER INDIA. TRAVEL BETTER.',
    headline: 'Your Journey Starts Here.',
    subtitle: 'One scan. Endless possibilities. Explore incredible India with BharatYatra.',
    description: 'Explore incredible destinations, discover unforgettable experiences and plan your next journey across India with BharatYatra.',
    websiteUrl: 'https://www.bharatyatra.in',
    landingPageUrl: 'https://www.bharatyatra.in/qr/',
    logoUrl: './logo.png',
  },

  // EXACT SIX PRIMARY BUTTONS (In precise order mandated by specification)
  buttons: [
    {
      id: 'plan-your-trip',
      order: 1,
      label: 'PLAN YOUR TRIP',
      subtitle: 'Create your personalized travel itinerary with AI Trip Planner',
      destinationUrl: 'https://www.bharatyatra.in/plan',
      iconName: 'Sparkles',
      themeColor: 'saffron',
      badgeText: '✨ AI POWERED',
    },
    {
      id: 'explore-destinations',
      order: 2,
      label: 'EXPLORE DESTINATIONS',
      subtitle: 'Discover destinations, attractions and experiences across India',
      destinationUrl: 'https://www.bharatyatra.in/destinations',
      iconName: 'MapPin',
      themeColor: 'navy',
      badgeText: '🏛️ 36 STATES & UTS',
    },
    {
      id: 'explore-tour-packages',
      order: 3,
      label: 'EXPLORE TOUR PACKAGES',
      subtitle: 'Find and explore available curated travel packages',
      destinationUrl: 'https://www.bharatyatra.in/packages',
      iconName: 'Compass',
      themeColor: 'green',
      badgeText: '🌿 HANDCRAFTED',
    },
    {
      id: 'follow-instagram',
      order: 4,
      label: 'FOLLOW INSTAGRAM',
      subtitle: 'Get travel inspiration, destination videos, updates and offers',
      destinationUrl: 'https://www.instagram.com/bharat.yatra29?rpxt=MXJnMnQ2NG9sa2duYg==',
      isExternal: true,
      iconName: 'Instagram',
      themeColor: 'saffron',
      badgeText: '📸 @bharat.yatra29',
    },
    {
      id: 'become-a-travel-partner',
      order: 5,
      label: 'BECOME A TRAVEL PARTNER',
      subtitle: 'Join our travel partner network and grow with BharatYatra',
      destinationUrl: 'https://www.bharatyatra.in/partners/register',
      iconName: 'Building2',
      themeColor: 'navy',
      badgeText: '🤝 PARTNER NETWORK',
    },
    {
      id: 'contact-us',
      order: 6,
      label: 'CONTACT US',
      subtitle: 'Have questions? Connect with our dedicated support team',
      destinationUrl: 'https://www.bharatyatra.in/contact',
      iconName: 'PhoneCall',
      themeColor: 'green',
      badgeText: '⚡ 24/7 SUPPORT',
    },
  ] as SmartQrButtonConfig[],

  contact: {
    phone: '+919876543210',
    phoneDisplay: '+91 98765 43210',
    whatsappUrl: 'https://wa.me/919876543210?text=Hello%20BharatYatra,%20I%20scanned%20your%20Smart%20QR%20card%20and%20would%20like%20to%20know%20more.',
    email: 'contact@bharatyatra.in',
    supportEmail: 'support@bharatyatra.in',
    address: 'BharatYatra Technologies Private Limited, Ahmedabad, Gujarat, India',
    workingHours: 'Monday to Sunday, 24/7 Concierge Support',
  },
};

