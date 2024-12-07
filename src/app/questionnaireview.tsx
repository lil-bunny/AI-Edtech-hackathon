import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Lightbulb, Loader2 } from "lucide-react";
import axios from 'axios';

interface Question {
  question: string;
  type: 'multipleChoice' | 'fillInTheBlank';
  options?: string[];
  correctAnswer: string;
}

interface QuestionCardProps {
  question: Question;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);

  const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  const verifyAnswer = async () => {
    setIsLoading(true);
    setSolution(null);

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          messages: [
            {
              role: 'user',
              content: `Just tell whether the answer is correct or not (respond with only YES or NO)
Question: ${question.question}
User Answer: ${selectedAnswer}
Correct Answer: ${question.correctAnswer}`
            }
          ],
          model: 'llama3-8b-8192',
          temperature: 1,
          max_tokens: 10,
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

      const apiResponse = response.data.choices[0].message.content.trim().toUpperCase();
      console.log()
      const isAnswerCorrect = apiResponse === 'YES';

      setIsCorrect(isAnswerCorrect);

      if (!isAnswerCorrect) {
        // If answer is incorrect, fetch solution
        const solutionResponse = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            messages: [
              {
                role: 'user',
                content: `Provide a step-by-step solution to this question
Question: ${question.question}
Correct Answer: ${question.correctAnswer}`
              }
            ],
            model: 'llama3-8b-8192',
            temperature: 1,
            max_tokens: 300,
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
      

        setSolution(solutionResponse.data.choices[0].message.content.trim());
      }
    } catch (error) {
      console.error('API Error:', error);
      setIsCorrect(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderQuestionInput = () => {
    // Text input for fill-in-the-blank questions
    if (question.type === 'fillInTheBlank') {
      return (
        <div className="space-y-2">
          <Input 
            placeholder="Type your answer here"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            className={`
              w-full
              ${isCorrect === false ? 'border-red-500' : ''}
              ${isCorrect === true ? 'border-green-500' : ''}
            `}
            disabled={isLoading}
          />
        </div>
      );
    }

    // Option buttons for multiple-choice questions
    return (
      <div className="space-y-2">
        {question.options && question.options.map((option, idx) => (
          <Button
            key={idx}
            variant={selectedAnswer === option ? 'default' : 'outline'}
            onClick={() => setSelectedAnswer(option)}
            className="w-full justify-start"
            disabled={isLoading}
          >
            {option}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full mb-4 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Question {index + 1}</span>
          {isCorrect === false && <AlertCircle className="text-red-500" />}
          {isCorrect === true && <AlertCircle className="text-green-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        
        {renderQuestionInput()}
        
        <div className="flex space-x-2">
          <Button 
            onClick={verifyAnswer} 
            className="w-full"
            disabled={isLoading || !selectedAnswer}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Submit Answer'
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowHint(!showHint)}
            className="w-1/3 flex items-center"
            disabled={isLoading}
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Hint
          </Button>
        </div>
        
        {showHint && (
          <div className="mt-2 p-2 bg-yellow-50 rounded-md">
            <p className="text-yellow-800">Correct Answer: {question.correctAnswer}</p>
          </div>
        )}
        
        {isCorrect === false && (
          <div className="mt-2 p-2 bg-red-50 rounded-md text-red-800 space-y-2">
            <p>Incorrect. Try again!</p>
            {solution && (
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="font-semibold mb-2">Solution:</h4>
                <p>{solution}</p>
              </div>
            )}
          </div>
        )}
        
        {isCorrect === true && (
          <div className="mt-2 p-2 bg-green-50 rounded-md text-green-800">
            Correct! Great job!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface QuestionnaireViewProps {
  questions: Question[];
}

const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({ questions }) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">
        No questions available.
      </div>
    );
  }
  
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Questionnaire</h2>
      {questions.map((question, index) => (
        <QuestionCard 
          key={index} 
          question={question} 
          index={index} 
        />
      ))}
    </div>
  );
};
export default QuestionnaireView;

// Example Usa