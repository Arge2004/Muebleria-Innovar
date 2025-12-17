import React from 'react'
import FeatureCard from '@/modules/landing/components/featureCard'
import { features } from '@/modules/landing/data/features'

export default function FeaturesSection() {
    return (
        <section className='w-full py-16 '>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
