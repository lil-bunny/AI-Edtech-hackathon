


// "use client"
// import React, { useState, useCallback } from 'react';
// import { Send, X } from 'lucide-react';

// // Define explicit interface for API response
// interface ExaSearchResult {
//   title: string;
//   url: string;
//   publishedDate: string;
//   summary: string;
// }

// interface ApiResponse {
//   results: ExaSearchResult[];
// }

// // Extracting API call to a separate function for better separation of concerns
// const fetchSearchResults = async (query: string): Promise<ApiResponse> => {
//   try {
//     const response = await fetch('https://api.exa.ai/search', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'x-api-key': 'a5b327ce-70c1-48cd-8dca-c9ff6a56b695', // Use environment variable
//       },
//       body: JSON.stringify({
//         query: query,
//         type: 'auto',
//         contents: {
//           summary: true,
//           livecrawl: 'always'
//         }
//       })
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('API call failed:', error);
//     throw error;
//   }
// };

// Custom Sidebar Component with TypeScript Props
// interface CustomSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   searchResults: ExaSearchResult[];
// }

// const CustomSidebar: React.FC<CustomSidebarProps> = ({ 
//   isOpen, 
//   onClose, 
//   searchResults 
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div 
//       className={`
//         fixed top-0 right-0 w-[500px] h-full bg-white shadow-lg 
//         transform transition-transform duration-300 ease-in-out
//         z-50 overflow-y-auto p-6
//       `}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Search Results</h2>
//         <button 
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-700"
//           aria-label="Close sidebar"
//         >
//           <X className="h-6 w-6" />
//         </button>
//       </div>
      
//       {searchResults.length > 0 ? (
//         <div className="space-y-4">
//           {searchResults.map((result, index) => (
//             <div 
//               key={index} 
//               className="border-b pb-4 last:border-b-0"
//             >
//               <h3 className="text-lg font-semibold text-blue-600 mb-2">
//                 <a 
//                   href={result.url} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="hover:underline"
//                 >
//                   {result.title}
//                 </a>
//               </h3>
//               <p className="text-gray-700 mb-2">
//                 {result.summary}
//               </p>
//               <div className="text-sm text-gray-500">
//                 Published: {new Date(result.publishedDate).toLocaleDateString()}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No results found.</p>
//       )}
//     </div>
//   );
// };

// const ExaSearchInterface: React.FC = () => {
//   const [inputText, setInputText] = useState<string>('');
//   const [searchResults, setSearchResults] = useState<ExaSearchResult[]>([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSearch = useCallback(async () => {
//     const trimmedText = inputText.trim();
//     if (!trimmedText) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const data = await fetchSearchResults(trimmedText);
//       setSearchResults(data.results);
//       setIsSidebarOpen(true);
//     } catch (err) {
//       const errorMessage = err instanceof Error 
//         ? err.message 
//         : 'An unknown error occurred';
      
//       setError(errorMessage);
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [inputText]);

//   const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && !isLoading) {
//       handleSearch();
//     }
//   }, [handleSearch, isLoading]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
//       <div className="w-full max-w-md shadow-lg bg-white rounded-lg">
//         <div className="p-6 space-y-4">
//           <div className="flex space-x-2">
//             <input 
//               type="text"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               placeholder="Search anything..."
//               className="flex-grow p-2 border rounded"
//               onKeyDown={handleInputKeyDown}
//               disabled={isLoading}
//             />
//             <button 
//               onClick={handleSearch} 
//               disabled={isLoading || !inputText.trim()}
//               className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
//               aria-label="Search"
//             >
//               {isLoading ? 'Searching...' : <Send className="h-5 w-5" />}
//             </button>
//           </div>
//           {error && (
//             <p className="text-red-500 text-sm text-center">{error}</p>
//           )}
//         </div>
//       </div>

//       <CustomSidebar 
//         isOpen={isSidebarOpen} 
//         onClose={() => setIsSidebarOpen(false)}
//         searchResults={searchResults}
//       />
//     </div>
//   );
// };

// export default ExaSearchInterface;


"use client"
import React, { useState, useCallback } from 'react';
import { Send, X, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

// Keeping previous interfaces and fetchSearchResults function
interface ExaSearchResult {
  title: string;
  url: string;
  publishedDate: string;
  summary: string;
}
interface CustomSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    searchResults: ExaSearchResult[];
  }
  
  const CustomSidebar: React.FC<CustomSidebarProps> = ({ 
    isOpen, 
    onClose, 
    searchResults 
  }) => {
    if (!isOpen) return null;
  
    return (
      <div 
        className={`
          fixed top-0 right-0 w-[500px] h-full bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out
          z-50 overflow-y-auto p-6
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className="border-b pb-4 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {result.title}
                  </a>
                </h3>
                <p className="text-gray-700 mb-2">
                  {result.summary}
                </p>
                <div className="text-sm text-gray-500">
                  Published: {new Date(result.publishedDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    );
  };
interface ApiResponse {
  results: ExaSearchResult[];
}

const fetchSearchResults = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await fetch('https://api.exa.ai/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'a5b327ce-70c1-48cd-8dca-c9ff6a56b695',
      },
      body: JSON.stringify({
        query: query,
        type: 'auto',
        contents: {
          summary: true,
          livecrawl: 'always'
        }
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Previous CustomSidebar component remains the same

const ExaSearchInterface: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ExaSearchResult[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Social media platforms with their details
  const platforms = [
    { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { name: 'Twitter', icon: Twitter, color: 'text-sky-500' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-700' }
  ];

  const handleSearch = useCallback(async () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    setIsLoading(true);
    setError(null);

    // Log selected platform
    console.log(`Searching on: ${selectedPlatform || 'All Platforms'}`);

    try {
      const data = await fetchSearchResults(trimmedText);
      setSearchResults(data.results);
      setIsSidebarOpen(true);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An unknown error occurred';
      
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, selectedPlatform]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  }, [handleSearch, isLoading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md shadow-lg bg-white rounded-lg">
        <div className="p-6 space-y-4">
          <div className="flex space-x-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Search anything..."
              className="flex-grow p-2 border rounded"
              onKeyDown={handleInputKeyDown}
              disabled={isLoading}
            />
            <button 
              onClick={handleSearch} 
              disabled={isLoading || !inputText.trim()}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
              aria-label="Search"
            >
              {isLoading ? 'Searching...' : <Send className="h-5 w-5" />}
            </button>
          </div>

          {/* Social Media Platform Selector */}
          <div className="flex justify-center space-x-4 py-2">
            {platforms.map((platform) => (
              <label 
                key={platform.name} 
                className={`
                  flex flex-col items-center cursor-pointer 
                  ${selectedPlatform === platform.name 
                    ? `${platform.color} scale-110` 
                    : 'text-gray-400 opacity-50'}
                  transition-all duration-300 ease-in-out
                `}
              >
                <input 
                  type="radio" 
                  name="platform" 
                  value={platform.name}
                  checked={selectedPlatform === platform.name}
                  onChange={() => setSelectedPlatform(platform.name)}
                  className="hidden"
                />
                <platform.icon 
                  className={`
                    h-6 w-6 mb-1 
                    ${selectedPlatform === platform.name 
                      ? 'transform scale-110' : ''}
                  `} 
                />
                <span className="text-xs">{platform.name}</span>
              </label>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>
      </div>

      <CustomSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        searchResults={searchResults}
      />
    </div>
  );
};

export default ExaSearchInterface;