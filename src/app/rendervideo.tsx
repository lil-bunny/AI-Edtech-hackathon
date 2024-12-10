import axios, { AxiosResponse } from 'axios';

export async function renderVideoWithShotstackHackathon(
  apiKey: string, 
  payload: Record<string, any> = {}
): Promise<Record<string, any> | null> {
  const url = "https://api.shotstack.io/edit/stage/render";
  
  try {
    // Send the POST request
    console.log(payload);
    const response: AxiosResponse = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    });
    

   
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('An error occurred:', error.message);
      
      // Log more details if available
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
    } else {
      // Handle generic errors
      console.error('An unexpected error occurred:', error);
    }
    
    return null;
  }
}

export  function getClipData(mergeData:any)
 { return ({
    "timeline": {
      "background": "#000000",
      "tracks": [
        {
          "clips": [
            {
              "asset": {
                "type": "text",
                "text": "{{ HEADLINE }}",
                "alignment": {
                  "horizontal": "center",
                  "vertical": "center"
                },
                "font": {
                  "color": "#000000",
                  "family": "Montserrat ExtraBold",
                  "size": "60",
                  "lineHeight": 1
                },
                "width": 463,
                "height": 200
              },
              "start": 0,
              "length": "auto",
              "offset": {
                "x": 0,
                "y": 0.309
              },
              "position": "center",
              "fit": "none",
              "scale": 1
            }
          ]
        },
        {
          "clips": [
            {
              "length": "auto",
              "asset": {
                "type": "image",
                "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/wzr6y0wtti/zzz01j7c-z74py-r3651-kegfa-f703hd/source.png"
              },
              "start": 0,
              "scale": 0.2,
              "offset": {
                "x": 0,
                "y": 0.308
              },
              "position": "center"
            }
          ]
        },
        {
          "clips": [
            {
              "length": "end",
              "asset": {
                "type": "caption",
                "src": "alias://VOICEOVER",
                "background": {
                  "color": "#0091ff",
                  "padding": 25,
                  "borderRadius": 9
                },
                "font": {
                  "size": "32"
                }
              },
              "start": 0
            }
          ]
        },
        {
          "clips": [
            {
              "fit": "none",
              "scale": 1,
              "length": 5,
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_2_PROMPT }}"
              },
              "start": 4,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "zoomOut"
            },
            {
              "fit": "none",
              "scale": 1,
              "length": 5,
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_4_PROMPT }}"
              },
              "start": 12,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "slideRight"
            },
            {
              "fit": "none",
              "scale": 1,
              "length": 5,
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_6_PROMPT }}"
              },
              "start": 20,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "slideDown"
            },
            {
              "fit": "none",
              "scale": 1,
              "length": 5,
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_8_PROMPT }}"
              },
              "start": 28,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "zoomOut"
            },
            {
              "fit": "none",
              "scale": 1,
              "length": "end",
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_10_PROMPT }}"
              },
              "start": 36,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "slideRight"
            }
          ]
        },
        {
          "clips": [
            {
              "length": "auto",
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_1_PROMPT }}"
              },
              "start": 0,
              "transition": {
                "out": "fade"
              },
              "effect": "zoomIn",
              "position": "center"
            },
            {
              "fit": "none",
              "scale": 1,
              "length": 5,
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_3_PROMPT }}"
              },
              "start": 8,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "slideLeft",
              "offset": {
                "x": 0.021,
                "y": 0
              },
              "position": "center"
            },
            {
              "fit": "none",
              "scale": 1,
              "length": 5,
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_5_PROMPT }}"
              },
              "start": 16,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "slideUp"
            },
            {
              "fit": "none",
              "scale": 1,
              "length": 5,
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_7_PROMPT }}"
              },
              "start": 24,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "zoomIn"
            },
            {
              "fit": "none",
              "scale": 1,
              "length": 5,
              "asset": {
                "width": "768",
                "height": "1280",
                "type": "text-to-image",
                "prompt": "{{ IMAGE_9_PROMPT }}"
              },
              "start": 32,
              "transition": {
                "out": "fade",
                "in": "fade"
              },
              "effect": "slideLeft"
            }
          ]
        },
        {
          "clips": [
            {
              "length": "auto",
              "asset": {
                "voice": "Amy",
                "text": mergeData[0]['replace'],
                "type": "text-to-speech"
              },
              "start": 0,
              "alias": "VOICEOVER"
            }
          ]
        }
      ]
    },
    "output": {
      "format": "mp4",
      "fps": 25,
      "size": {
        "width": 720,
        "height": 1280
      }
    },
    "merge":mergeData
    // "merge": [
    //   {
    //     "find": "HEADLINE",
    //     "replace": "Luna’s Magical Night"
    //   },
    //   {
    //     "find": "VOICEOVER",
    //     "replace": "On a quiet night, little Luna lay in bed, staring at the starry sky from her window. One star, brighter than all the others, seemed to twinkle just for her. Suddenly, the star flickered and floated down, landing gently on her windowsill. “Come with me,” the star whispered, “and I’ll show you the world beyond the sky.” Luna stepped onto the starlight path and felt herself gently lifted into the air. Higher and higher they flew, past the clouds and into the sparkling night. Soon, they reached a magical place where the stars danced and sang. “You see, every star has a song,” the star explained, “and they all come together to make the night beautiful.” After a while, it was time for Luna to return. The star gently guided her back home. Luna slipped back into her bed, feeling warm and safe, as the star whispered, “Goodnight, Luna.”"
    //   },
    //   {
    //     "find": "IMAGE_1_PROMPT",
    //     "replace": "A drawing of a cozy bedroom with soft lighting, showing Luna, a young girl about 6 years old. Luna has shoulder-length, wavy dark brown hair, big curious green eyes, and a small button nose. She’s wearing a soft white nightgown with light blue trim. Her skin is fair with a slight blush on her cheeks. She’s tucked under a warm blanket, looking out the window. Outside her window, a clear night sky full of stars sparkles brightly. Luna’s wide eyes are filled with wonder as she gazes at the stars, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_2_PROMPT",
    //     "replace": "A drawing of a close-up of Luna’s face, showing her big green eyes filled with amazement. Her shoulder-length, wavy dark brown hair frames her face. Luna’s small button nose and fair skin with a soft blush on her cheeks give her a sense of childlike innocence. She’s wearing a white nightgown with light blue trim. She is gazing out the window at a single star glowing brightly in the sky, casting a soft magical glow on her face. The star twinkles as if it’s calling out to her, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_3_PROMPT",
    //     "replace": "A drawing of a close-up of Luna’s face, showing her big green eyes filled with amazement. Her shoulder-length, wavy dark brown hair frames her face. Luna’s small button nose and fair skin with a soft blush on her cheeks give her a sense of childlike innocence. She’s wearing a white nightgown with light blue trim. She is gazing out the window at a single star glowing brightly in the sky, casting a soft magical glow on her face. The star twinkles as if it’s calling out to her, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_4_PROMPT",
    //     "replace": "A drawing of Luna leaning forward from her bed, gazing in awe at the magical star outside her window. Her wavy dark brown hair falls just past her shoulders, and her wide green eyes are fixed on the star with curiosity and excitement. Luna is wearing a white nightgown with light blue trim. Her fair skin and slight blush give her an innocent look. The star forms a shimmering path leading into the sky, inviting her to follow, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_5_PROMPT",
    //     "replace": "A drawing of Luna stepping out of her window onto a glowing, magical path of starlight. Her dark brown wavy hair is gently flowing in the breeze, her big green eyes wide with excitement. She’s wearing a white nightgown with light blue trim, and her fair skin has a soft blush on her cheeks. Luna is floating just above the ground, looking joyful and free as she follows the magical star, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_6_PROMPT",
    //     "replace": "A drawing of Luna flying high in the sky with the glowing star beside her. Her shoulder-length wavy dark brown hair flows behind her as she soars through the air. Her green eyes are wide with joy, and her white nightgown with light blue trim flutters gently in the breeze. Her fair skin has a healthy glow as she takes in the sight of fluffy clouds and the twinkling stars above, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_7_PROMPT",
    //     "replace": "A drawing of Luna watching in awe as stars dance and sing in the sky. Her wavy dark brown hair frames her face, and her big green eyes are filled with wonder. She’s wearing her soft white nightgown with light blue trim, and her cheeks have a gentle blush. She floats gently in the air, surrounded by magical starlight, as stars form constellations and patterns around her, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_8_PROMPT",
    //     "replace": "A drawing of Luna in the sky, looking intently at the glowing star beside her. Her shoulder-length, wavy dark brown hair gently moves with the breeze. Her wide green eyes are focused, filled with curiosity and awe as she listens to the star explain the magic of the stars. Luna’s white nightgown with light blue trim flutters slightly, and her fair skin glows softly in the starlight, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_9_PROMPT",
    //     "replace": "A drawing of Luna floating down the starlight path back to her bedroom. Her dark brown wavy hair flows gently as she descends, her big green eyes looking peacefully ahead. She’s wearing her soft white nightgown with light blue trim, and her fair skin still glows from the starlight. The magical star is guiding her home, with twinkling stars in the background, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   },
    //   {
    //     "find": "IMAGE_10_PROMPT",
    //     "replace": "A drawing of Luna back in her bed, snuggled under her warm blanket. Her shoulder-length, wavy dark brown hair rests on her pillow, and her big green eyes are closed peacefully. She’s wearing her soft white nightgown with light blue trim. The soft glow of the star fades into the night sky as Luna drifts off to sleep, her fair skin still glowing softly in the dim light, style of Maurice Sendak, inspired by Maurice Sendak, fairy tale illustrations, storybook illustration, inspired by Gustaf Tenggren, classic children’s illustrations, whimsical creatures."
    //   }
    // ]
  });}