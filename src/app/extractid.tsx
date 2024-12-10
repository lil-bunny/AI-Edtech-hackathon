interface ApiResponse {
    success?: boolean;
    response?: {
      id?: string;
    };
  }
  
  export function extractIdFromResponse(apiResponse: Record<string, any>): string | null {
    try {
      // Check if 'response' contains an 'id'
      if (
        apiResponse 
        && (apiResponse.success === true || apiResponse.success === undefined)
        && apiResponse.response 
        && apiResponse.response.id
      ) {
        return apiResponse.response.id;
      } else {
        console.log("Invalid response format or missing 'id'.");
        return null;
      }
    } catch (error) {
      console.error(`Error while extracting 'id': ${error instanceof Error ? error.message : error}`);
      return null;
    }
  }