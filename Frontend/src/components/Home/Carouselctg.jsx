import React from 'react'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

const category=[
    "FrontEnd Developer",
    "BackEnd Developer",
    "Game Developer",
    "UI/UX Designer",
    "Data Analyst",
    "CyberSecurity",
]

function Carouselctg() {
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((cat,Index)=>(
                        <CarouselItem className="md:basis-1/3 lg-basis-1/3">
                            <button variant="outline" className="rounded-full p-2 bg-slate-300">{cat}</button>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        
    </div>
  )
}

export default Carouselctg