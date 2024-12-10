// import { renderVideoWithShotstackHackathon } from './rendervideo';
// import { extractIdFromResponse } from './extractid';
// import { checkRenderStatus } from './checkrenderstatus';

// export async function generateVideo(): Promise<{ status: string; videoUrl: string }> {
//   const apiKey = 'Ys5pUGphwl29MpE4LO8aR9Lc27Ycnm9ppGebd39w';
  
//   try {
//     // Render the video
//     const renderResponse = await renderVideoWithShotstackHackathon(apiKey, {});
    
//     // Extract the render ID
//     if (!renderResponse) {
//       return {
//         status: 'failed',
//         videoUrl: ''
//       };
//     }
    
//     const renderedId = extractIdFromResponse(renderResponse);
    
//     // Check render status if ID is found
//     if (renderedId) {
//       return await checkRenderStatus(apiKey, renderedId);
//     }
    
//     // If no ID found, return failure
//     return {
//       status: 'failed',
//       videoUrl: ''
//     };
//   } catch (error) {
//     console.error('Error in video generation:', error);
//     return {
//       status: 'failed',
//       videoUrl: ''
//     };
//   }
// }