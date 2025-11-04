import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { VscTools } from "react-icons/vsc";
import { GoCreditCard } from "react-icons/go";
import { BiPalette } from "react-icons/bi";

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
    TbTruckDelivery,
    VscTools,
    GoCreditCard,
    BiPalette
};

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    const IconComponent = iconMap[icon];

    return (
        <div className='flex flex-col items-center text-center text-black p-0'>
            <div className='flex flex-col  justify-center items-center gap-2 p-4 mb-2'>
                {IconComponent && <IconComponent size={32}/>}
                <h3 className='font-bold text-xl text-[#2C3E1F]'>
                    {title}
                </h3>
            </div>

            <p className='text-base 2xl:max-w-[250px]'>
                {description}
            </p>
        </div>
    )
}
