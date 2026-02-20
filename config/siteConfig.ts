import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export const siteConfig = {
  metadata: {
    title: "Frutas Deshidratadas | Colectivo Nutricional",
    description: "La pureza no debería ser un lujo. Frutas deshidratadas de alta calidad.",
    logoPath: "/img/logo.jpeg",
  },
  colors: {
    background: "#F5F5DC", // Arena
    primary: "#CC5500",    // Terracota
    secondary: "#556B2F",  // Oliva
    accent: "#E1AD01",     // Mostaza
  },
  fonts: {
    headings: "Arvo",
    body: "Open Sans",
  },
  social: {
    facebook: "https://facebook.com/frutasdesh",
    twitter: "https://x.com/frutasdesh",
    instagram: "https://instagram.com/frutasdesh",
    whatsapp: "https://wa.me/521234567890",
  },
  contact: {
    address: "Tlahuac Ciudad de México",
    email: "contacto@frutasdesh.com",
    phone: "+52 55 1234 5678",
  },
  hero: {
    video: "/img/Nav1.jpg", // Placeholder
    text: "La pureza no debería ser un lujo",
  },
  store: {
    title: "Nuestra Selección",
    products: [
      {
        id: "p1",
        name: "Platano deshidratado",
        price: 20,
        image: "/img/pla1.jpeg",
        description: "Crocante.",
      },
      {
        id: "p2",
        name: "Piña deshidratada",
        price: 20,
        image: "/img/piña3.jpeg",
        description: "Sabor nutritivo",
      },
      {
        id: "p3",
        name: "Naranja deshidratada",
        price: 20,
        image: "/img/nara2.jpeg",
        description: "Prueba el sabor de la naranja deshidratada."
      },
      {
        id: "p4",
        name: "Mix Tropical",
        price: 20,
        image: "/img/mix.jpg",
        description: "Una explosión de sabores en cada bocado.",
      },
      {
        id: "p5",
        name: "Fresa Natural",
        price: 20,
        image: "/img/fresa.jpg",
        description: "Intenso sabor a fresa real, crujiente y deliciosa.",
      },
    ],
    toppings: [
      { id: "t1", name: "Plátano", price: 20 },
      { id: "t2", name: "Manzana", price: 20 },
      { id: "t3", name: "Naranja", price: 20 },
      { id: "t4", name: "Fresa", price: 20 },
    ]
  },
  about: {
    title: "Nosotros",
    items: [
      {
        title: "Propuesta de Valor",
        image: "/img/Val1.jpg",
        text: "Calidad premium accesible para todos.",
      },
      {
        title: "Responsabilidad Social",
        image: "/img/val2.jpg",
        text: "Apoyamos a pequeños productores locales.",
      },
      {
        title: "Sostenibilidad",
        image: "/img/Val3.jpg",
        text: "Empaques biodegradables y procesos limpios.",
      },
    ],
  },
  pillars: {
    mission: {
      title: "Misión",
      text: "Nutrir vidas con la esencia pura de la fruta.",
      image: "/img/Misi1.jpeg",
    },
    vision: {
      title: "Visión",
      text: "Ser el referente de snacks saludables en México.",
      image: "/img/visi1.jpg",
    },
    values: {
      title: "Valores",
      text: "Honestidad, Calidad, Pasión, Compromiso.",
      image: "/img/valo1.jpg",
    },
    differentiator: {
      title: "Diferenciador",
      text: "Sabor real sin aditivos ni conservadores.",
      image: "/img/dif.jpg",
    },
  },
  certifications: [
    { name: "ISO 9001", icon: "iso9001", description: "Gestión de Calidad Certificada" },
    { name: "ISO 22000", icon: "iso22000", description: "Seguridad Alimentaria Garantizada" },
    { name: "NOM-051", icon: "nom051", description: "Cumplimiento de Etiquetado" },
    { name: "NOM-251", icon: "nom251", description: "Prácticas de Higiene" },
  ],
  process: {
    title: "Nuestro Proceso",
    steps: [
      { title: "Selección", image: "/img/selec3.jpg" },
      { title: "Deshidratado", image: "/img/desh2.jpg" },
      { title: "Empaquetado", image: "/img/empa1.jpg" },
    ],
  },
  reviews: [
    { id: 1, user: "Ana G.", text: "¡Me encantan! ", rating: 5 },
    { id: 2, user: "Carlos M.", text: "¡Deliciosos!", rating: 5 },
    { id: 3, user: "Luisa P.", text: "La piña es mi favorita.", rating: 4 },
    { id: 4, user: "Jorge R.", text: "¡Los recomiendo!", rating: 5 },
  ],
};
