import React from 'react';
 // Asegúrate de ajustar la ruta a la ubicación de tu imagen

export default function ApplicationLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src={"/images/logos/chatbot.png"}
            alt="Application Logo"
            
        />
    );
}