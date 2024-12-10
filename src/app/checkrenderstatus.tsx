import axios from 'axios';

interface RenderStatusResponse {
  status: 'pending' | 'done' | 'failed';
  url?: string;
}

export async function checkRenderStatus(
  apiKey: string, 
  renderId: string, 
  maxAttempts: number = 30, 
  intervalMs: number = 10000
): Promise<{ status: string; url: string }> {
  const urls = `https://api.shotstack.io/edit/stage/render/${renderId}`;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await axios.get<{ response: RenderStatusResponse }>(urls, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });

      const { status, url } = response.data.response;

      switch (status) {
        case 'done':
            console.log( response.data.response)
          return { 
            status: 'done', 
            url: url || '' 
          };
        case 'failed':
          return { 
            status: 'failed',
            url: '' 
          };
        default:
          // If not done, wait and continue
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));
            continue;
          }
      }
    } catch (error) {
      // If it's the last attempt, throw the error
      if (attempt === maxAttempts) {
        throw new Error(`Render status check failed after ${maxAttempts} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
  }

  // If we've exhausted all attempts
  return {
    status: 'failed',
    url: ''
  };
}