import axios from 'axios';

interface VectaraChatTurnParams {
  query: string;
  customerId: string;
  authToken: string;
  chatId: string;
}

export const createVectaraChatTurn = async ({
  query,
  customerId,
  authToken,
  chatId
}: VectaraChatTurnParams) => {
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
    chat: {
      store: true
    }
  };

  try {
    const response = await axios.post(
      `https://api.vectara.io:443/v2/chats/${chatId}/turns`,
      payload,
      {
        headers: {
          'customer-id': customerId,
          'Content-Type': 'application/json',
          'x-api-key': `${authToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Vectara Chat Turn Error:', error);
    throw error;
  }
};