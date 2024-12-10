import axios from 'axios';

interface VectaraQueryParams {
  query: string;
  customerId: string;
  apiKey: string;
}

interface VectaraSearchCorpus {
  corpus_key: string;
  metadata_filter?: string;
  lexical_interpolation?: number;
  custom_dimensions?: Record<string, unknown>;
}

export const performVectaraQuery = async ({
  query,
  customerId,
  apiKey
}: VectaraQueryParams) => {
  const payload = {
    query,
    search: {
      corpora: [
        {
          corpus_key: "AIhackathon",
          metadata_filter: "",
          lexical_interpolation: 0.005,
          custom_dimensions: {}
        }
      ],
      offset: 0,
      limit: 25,
      context_configuration: {
        sentences_before: 2,
        sentences_after: 2,
        start_tag: "%START_SNIPPET%",
        end_tag: "%END_SNIPPET%"
      },
      reranker: {
        type: "customer_reranker",
        reranker_id: "rnk_272725719"
      }
    },
    generation: {
      generation_preset_name: "mockingbird-1.0-2024-07-16",
      max_used_search_results: 5,
      response_language: "eng",
      enable_factual_consistency_score: true
    },
    save_history: true
  };

  try {
    const response = await axios.post(
      'https://api.vectara.io:443/v2/query',
      payload,
      {
        headers: {
          'customer-id': customerId,
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Vectara Query Error:', error);
    throw error;
  }
};