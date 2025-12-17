import mueble1 from  "@/modules/landing/assets/muebles_principales/mueble_1.png"
import mueble2 from  "@/modules/landing/assets/muebles_principales/mueble_2.png"
import mueble3 from  "@/modules/landing/assets/muebles_principales/mueble_3.png"
import { StaticImageData } from "next/image";

export type Mueble = {
    nombre: string;
    precio: string;
    imagen: StaticImageData;
}

export const muebles: Mueble[] = [
    {
        nombre: "Sofá Moderno",
        precio: "$1,200,000",
        imagen: mueble1
    },
    {
        nombre: "Silla Ejecutiva",
        precio: "$800,000",
        imagen: mueble2
    },
    {
        nombre: "Mesa de Comedor",
        precio: "$1,500,000",
        imagen: mueble3
    },
     {
        nombre: "Sofá Moderno",
        precio: "$1,200,000",
        imagen: mueble1
    },
    {
        nombre: "Silla Ejecutiva",
        precio: "$800,000",
        imagen: mueble2
    },
    {
        nombre: "Mesa de Comedor",
        precio: "$1,500,000",
        imagen: mueble3
    }
]