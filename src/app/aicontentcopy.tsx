"use client"
import React, { useState, useCallback } from 'react';
import { Send, X, Linkedin, Twitter, Instagram, Facebook, Link, ChevronUp, ChevronDown, LinkIcon, ImageIcon, Film, Laugh } from 'lucide-react';
import axios from 'axios';
import { uploadVectaraDocument } from './vectaradocumentupload';
import { runDocumentUpload, uploadAllDocuments } from './batchuploaddocument';
import { createVectaraChatTurn } from './vectaraquery';
import { performVectaraQuery } from './vectaraanswer';
import { json } from 'stream/consumers';
import { deleteAllVectaraDocuments } from './removedocuments';
import { getClipData, renderVideoWithShotstackHackathon } from './rendervideo';
import { extractIdFromResponse } from './extractid';
import { checkRenderStatus } from './checkrenderstatus';
import { generateMemeFromText } from './createnewmeme';


  const ExaSearchInterface: React.FC = () => {
    interface ExaSearchResult {
    title: string;
    url: string;
    publishedDate: string;
    summary: string;
    image?: string;
  }
  
  interface GeneratedPost {
    content: string;
    platform: string;
  }
  
const downloadMedia = (src: string, filename: string) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = src;
    link.download = filename || 'downloaded-media';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const LinkedInPostPreview: React.FC<{ 
    post: string, 
    image?: string, 
    mediaType?: string 
  }> = ({ post, image, mediaType }) => (
    <div className="bg-white border rounded-lg shadow-md w-full max-w-md p-4">
      <div className="flex items-start mb-4">
        <img 
          src="/api/placeholder/50/50" 
          alt="Profile" 
          className="w-12 h-12 rounded-full mr-3" 
        />
        <div>
          <p className="font-semibold text-sm">Your Name</p>
          <p className="text-xs text-gray-500">Posted on LinkedIn</p>
        </div>
      </div>
      
      {image && (
        <div className="mb-4 flex justify-center relative">
          {mediaType?.toLowerCase() === 'video' ? (
            <div className="w-full max-h-[500px] bg-black flex items-center justify-center rounded-xl overflow-hidden relative">
              <video 
                controls 
                className="max-w-full max-h-full object-contain"
              >
                <source src={image} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button 
                onClick={() => downloadMedia(image, 'linkedin-video')}
                className="absolute top-2 right-2 bg-white/70 hover:bg-white p-2 rounded-full text-xs"
              >
                ⬇️ Download
              </button>
            </div>
          ) : (
            <div className="w-full max-h-[500px] flex items-center justify-center relative">
              <img 
                src={image} 
                alt="Post" 
                className="max-w-full max-h-full object-contain rounded-lg" 
              />
              <button 
                onClick={() => downloadMedia(image, 'linkedin-image')}
                className="absolute top-2 right-2 bg-white/70 hover:bg-white p-2 rounded-full text-xs"
              >
                ⬇️ Download
              </button>
            </div>
          )}
        </div>
      )}
      
      <p className="text-sm text-gray-800 mb-4">{post}</p>
      
      <div className="flex justify-between text-gray-500 text-xs">
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>🔁 Repost</span>
        <span>✉️ Send</span>
      </div>
    </div>
  );
//   // Platform-specific preview components
//   const LinkedInPostPreview: React.FC<{ 
//     post: string, 
//     image?: string, 
//     mediaType?: string 
//   }> = ({ post, image, mediaType }) => (
//     <div className="bg-white border rounded-lg shadow-md w-full max-w-md p-4">
//       <div className="flex items-start mb-4">
//         <img 
//           src="/api/placeholder/50/50" 
//           alt="Profile" 
//           className="w-12 h-12 rounded-full mr-3" 
//         />
//         <div>
//           <p className="font-semibold text-sm">Your Name</p>
//           <p className="text-xs text-gray-500">Posted on LinkedIn</p>
//         </div>
//       </div>
      
//       {image && (
//         <div className="mb-4 flex justify-center">
//           {mediaType?.toLowerCase() === 'video' ? (
//             <div className="w-full max-h-[500px] bg-black flex items-center justify-center rounded-xl overflow-hidden">
//               <video 
//                 controls 
//                 className="max-w-full max-h-full object-contain"
//               >
//                 <source src={image} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           ) : (
//             <div className="w-full max-h-[500px] flex items-center justify-center">
//               <img 
//                 src={image} 
//                 alt="Post" 
//                 className="max-w-full max-h-full object-contain rounded-lg" 
//               />
//             </div>
//           )}
//         </div>
//       )}
      
//       <p className="text-sm text-gray-800 mb-4">{post}</p>
      
//       <div className="flex justify-between text-gray-500 text-xs">
//         <span>👍 Like</span>
//         <span>💬 Comment</span>
//         <span>🔁 Repost</span>
//         <span>✉️ Send</span>
//       </div>
//     </div>
//   );
  const TwitterPostPreview: React.FC<{ post: string, image?: string }> = ({ post, image }) => (
    <div className="bg-white border rounded-lg shadow-md w-full max-w-md p-4">
      <div className="flex items-start mb-4">
        <img 
          src="/api/placeholder/50/50" 
          alt="Profile" 
          className="w-12 h-12 rounded-full mr-3" 
        />
        <div>
          <p className="font-semibold text-sm">Your Username</p>
          <p className="text-xs text-gray-500">@yourhandle</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-800 mb-4">{post}</p>
      
      {image && (
        <div className="mb-4">
          <img 
            src={image} 
            alt="Post" 
            className="w-full h-48 object-cover rounded-lg" 
          />
        </div>
      )}
      
      <div className="flex justify-between text-gray-500 text-xs">
        <span>💬 Reply</span>
        <span>🔁 Retweet</span>
        <span>❤️ Like</span>
        <span>📤 Share</span>
      </div>
    </div>
  );
  
  const InstagramPostPreview: React.FC<{ post: string, image?: string }> = ({ post, image }) => (
    <div className="bg-white border rounded-lg shadow-md w-full max-w-md">
      <div className="flex items-center p-4 border-b">
        <img 
          src="/api/placeholder/40/40" 
          alt="Profile" 
          className="w-10 h-10 rounded-full mr-3" 
        />
        <p className="font-semibold text-sm">your_username</p>
      </div>
      
      {image ? (
        <img 
          src={image} 
          alt="Post" 
          className="w-full h-96 object-cover" 
        />
      ) : (
        <div className="bg-gray-100 h-96 flex items-center justify-center">
          <p className="text-gray-500">No image</p>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex space-x-4 mb-4">
          <span>❤️ Like</span>
          <span>💬 Comment</span>
          <span>🔁 Share</span>
        </div>
        
        <p className="text-sm">
          <span className="font-semibold">your_username </span>
          {post}
        </p>
        
        <p className="text-xs text-gray-500 mt-2">
          View all comments
        </p>
      </div>
    </div>
  );
  
  const FacebookPostPreview: React.FC<{ post: string, image?: string }> = ({ post, image }) => (
    <div className="bg-white border rounded-lg shadow-md w-full max-w-md">
      <div className="flex items-center p-4 border-b">
        <img 
          src="/api/placeholder/40/40" 
          alt="Profile" 
          className="w-10 h-10 rounded-full mr-3" 
        />
        <div>
          <p className="font-semibold text-sm">Your Name</p>
          <p className="text-xs text-gray-500">Just now</p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-800 mb-4">{post}</p>
        
        {image && (
          <div className="mb-4">
            <img 
              src={image} 
              alt="Post" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
        )}
        
        <div className="flex justify-between text-gray-500 text-xs border-t pt-3">
          <span>👍 Like</span>
          <span>💬 Comment</span>
          <span>🔁 Share</span>
        </div>
      </div>
    </div>
  );
  

interface ExaSearchResult {
  title: string;
  url: string;
  publishedDate: string;
  summary: string;
  image?: string;
}
interface SearchResult {
    title: string;
    url: string;
    image?: string;
    summary: string;
    publishedDate: string | Date;
  }
  
  // Define props interface for the SourceCard component
  interface SourceCardProps {
    result: SearchResult;
  }

  const SourceCard: React.FC<SourceCardProps> = ({ result })  => (
    <div 
      className="min-w-[300px] max-w-[300px] border rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-white transition-all duration-300 hover:shadow-xl"
    >
      {result.image && (
        <img 
          src={result.image} 
          alt={result.title} 
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
      )}
      <div className="p-4">
        <h4 className="font-semibold text-blue-600 mb-2">
          <a 
            href={result.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline flex items-center"
          >
            {result.title}
            <LinkIcon className="ml-2 h-4 w-4 text-blue-500" />
          </a>
        </h4>
        <p className="text-gray-700 text-sm mb-2 line-clamp-3">
          {result.summary}
        </p>
        <div className="text-xs text-gray-500 flex justify-between items-center">
          <span>
            Published: {new Date(result.publishedDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  interface GeneratedPost {
    content: string;
    platform: string;
    image?: string;
    mediaType?: 'text' | 'image' | 'video' | 'meme';
  }
  

interface CustomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults: ExaSearchResult[];
  generatedPost?: GeneratedPost;
  selectedMediaTypes: string[];
}
// interface CustomSidebarProps extends CustomSidebarProps {
    
//   }
const CustomSidebar: React.FC<CustomSidebarProps> = ({ 
    isOpen, 
    onClose, 
    searchResults,
    generatedPost,
    selectedMediaTypes
  }) => {
    const [activeTab, setActiveTab] = useState<string | null>(
      selectedMediaTypes.length > 0 ? selectedMediaTypes[0] : null
    );
    const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  
    if (!isOpen) return null;
  
    const renderPlatformPreview = (mediaType?: string) => {
      if (!generatedPost) return null;
      
      var postImage = searchResults[0]?.image;
      if(selectedMediaTypes[0].toLocaleLowerCase()==='video'){
        postImage=generatedPost.image
      }else if(selectedMediaTypes[0].toLocaleLowerCase()==='meme'){
        postImage=generatedPost.image
      }
      else{

      }
      
      switch(generatedPost.platform) {

        case 'LinkedIn':
          
          return <LinkedInPostPreview post={generatedPost.content} image={postImage} mediaType={selectedMediaTypes[0]} />;
        case 'Twitter':
          return <TwitterPostPreview post={generatedPost.content} image={postImage} />;
        case 'Instagram':
          return <InstagramPostPreview post={generatedPost.content} image={postImage} />;
        case 'Facebook':
          return <FacebookPostPreview post={generatedPost.content} image={postImage} />;
        default:
          return null;
      }
    };
  
    return (
      <div 
        className={`
          fixed top-0 right-0 w-full md:w-[600px] h-full bg-gray-50 
          shadow-lg transform transition-transform duration-300 ease-in-out
          z-50 overflow-y-auto p-6
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {generatedPost ? `${generatedPost.platform} Post Preview` : 'Search Results'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
  
        {/* Media Type Tabs */}
        {selectedMediaTypes.length > 1 && (
          <div className="flex mb-4 border-b">
            {selectedMediaTypes.map((mediaType) => (
              <button
                key={mediaType}
                onClick={() => setActiveTab(mediaType)}
                className={`
                  px-4 py-2 text-sm font-medium 
                  ${activeTab === mediaType 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Post
              </button>
            ))}
          </div>
        )}
  
        {/* Platform-specific Post Previews */}
        <div className="flex justify-center mb-6">
          {renderPlatformPreview()}
        </div>
  
        {/* Expandable Sources Section */}
        <div className="bg-white rounded-lg shadow-md">
          <button 
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className="w-full p-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold">Sources ({searchResults.length})</h3>
            {isSourcesExpanded ? (
              <ChevronUp className="h-6 w-6 text-gray-500" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-500" />
            )}
          </button>
  
          {isSourcesExpanded && (
            <div className="p-4 overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {searchResults.map((result, index) => (
                  <SourceCard key={index} result={result} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
const fetchSearchResults = async (query: string): Promise<{ results: ExaSearchResult[] }> => {
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
          livecrawl: 'always',
          includeImages: true
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

const generateSocialMediaPost = async (
    results: any, 
    platform: string,
    tone:string
  ): Promise<GeneratedPost> => {
    // const summariesText = results.map((r: { summary: any; }) => r.summary).join('\n\n');
    const summariesText = results.summary
    console.log("summaries----",summariesText)
  
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `${summariesText}\n\nNow create a ${tone} full engaging  ${platform} tect post in 100 words out of the above data.`
            }
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })
      });
  
  console.log(`${summariesText}\n\nNow create a ${tone} full engaging  ${platform} tect post in 100 words out of the above data.`)
     
  
      if (!response.ok) {
        throw new Error('Groq API response was not ok');
      }
  
      const data = await response.json();
      const response2 = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'user',
                content: `${ data.choices[0].message.content}\n\nMake this post ${tone}.Dont return unnecessary text just the content and hashtags`
              }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false
          })
        });
        const data2= await response2.json();
      return {
        content: data2.choices[0].message.content,
        platform: platform
      };
    } catch (error) {
      console.error('Groq API call failed:', error);
      throw error;
    }
  };
