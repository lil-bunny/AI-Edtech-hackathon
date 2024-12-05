"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  slide_no: number;
  slide_text: string;
  image_url?: string;
}

type CarouselContent = Record<string, CarouselSlide>;

export default function LinkedinCarouselUI({ carouselContent }: { carouselContent: CarouselContent }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = Object.values(carouselContent);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-[500px] flex transition-transform duration-300">
        {slides.map((slide, index) => (
          <div 
            key={slide.slide_no} 
            className={`absolute w-full h-full flex flex-col justify-center items-center p-6 transition-opacity duration-300 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.image_url && (
              <img 
                src={slide.image_url} 
                alt={`Slide ${slide.slide_no}`} 
                className="max-w-full max-h-72 object-contain mb-4"
              />
            )}
            <p className="text-xl text-center">{slide.slide_text}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <button 
        onClick={prevSlide} 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
      >
        <ChevronLeft className="text-gray-700" />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
      >
        <ChevronRight className="text-gray-700" />
      </button>

      <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500">
        Made with ❤️ by <a 
          href="https://www.linkedin.com/in/debdut-bhaduri-32323156/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline"
        >
          Debdut Bhaduri
        </a>
      </div>
    </div>
  );
}