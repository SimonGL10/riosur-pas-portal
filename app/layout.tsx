import type { Metadata } from "next"; import "./globals.css";
export const metadata:Metadata={title:"RíoSur Seguros PAS",description:"Portal local de productores asesores"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