const generateSocialMediaPostImage = async (
  // results: ExaSearchResult[], 
  results:any,
    platform: string,
    tone: string
  ): Promise<GeneratedPost> => {
    const firstResult = results.summary;
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `${firstResult}\n\nNow create a ${tone} full engaging  ${platform} tect post in 100 words out of the above data.`
            }
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })
      });
  
      if (!response.ok) {
        throw new Error('Groq API response was not ok');
      }
  
      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        platform: platform,
        image: firstResult.image || undefined,
        mediaType: 'image' 
      };
    } catch (error) {
      console.error('Groq API call failed:', error);
      throw error;
    }
  };
  
  const generateSocialMediaPostVideo = async (
    // results: ExaSearchResult[], 
    results:any,
    platform: string,
    tone: string
  ): Promise<GeneratedPost> => {
    
    // const firstResult = results[0];
    const firstResult = results.summary;
    
    try {
        interface VideoReelItem {
            text: string;
            imageprompt: string;
          }
          
          interface ImagePromptMapping {
            find: string;
            replace: string;
          }
          
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `"${firstResult}" .Create an engaging  for  ${tone} ${platform}  post based on the above data..`
            }
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: false,
        })
      });
  
      if (!response.ok) {
        throw new Error('Groq API response was not ok');
      }
    
      const data = await response.json();
      const response2= await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `"${ data.choices[0].message.content}" .\nbased on this create a 30 seconds reel video content .Dont make changes to the json format i gave below keep as it is.Give response in below JSON Array only :
reel_content:[{text:"text from above",imageprompt:stable diffusion image prompt based on the text for this portion},...]`
            }
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 0,
          max_tokens: 1024,
          top_p: 1,
          stream: false,
          response_format: {
            type: "json_object"
          },
        })
      });
      var finaldata=await response2.json()

      console.log("finaldata=",finaldata.choices[0].message.content)
      interface VideoReelItem {
        text: string;
        imageprompt: string;
      }
      
      interface MappingItem {
        find: string;
        replace: string;
      }
      
      const mergeTextFromArray = (items: VideoReelItem[]): string => 
        items.map(item => item.text).join(' ');
      
      const createCombinedPromptList = (items: VideoReelItem[]): MappingItem[] => {
        const mergedText = mergeTextFromArray(items);
        
        const voiceoverItem: MappingItem = {
          find: 'VOICEOVER',
          replace: mergedText
        };
      
        const imagePromptList: MappingItem[] = items.map((item, index) => ({
          find: `IMAGE_${index + 1}_PROMPT`,
          replace: item.imageprompt
        }));
      
        return [voiceoverItem, ...imagePromptList];
      };
      
      // Usage
      const combinedPromptList = createCombinedPromptList(JSON.parse(finaldata.choices[0].message.content)['reel_content']);
      
      console.log('Combined Prompt List:', combinedPromptList);

      console.log(`started rendering video ${combinedPromptList}`)
           
    
      var renderresponse=await renderVideoWithShotstackHackathon("Ys5pUGphwl29MpE4LO8aR9Lc27Ycnm9ppGebd39w",getClipData(combinedPromptList))

      console.log("started extracting video id")
      var renderedid=extractIdFromResponse(renderresponse!)
      console.log("finished extracting video id",renderresponse)
      var videoUrl=''
      try {
        // Check if renderedId is not null
        if (renderedid !== null) {
          // Assuming check_render_status is an async function that returns a Promise
         const {status,url}= await checkRenderStatus("Ys5pUGphwl29MpE4LO8aR9Lc27Ycnm9ppGebd39w", renderedid);
         console.log(`generated video=${status}${url}`)
         videoUrl=url
        }
      } catch (error) {
        // Type the error appropriately 
        // console.error('Error checking render status:', error);
        
        // return {
        //   status: 'failed',
        //   video_url: ''
        // };
      }
    
     
      return {
        content: data.choices[0].message.content,
        platform: platform,
        image:videoUrl,
        mediaType: 'video' 
      };
    } catch (error) {
      console.error('Groq API call failed:', error);
      throw error;
    }
  };
  
  const generateSocialMediaPostMeme = async (
    // results: ExaSearchResult[], 
    results: any, 
    platform: string,
    tone: string
  ): Promise<GeneratedPost> => {
    // const firstResult = results[0];
    const firstResult = results.summary;
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Create a witty meme caption about "${firstResult}" in a ${tone} tone for ${platform}. Make it humorous and shareable.`
            }
          ],
          model: 'llama-3.3-70b-versatile',
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })
      });
  
      if (!response.ok) {
        throw new Error('Groq API response was not ok');
      }
  
      const data = await response.json();
      const text= data.choices[0].message.content;
      const result = await generateMemeFromText(text);
      if (result.success && result.data) {
        console.log('Meme URL:', result.data.url);
        console.log('Meme Page URL:', result.data.page_url);
      } else {
        console.error('Meme creation failed:', result.error_message);
      }
      return {
        content: data.choices[0].message.content,
        platform: platform,
        image:result.data!.url,
        mediaType: 'meme' 
      
      };
    } catch (error) {
      console.error('Groq API call failed:', error);
      throw error;
    }
  };
    const [inputText, setInputText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<ExaSearchResult[]>([]);
    const [allPosts,setPosts]=useState<any|null>([])
    const addPost = (newPost: any) => {
        setPosts((prevPosts: any) => [...prevPosts, newPost]);
      };
    const [generatedPost, setGeneratedPost] = useState<GeneratedPost | undefined>(undefined);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [selectedMediaTypes, setSelectedMediaTypes] = useState<string[]>([]);
    
    const mediaTypes = [
      { name: 'Image', icon: ImageIcon, color: 'text-green-600' },
      { name: 'Video', icon: Film, color: 'text-red-600' },
      { name: 'Meme', icon: Laugh, color: 'text-yellow-600' }
    ];
  
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
  
      try {
        // First, call the Groq API to extract tone and rest of the query
        const moderationResponse = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            messages: [
              {
                role: "user",
                content: `Act as a content moderator and do this task.\n"${trimmedText}"\nfrom the above sentence Extract tone of post that user requested to search and give me rest of the sentece of post. Just give in json format \ntone:Tone of the content type user is asking\nrest:rest sentence as it is`
              }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            response_format: {
              type: "json_object"
            },
            stop: null
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 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`
            }
          }
        );
  
        // Extract tone and rest from the Groq API response
        const { tone, rest } = JSON.parse(moderationResponse.data.choices[0].message.content);
  
        // Fetch search results using the extracted rest of the query
        const data = await fetchSearchResults(rest);
        setSearchResults(data.results);
        try{
            await deleteAllVectaraDocuments("zut_AsgXVROiKzaKIw3Q6bGD0K6ZrIn13Ga_AywCLA").then(()=>{

            })
            await runDocumentUpload(data)
            
        }catch(e){
             
        }
        
        var finaldata=await performVectaraQuery({query:"Give complete summary",apiKey:"zut_AsgXVROiKzaKIw3Q6bGD0K6ZrIn13Ga_AywCLA",customerId:"46667605"})
        console.log('bal er data',finaldata)
        // setSearchResults(finaldata);
    
        // data.results.forEach((e)=>{
        //         uploadVectaraDocument({
        //             id: e.url,
        //             title: e.title,
        //             text: e.summary,
        //             context: e.summary,
        //             apiKey: 'zut_AsgXVROiKzaKIw3Q6bGD0K6ZrIn13Ga_AywCLA'
        //           });
        // })
        
        // If a platform is selected, generate posts based on media types
        if (selectedPlatform) {
          const postPromises = selectedMediaTypes.length > 0
            ? selectedMediaTypes.map(async (mediaType) => {
                switch(mediaType.toLocaleLowerCase()) {
                  case 'image':
                 
                    return await generateSocialMediaPostImage(
                        finaldata,
                        // data.results,
                         selectedPlatform, tone);

                  case 'video':
               
                    return await generateSocialMediaPostVideo(
                        finaldata,
                        // data.results,
                         selectedPlatform, tone);
                  case 'meme':
           
                    return await generateSocialMediaPostMeme(
                        
                        finaldata,
                        // data.results,
                        
                        selectedPlatform, tone);
                  default:
                    return await generateSocialMediaPost( finaldata, selectedPlatform, tone);
                }
              })
            //   data.results
            : [await generateSocialMediaPost(finaldata, selectedPlatform, tone)];
  
          const posts = await Promise.all(postPromises);
          console.log('posts==============',posts)
           setPosts(posts)
          setGeneratedPost(posts[0]); // For now, show the first post
        }
  
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
    }, [inputText, selectedPlatform, selectedMediaTypes]);
  
    const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !isLoading) {
        handleSearch();
      }
    }, [handleSearch, isLoading]);
  
    const handleMediaTypeToggle = (mediaType: string) => {
      setSelectedMediaTypes(prev => 
        prev.includes(mediaType)
          ? prev.filter(type => type !== mediaType)
          : [...prev, mediaType]
      );
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md shadow-lg bg-white rounded-lg">
          <div className="p-6 space-y-4">
            <div className="flex space-x-2">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Generate anything..."
                className="flex-grow p-2 border rounded"
                onKeyDown={handleInputKeyDown}
                disabled={isLoading}
              />
              <button 
                onClick={handleSearch} 
                disabled={isLoading || !inputText || !selectedPlatform}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                aria-label="Search"
              >
                {isLoading ? 'Generating...' : <Send className="h-5 w-5" />}
              </button>
            </div>
  
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
  
            <div className="flex justify-center space-x-4 py-2">
              {mediaTypes.map((mediaType) => (
                <label 
                  key={mediaType.name} 
                  className={`
                    flex flex-col items-center cursor-pointer 
                    ${selectedMediaTypes.includes(mediaType.name) 
                      ? `${mediaType.color} scale-110` 
                      : 'text-gray-400 opacity-50'}
                    transition-all duration-300 ease-in-out
                  `}
                >
                  <input 
                    type="checkbox" 
                    name="mediaType" 
                    value={mediaType.name}
                    checked={selectedMediaTypes.includes(mediaType.name)}
                    onChange={() => handleMediaTypeToggle(mediaType.name)}
                    className="hidden"
                  />
                  <mediaType.icon 
                    className={`
                      h-6 w-6 mb-1 
                      ${selectedMediaTypes.includes(mediaType.name) 
                        ? 'transform scale-110' : ''}
                    `} 
                  />
                  <span className="text-xs">{mediaType.name}</span>
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
          generatedPost={generatedPost}
          selectedMediaTypes={selectedMediaTypes}
        />
      </div>
    );
  };
  
  export default ExaSearchInterface;

function getClip(): Record<string, any> | undefined {
    throw new Error('Function not implemented.');
}
