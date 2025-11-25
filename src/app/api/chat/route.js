import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    console.log('Sending to external API:', message);
    
    const response = await fetch('https://dental.dsrt321.online/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
     
    if (!response.ok) {
      throw new Error('Failed to get response from AI service');
    }

    const data = await response.json();
    console.log('External API response:', JSON.stringify(data, null, 2));
    
    // Handle array of links
    let links = [];
    
    if (data.link && Array.isArray(data.link)) {
      links = data.link.map(item => ({
        product_name: item.product_name || 'Product',
        product_url: item.product_url || null
      }));
    } else if (data.link && typeof data.link === 'object') {
      // Handle single object case
      links = [{
        product_name: data.link.product_name || 'Product',
        product_url: data.link.product_url || null
      }];
    }
    
    console.log('Processed links:', links);
    
    return NextResponse.json({ 
      response: data.message || "I'm sorry, I couldn't process your request.",
      links: links, // Send as array of link objects
      additional_message: data.additional_message || null
    });
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { 
        response: "I'm having trouble connecting to the server. Please try again later.",
        error: 'Failed to process your message' 
      },
      { status: 500 }
    );
  }
}