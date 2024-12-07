import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LessonPlanViewProps {
  content: string;
}

const LessonPlanView: React.FC<LessonPlanViewProps> = ({ content }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Detailed Lesson Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="prose max-w-full">
        <ReactMarkdown>{content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default LessonPlanView;