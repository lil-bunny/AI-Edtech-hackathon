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
  
  // Example usage
  const generateMeme = async () => {
    try {
      const memeResult = await createMemeImage({
        template_id: '181913649', // Example template ID (Drake Hotline Bling)
        username: 'your_imgflip_username',
        password: 'your_imgflip_password',
        text0: 'Top text here',
        text1: 'Bottom text here'
      });
  
      if (memeResult.success && memeResult.data) {
        console.log('Meme URL:', memeResult.data.url);
        console.log('Meme Page URL:', memeResult.data.page_url);
      } else {
        console.error('Meme creation failed:', memeResult.error_message);
      }
    } catch (error) {
      console.error('Error in meme generation:', error);
    }
  };