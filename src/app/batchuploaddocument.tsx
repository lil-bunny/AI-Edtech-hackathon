import { uploadVectaraDocument } from "./vectaradocumentupload";


/**
 * Uploads documents to Vectara using async forEach
 * @param data Array of documents to upload
 * @param apiKey Vectara API key
 */
export const uploadAllDocuments = async (
  data: Array<{
    url: string;
    title: string;
    summary: string;
  }>,
  apiKey: string
): Promise<void> => {
  // Create a queue to manage concurrent uploads
  const uploadQueue: Promise<void>[] = [];

  data.forEach((doc) => {
    const uploadPromise = (async () => {
      try {
        await uploadVectaraDocument({
          id: doc.url,
          title: doc.title,
          text: doc.summary,
          context: doc.summary,
          apiKey: apiKey
        });
        console.log(`Successfully uploaded: ${doc.url}`);
      } catch (error) {
        console.error(`Failed to upload document ${doc.url}:`, error);
        // Optionally rethrow to be caught by Promise.allSettled
        throw error;
      }
    })();

    uploadQueue.push(uploadPromise);
  });

  // Wait for all uploads to complete
  await Promise.allSettled(uploadQueue);
};

// Example usage
export const runDocumentUpload = async (data: any) => {
  try {
    const API_KEY ='zut_AsgXVROiKzaKIw3Q6bGD0K6ZrIn13Ga_AywCLA';
    await uploadAllDocuments(data.results, API_KEY);
  } catch (error) {
    console.error('Batch upload process failed:', error);
  }
};

