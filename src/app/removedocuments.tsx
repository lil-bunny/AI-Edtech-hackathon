import axios from 'axios';

interface VectaraDocument {
  id: string;
  metadata: {
    title: string;
    lang: string;
  };
}

interface VectaraDocumentResponse {
  documents: VectaraDocument[];
  metadata: {
    page_key: string;
  };
}

export const fetchVectaraDocuments = async (apiKey: string): Promise<VectaraDocument[]> => {
  try {
    const response = await axios.get<VectaraDocumentResponse>(
      'https://api.vectara.io/v2/corpora/AIhackathon/documents',
      {
        headers: {
          'Accept': 'application/json',
          'x-api-key': apiKey
        }
      }
    );
    return response.data.documents;
  } catch (error) {
    console.error('Failed to fetch documents:', error);
    throw error;
  }
};

export const deleteVectaraDocument = async (documentId: string, apiKey: string): Promise<void> => {
  try {
    await axios.delete(
      `https://api.vectara.io/v2/corpora/AIhackathon/documents/${encodeURIComponent(documentId)}`,
      {
        headers: {
          'x-api-key': apiKey
        }
      }
    );
  } catch (error) {
    console.error(`Failed to delete document ${documentId}:`, error);
    throw error;
  }
};

export const deleteAllVectaraDocuments = async (apiKey: string): Promise<void> => {
  try {
    const documents = await fetchVectaraDocuments(apiKey);
    
    const deletePromises = documents.map(doc => 
      deleteVectaraDocument(doc.id, apiKey)
    );

    console.log(`Deleted =${deletePromises}`)
    await Promise.allSettled(deletePromises);
    
    console.log(`Deleted ${documents.length} documents`);
  } catch (error) {
    console.error('Failed to delete all documents:', error);
    throw error;
  }
};