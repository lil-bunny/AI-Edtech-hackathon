"use client"
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import axios from 'axios';

import LessonResultContainer from './lessonresultcontainer';


interface FormData {
  subject: string;
  curriculum: string;
  ageGroup: string;
  skillLevel: string;
  interests: string;
  lessonDuration: number;
  focusAreas: string[];
  gamificationStyle: string;
  learningChallenges: string;
}

const INITIAL_FORM_DATA: FormData = {
  subject: '',
  curriculum: '',
  ageGroup: '',
  skillLevel: '',
  interests: '',
  lessonDuration: 60,
  focusAreas: [],
  gamificationStyle: '',
  learningChallenges: ''
};

const AGE_GROUPS = [
  { value: '5-7', label: '5-7 years' },
  { value: '8-10', label: '8-10 years' },
  { value: '11-13', label: '11-13 years' },
  { value: '14-16', label: '14-16 years' }
];

const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

export default function LessonPlannerForm(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [lessonPlan, setLessonPlan] = useState<null|any>(null);
  const [loading, setLoading] = useState<null|any>(false);
  const [error, setError] = useState<null|any>(null);

  const handleInputChange = useCallback((field: keyof FormData) => 
    (value: string | number) => {
      setFormData(prevData => ({
        ...prevData,
        [field]: value
      }));
    }, 
  []);

  const handleFocusAreasChange = useCallback((area: string) => 
    (checked: boolean) => {
      setFormData(prevData => {
        const updatedAreas = checked
          ? [...prevData.focusAreas, area]
          : prevData.focusAreas.filter(existing => existing !== area);
        
        return {
          ...prevData,
          focusAreas: updatedAreas
        };
      });
    }, 
  []);
  const generateLessonPlanAndQuestionnaire = async (inputObject:{}) => {
    setLoading(true);
    setError(null);
    console.log(inputObject)
    try {
      // First API call for questionnaire
      const questionnaireResponse = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          messages: [
            {
              role: 'user',
              content: `Based on the lesson plan and ${JSON.stringify(inputObject)} 

Create Mix of Fill in the blanks and Mcq and create 20 questionnaire
Give response in json format:
 [question:,   type:,   options:,   correct_Answer:]`
            }
          ],
          model: 'llama3-8b-8192',
          temperature: 0.2,
          max_tokens: 1750,
          top_p: 1,
          stream: false,
          response_format: {
            type: 'json_object'
          },
          stop: null
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
          }
        }
      );
   
      console.log(questionnaireResponse.data.choices[0].message.content)
      // Second API call for lesson plan
      const lessonPlanResponse = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          messages: [
            {
              role: 'user',
              content: `Create a lesson plan based on this ${JSON.stringify(inputObject)}
Dont add unnecessary text`
            }
          ],
          model: 'llama3-8b-8192',
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: false,
          stop: null
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
          }
        }
      );
     
      // Combine results
      console.log(lessonPlanResponse.data)
     
      setLessonPlan({
        entire_lessonplan: lessonPlanResponse.data.choices[0].message.content,
        questionnaire: JSON.parse(questionnaireResponse.data.choices[0].message.content)
      });

      
      setLoading(false);
    } catch (err) {
      setError('Failed to generate lesson plan and questionnaire');
      setLoading(false);
      console.error(err);
    }
  };
 

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
     {lessonPlan === null ?  (<Card className="w-full max-w-5xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Welcome to the AI Tutoring Lesson Planner
          </CardTitle>
          <p className="text-gray-500 mt-2">
            Effortlessly create engaging, personalized, and curriculum-aligned lesson plans.
          </p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Input Fields */}
          <div className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject/Topic
              </label>
              <Input 
                id="subject"
                placeholder="e.g., Maths - Fractions" 
                value={formData.subject}
                onChange={(e) => handleInputChange('subject')(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="curriculum" className="block text-sm font-medium text-gray-700 mb-2">
                Curriculum
              </label>
              <Input 
                id="curriculum"
                placeholder="Enter curriculum details"
                value={formData.curriculum}
                onChange={(e) => handleInputChange('curriculum')(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age-group" className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group
                </label>
                <Select 
                  value={formData.ageGroup}
                  onValueChange={handleInputChange('ageGroup')}
                >
                  <SelectTrigger id="age-group">
                    <SelectValue placeholder="Select Age Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_GROUPS.map(group => (
                      <SelectItem 
                        key={group.value} 
                        value={group.value}
                      >
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="skill-level" className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Level
                </label>
                <Select 
                  value={formData.skillLevel}
                  onValueChange={handleInputChange('skillLevel')}
                >
                  <SelectTrigger id="skill-level">
                    <SelectValue placeholder="Select Skill Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_LEVELS.map(level => (
                      <SelectItem 
                        key={level.value} 
                        value={level.value}
                      >
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                Student Interests
              </label>
              <Input 
                id="interests"
                placeholder="e.g., Loves dinosaurs and space"
                value={formData.interests}
                onChange={(e) => handleInputChange('interests')(e.target.value)}
              />
            </div>

            <div>
              <label 
                htmlFor="lesson-duration" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Lesson Duration: {formData.lessonDuration} minutes
              </label>
              <Slider
                id="lesson-duration"
                defaultValue={[60]}
                max={120}
                min={30}
                step={30}
                onValueChange={(value:any) => handleInputChange('lessonDuration')(value[0])}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Areas
              </label>
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="theory"
                  checked={formData.focusAreas.includes('theory')}
                  onCheckedChange={handleFocusAreasChange('theory')}
                />
                <label htmlFor="theory" className="text-sm">Theory-heavy</label>
                
                <Checkbox 
                  id="practice"
                  checked={formData.focusAreas.includes('practice')}
                  onCheckedChange={handleFocusAreasChange('practice')}
                />
                <label htmlFor="practice" className="text-sm">Practice-heavy</label>
              </div>
            </div>

            <Button 
              className="w-full mt-6" 
              onClick={()=>generateLessonPlanAndQuestionnaire(formData)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Lesson Plan...
                </>
              ) : (
                'Generate Lesson Plan'
              )}
            </Button>
          </div>

          {/* Right Column - Tips and Preview */}
          <div className="hidden md:block bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Tips for Creating the Perfect Lesson Plan
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>✨ Be specific about the subject and curriculum</li>
              <li>🎯 Choose the most appropriate age group and skill level</li>
              <li>🌟 Include unique student interests for personalization</li>
              <li>⏱️ Select a lesson duration that matches learning objectives</li>
              <li>🔍 Balance theory and practice based on student needs</li>
            </ul>
          </div>
        </CardContent>
      </Card>):(
        <LessonResultContainer lessonPlan={lessonPlan}  />
      )}
    </div>
  );
}