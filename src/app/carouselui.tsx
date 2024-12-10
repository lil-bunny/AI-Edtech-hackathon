"use client";
import React, { useState } from 'react';
import { AlertCircle, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LinkedinCarouselUI from './carouselcomponent';

interface CarouselSlide {
  slide_no: number;
  slide_text: string;
  image_url?: string;
}

type CarouselContent = {
  [key: number]: CarouselSlide;
};

export default function LinkedinCarouselGenerator(): React.JSX.Element {
  const [inputText, setInputText] = useState<string>('');
  const [carouselContent, setCarouselContent] = useState<CarouselContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateCarousel = async (): Promise<void> => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://slidegptbackend.wittyforest-7ed950b1.centralindia.azurecontainerapps.io/generate-carousel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input_text: inputText })
      });

      if (!response.ok) {
        throw new Error('Failed to generate carousel');
      }

      const data = await response.json();
      
      // Transform the response to match the CarouselContent type
      const transformedContent: CarouselContent = data.carousel_slides.reduce((acc: CarouselContent, slide: any) => {
        acc[parseInt(slide.slide_no)] = {
          slide_no: parseInt(slide.slide_no),
          slide_text: slide.slide_text,
          image_url: slide.image_url
        };
        return acc;
      }, {});

      setCarouselContent(transformedContent);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="relative">
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter content for LinkedIn carousel"
            className="pr-12 rounded-full"
          />
          <Button 
            onClick={generateCarousel} 
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 w-10 h-10"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        {error && (
          <Card className="border-red-500 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <AlertCircle className="mr-2" /> Error
              </CardTitle>
            </CardHeader>
            <CardContent>{error}</CardContent>
          </Card>
        )}

        {carouselContent && (
          <LinkedinCarouselUI carouselContent={carouselContent} />
        )}
      </div>
    </div>
  );
}