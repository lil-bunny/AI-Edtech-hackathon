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

type CarouselContent = Record<string, CarouselSlide>;

export default function LinkedinCarouselGenerator(): React.JSX.Element {
  const [inputText, setInputText] = useState<string>('');
  const [carouselContent, setCarouselContent] = useState<CarouselContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlacidImage = async (slideText: string): Promise<string | null> => {
    try {
      const initialResponse = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideText })
      });
  
      const { polling_url, error } = await initialResponse.json();
  
      if (error) {
        console.error('Placid API Error:', error);
        return null;
      }
  
      if (!polling_url) {
        console.error('No polling URL received');
        return null;
      }
  
      const maxAttempts = 10;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 3000));
  
        const pollingResponse = await fetch(`/api/generate-image?polling_url=${encodeURIComponent(polling_url)}`);
        const pollingData = await pollingResponse.json();
  
        switch (pollingData.status) {
          case 'finished':
            return pollingData.image_url || null;
          case 'failed':
            console.error('Image generation failed');
            return null;
          case 'queued':
          case 'processing':
            continue;
        }
      }
  
      return null;
    } catch (err) {
      console.error('Image generation error:', err);
      return null;
    }
  };

  const generateCarousel = async (): Promise<void> => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.5,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: "Respond ONLY with valid JSON. Generate 4 LinkedIn carousel slides. Each slide should be under 10 words with an emoji. Format: {1:{slide_no:1,slide_text:'Emoji Description'}, 2:{...}, 3:{...}, 4:{...}}"
            },
            {
              role: "user",
              content: inputText
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch carousel content');
      }

      const data = await response.json();
      const messageContent = data.choices[0].message.content.trim();
      
      const carouselData: CarouselContent = JSON.parse(messageContent);

      const slidesWithImages = await Promise.all(
        Object.entries(carouselData).map(async ([key, slide]) => {
          const image_url = await generatePlacidImage(slide.slide_text);
          return [key, { ...slide, image_url }];
        })
      );

      const finalCarouselContent = Object.fromEntries(slidesWithImages);
      setCarouselContent(finalCarouselContent);

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