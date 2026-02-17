
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export const tiendaConfig = {
    metadatos: {
        titulo: "Frutas Deshidratadas | Colectivo Nutricional",
        descripcion: "La pureza no debería ser un lujo. Frutas deshidratadas de alta calidad.",
    },
    contacto: {
        direccion: "Tlahuac Ciudad de México",
        email: "contacto@frutasdesh.com",
        telefono: "+52 55 1234 5678",
    },
    redesSociales: {
        facebook: "https://facebook.com/frutasdesh",
        twitter: "https://x.com/frutasdesh",
        instagram: "https://instagram.com/frutasdesh",
        whatsapp: "https://wa.me/521234567890",
    },
    hero: {
        video: "/img/Nav1.jpg",
        texto: "La pureza no debería ser un lujo",
        imagenesCarrusel: [
            "/img/Nav1.jpg",
            "/img/Nav2.jpg",
            "/img/Nav3.jpg"
        ]
    },
    tienda: {
        titulo: "Nuestra Selección",
        productos: [
            {
                id: "p1",
                nombre: "Platano deshidratado",
                precio: 40,
                imagen: "/img/pla1.jpeg",
                descripcion: "Crocante.",
            },
            {
                id: "p2",
                nombre: "Piña deshidratada",
                precio: 40,
                imagen: "/img/piña3.jpeg",
                descripcion: "Sabor nutritivo",
            },
            {
                id: "p3",
                nombre: "Naranja deshidratada",
                precio: 40,
                imagen: "/img/nara2.jpeg",
                descripcion: "Prueba el sabor de la naranja deshidratada."
            },
        ],
        toppings: [
            { id: "t1", nombre: "Plátano", precio: 20 },
            { id: "t2", nombre: "Manzana", precio: 20 },
            { id: "t3", nombre: "Naranja", precio: 20 },
            { id: "t4", nombre: "Fresa", precio: 20 },
        ]
    },
    nosotros: {
        titulo: "Nosotros",
        items: [
            {
                titulo: "Propuesta de Valor",
                imagen: "/img/Val1.jpg",
                texto: "Calidad premium accesible para todos.",
            },
            {
                titulo: "Responsabilidad Social",
                imagen: "/img/val2.jpg",
                texto: "Apoyamos a pequeños productores locales.",
            },
            {
                titulo: "Sostenibilidad",
                imagen: "/img/Val3.jpg",
                texto: "Empaques biodegradables y procesos limpios.",
            },
        ],
    },
    pilares: {
        mision: {
            titulo: "Misión",
            texto: "Nutrir vidas con la esencia pura de la fruta.",
            imagen: "/img/Misi1.jpeg",
        },
        vision: {
            titulo: "Visión",
            texto: "Ser el referente de snacks saludables en México.",
            imagen: "/img/visi1.jpg",
        },
        valores: {
            titulo: "Valores",
            texto: "Honestidad, Calidad, Pasión, Compromiso.",
            imagen: "/img/valo1.jpg",
        },
        diferenciador: {
            titulo: "Diferenciador",
            texto: "Sabor real sin aditivos ni conservadores.",
            imagen: "/img/dif.jpg",
        },
    },
    certificaciones: [
        { nombre: "ISO 9001", icon: "iso9001", descripcion: "Gestión de Calidad Certificada" },
        { nombre: "ISO 22000", icon: "iso22000", descripcion: "Seguridad Alimentaria Garantizada" },
        { nombre: "NOM-051", icon: "nom051", descripcion: "Cumplimiento de Etiquetado" },
        { nombre: "NOM-251", icon: "nom251", descripcion: "Prácticas de Higiene" },
    ],
    proceso: {
        titulo: "Nuestro Proceso",
        pasos: [
            { titulo: "Selección", imagen: "/img/selec3.jpg" },
            { titulo: "Deshidratado", imagen: "/img/desh2.jpg" },
            { titulo: "Empaquetado", imagen: "/img/empa1.jpg" },
        ],
    },
    resenas: [
        { id: 1, usuario: "Ana G.", texto: "¡Me encantan! ", calificacion: 5 },
        { id: 2, usuario: "Carlos M.", texto: "¡Deliciosos!", calificacion: 5 },
        { id: 3, usuario: "Luisa P.", texto: "La piña es mi favorita.", calificacion: 4 },
        { id: 4, usuario: "Jorge R.", texto: "¡Los recomiendo!", calificacion: 5 },
    ],
};
