interface GroqCaptionResponse {
    toptext: string;
    bottomtext: string;
  }
  
  interface CaptionImageParams {
    template_id: string;
    username: string;
    password: string;
    text0?: string;
    text1?: string;
    font?: string;
  }
  
  interface CaptionImageResponse {
    success: boolean;
    data?: {
      url: string;
      page_url: string;
    };
    error_message?: string;
  }
  
  const extractMemeTexts = async (text: string): Promise<GroqCaptionResponse> => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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` // Use environment variable
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `"${text}"\n\nJust give on top text and bottom text from this for placing on Drake Hotline Bling meme\n\nGive in json format below:\ntoptext:\nbottomtext:\n`
            }
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: false,
          response_format: {
            type: 'json_object'
          },
          stop: null
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("baaal=",data)
      // Assuming the response is in the format { choices: [{ message: { content: string } }] }
      const content = JSON.parse(data.choices[0].message.content);
      
      return {
        toptext: content.toptext || '',
        bottomtext: content.bottomtext || ''
      };
    } catch (error) {
      console.error('Error extracting meme texts:', error);
      return {
        toptext: '',
        bottomtext: ''
      };
    }
  };
  
  const createMemeImage = async (params: CaptionImageParams): Promise<CaptionImageResponse> => {
    try {
      // Create form data to send parameters
      const formData = new URLSearchParams();
      formData.append('template_id', params.template_id);
      formData.append('username', params.username);
      formData.append('password', params.password);
  
      // Add optional text parameters
      if (params.text0) formData.append('text0', params.text0);
      if (params.text1) formData.append('text1', params.text1);
      if (params.font) formData.append('font', params.font);
  
      // Make the API call
      const response = await fetch('https://api.imgflip.com/caption_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the response
      const data: CaptionImageResponse = await response.json();
  
      // Check API-level success
      if (!data.success) {
        return {
          success: false,
          error_message: data.error_message || 'Unknown error occurred'
        };
      }
  
      return data;
    } catch (error) {
      console.error('Error creating meme image:', error);
      return {
        success: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };
  
  // Combined function to generate meme from text
  export const generateMemeFromText = async (text: string): Promise<CaptionImageResponse> => {
    try {
      // Extract top and bottom texts from the input text
      const { toptext, bottomtext } = await extractMemeTexts(text);
  
      // Create meme image
      const memeResult = await createMemeImage({
        template_id: '181913649', // Drake Hotline Bling meme template
        username: 'Coolcat7',
        password: 'Aiisfuture12@@',
        text0: toptext,
        text1: bottomtext
      });
  
      return memeResult;
    } catch (error) {
      console.error('Error in meme generation:', error);
      return {
        success: false,
        error_message: 'Failed to generate meme'
      };
    }
  };
  
  // Example usage
  const createMeme = async () => {
    const text = "Some interesting text to be turned into a meme";
    const result = await generateMemeFromText(text);
  
    if (result.success && result.data) {
      console.log('Meme URL:', result.data.url);
      console.log('Meme Page URL:', result.data.page_url);
    } else {
      console.error('Meme creation failed:', result.error_message);
    }
  };
  
  