import { z } from 'zod';

// Zod schema for type validation
const DocumentPartSchema = z.object({
  text: z.string(),
  metadata: z.object({
    type: z.string()
  }),
  context: z.string(),
  custom_dimensions: z.record(z.string(), z.unknown()).optional()
});

const DocumentMetadataSchema = z.object({
  title: z.string(),
  lang: z.string()
});

const VectaraDocumentSchema = z.object({
  id: z.string(),
  type: z.string(),
  metadata: DocumentMetadataSchema,
  document_parts: z.array(DocumentPartSchema)
});

// Type for the input parameters
type VectaraDocumentUploadParams = {
  id: string;
  title: string;
  text: string;
  context: string;
  apiKey: string;
};

/**
 * Upload a document to Vectara Corpus
 * @param params - Parameters for document upload
 * @returns Promise resolving to the API response
 */
export const uploadVectaraDocument = async ({
  id, 
  title, 
  text, 
  context,
  apiKey
}: VectaraDocumentUploadParams): Promise<Response> => {
  // Construct the document payload
  const documentPayload = {
    id,
    type: 'core',
    metadata: {
      title,
      lang: 'eng'
    },
    document_parts: [
      {
        text,
        metadata: {
          type: 'summary'
        },
        context,
        custom_dimensions: {}
      }
    ]
  };

  // Validate the payload using Zod
  try {
    VectaraDocumentSchema.parse(documentPayload);
  } catch (validationError) {
    console.error('Document payload validation failed:', validationError);
    throw new Error('Invalid document payload');
  }

  try {
    const response = await fetch(
      'https://api.vectara.io/v2/corpora/AIhackathon/documents', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(documentPayload)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${errorText}`);
    }else{
        const success = await response.text();
        console.log("document created",success)
    }

    return response;
  } catch (error) {
    console.error('Vectara document upload error:', error);
    throw error;
  }
};