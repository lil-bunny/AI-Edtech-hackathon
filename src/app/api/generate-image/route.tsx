// import { NextRequest, NextResponse } from 'next/server';


// // Existing POST function remains the same

// export async function GET(request: NextRequest) {



//   const { searchParams } = new URL(request.url);
//   const polling_url = searchParams.get('polling_url');

//   if (!polling_url) {
//     return NextResponse.json({ error: 'Polling URL is required' }, { status: 400 });
//   }

//   try {
//     const pollingResponse = await fetch(polling_url, {
//       headers: {
//         'Authorization': `Bearer placid-sg2hyyrumqpggc1d-1c5y0fkpmfazvjfv`
//       }
//     });

//     const pollingData = await pollingResponse.json();

//     return NextResponse.json(pollingData);
//   } catch (error) {
//     console.error('Image polling error:', error);
//     return NextResponse.json({ 
//       error: 'Image polling failed' 
//     }, { status: 500 });
//   }

// }
// export async function POST(request: NextRequest) {
//   const { slideText } = await request.json();

//   try {
//     // Initial image generation request
//     const initialResponse = await fetch('https://api.placid.app/api/rest/images', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer placid-sg2hyyrumqpggc1d-1c5y0fkpmfazvjfv`,
//         'Content-Type': 'application/json'
//       },

      
//       body: JSON.stringify({
//         template_uuid: "oz0ynr8tmx7ys",
//         layers: {
//           title: {
//             text: slideText
//           },
//           category: {
//             text: ""
//         }
//         }
//       })
//     });

//     const initialData = await initialResponse.json();
  

//     // Return polling URL to client
//     return NextResponse.json({ 
//       polling_url: initialData.polling_url 
//     });
//   } catch (error) {
//     return NextResponse.json({ 
//       error: 'Image generation failed' 
//     }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const polling_url = searchParams.get('polling_url');

  if (!polling_url) {
    return NextResponse.json({ error: 'Polling URL is required' }, { status: 400 });
  }

  try {
    const pollingResponse = await fetch(polling_url, {
      headers: {
        Authorization: `Bearer placid-sg2hyyrumqpggc1d-1c5y0fkpmfazvjfv`,
      },
    });

    if (!pollingResponse.ok) {
      throw new Error(`Polling failed: ${pollingResponse.statusText}`);
    }

    const pollingData = await pollingResponse.json();
    return NextResponse.json(pollingData);
  } catch (error) {
    console.error('Image polling error:', error);
    return NextResponse.json(
      { error: 'Image polling failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { slideText } = await request.json();

  if (!slideText) {
    return NextResponse.json({ error: 'slideText is required' }, { status: 400 });
  }

  try {
    const initialResponse = await fetch('https://api.placid.app/api/rest/images', {
      method: 'POST',
      headers: {
        Authorization: `Bearer placid-sg2hyyrumqpggc1d-1c5y0fkpmfazvjfv`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template_uuid: 'oz0ynr8tmx7ys',
        layers: {
          title: { text: slideText },
          category: { text: '' },
        },
      }),
    });

    if (!initialResponse.ok) {
      throw new Error(`Image generation failed: ${initialResponse.statusText}`);
    }

    const initialData = await initialResponse.json();
    return NextResponse.json({ polling_url: initialData.polling_url });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    );
  }
}
