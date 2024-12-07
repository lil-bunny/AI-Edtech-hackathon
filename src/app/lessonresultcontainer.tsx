
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LessonPlanView from './lessonplanview';
import QuestionnaireView from './questionnaireview';


interface LessonResultProps {
  lessonPlan: {
    entire_lessonplan: string;
    questionnaire: {
      questions: [];
    };
  };
}

const LessonResultContainer: React.FC<LessonResultProps> = ({ lessonPlan }) => {
  const [activeTab, setActiveTab] = useState('lessonPlan');
  function parseQuestionnaireString(jsonString: string): [] {
    try {
      // Parse the JSON string
      const parsedData = JSON.parse(jsonString);
      
      // Map the parsed questions to our Question interface
      return parsedData.questions.map((q: any, index: number) => ({
        id: `q-${index + 1}`, // Generate a unique ID
        question: q.question,
        type: q.type === 'mcq' ? 'multipleChoice' : q.type,
        options: q.options || [], // Ensure options exists
        correctAnswer: q.correctAnswer,
        // Optionally add a hint if needed
        hint: q.hint || undefined
      }));
    } catch (error) {
      console.error('Error parsing questionnaire string:', error);
      return []; // Return empty array if parsing fails
    }
  }
//   var queslist=parseQuestionnaireString(`${lessonPlan.questionnaire}`)
// console.log("baal",queslist)
  return (
    <div className="container mx-auto p-4">
      <Tabs 
        defaultValue="lessonPlan" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessonPlan">Lesson Plan</TabsTrigger>
          <TabsTrigger value="questionnaire">Questionnaire</TabsTrigger>
        </TabsList>
        <TabsContent value="lessonPlan">
          <LessonPlanView content={lessonPlan.entire_lessonplan} />
        </TabsContent>
        <TabsContent value="questionnaire">
          <QuestionnaireView questions={lessonPlan.questionnaire.questions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonResultContainer;