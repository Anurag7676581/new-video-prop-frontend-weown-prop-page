const GEMINI_API_KEY = 'test';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Dummy property data for AI processing
const propertyDatabase = [
  {
    id: '1',
    name: 'Luxury Villa with Pool',
    type: 'Villa',
    location: 'Bandra West, Mumbai',
    price: '₹2.5 Cr',
    priceValue: 25000000,
    bhk: '3 BHK',
    area: '2000 sq ft',
    amenities: ['Swimming Pool', 'Garden', 'Security', 'Parking'],
    connectivity: ['Near Metro Station', 'Near Airport', 'Near Mall'],
    yield: 'High Yield',
    description: 'Beautiful 3BHK villa with modern amenities and high rental yield',
    propertyAge: 'New Construction',
    furnishing: 'Semi-Furnished'
  },
  {
    id: '2',
    name: 'Metro View Apartment',
    type: 'Apartment',
    location: 'Andheri East, Mumbai',
    price: '₹1.2 Cr',
    priceValue: 12000000,
    bhk: '2 BHK',
    area: '1200 sq ft',
    amenities: ['Metro Access', 'Balcony', 'Security', 'Parking'],
    connectivity: ['Near Metro Station', 'Near Railway Station'],
    yield: 'Medium Yield',
    description: '2BHK apartment with excellent metro connectivity and good rental potential',
    propertyAge: '5 years old',
    furnishing: 'Unfurnished'
  },
  {
    id: '3',
    name: 'High Yield Commercial Space',
    type: 'Commercial',
    location: 'BKC, Mumbai',
    price: '₹3.8 Cr',
    priceValue: 38000000,
    bhk: 'Commercial',
    area: '2500 sq ft',
    amenities: ['High Footfall', 'Parking', 'Security', '24/7 Access'],
    connectivity: ['Near Airport', 'Near Metro Station', 'Near Mall'],
    yield: 'High Yield',
    description: 'Prime commercial space in high footfall area with excellent ROI',
    propertyAge: 'New Construction',
    furnishing: 'Unfurnished'
  },
  {
    id: '4',
    name: 'Family Home with Garden',
    type: 'Independent House',
    location: 'Powai, Mumbai',
    price: '₹4.2 Cr',
    priceValue: 42000000,
    bhk: '4 BHK',
    area: '3000 sq ft',
    amenities: ['Garden', 'Security', 'Parking', 'Servant Quarter'],
    connectivity: ['Near University', 'Near Lake', 'Near Mall'],
    yield: 'Medium Yield',
    description: 'Spacious 4BHK family home with beautiful garden and security',
    propertyAge: '10 years old',
    furnishing: 'Fully Furnished'
  },
  {
    id: '5',
    name: 'Studio Near University',
    type: 'Studio',
    location: 'Vile Parle, Mumbai',
    price: '₹45 Lakhs',
    priceValue: 4500000,
    bhk: 'Studio',
    area: '500 sq ft',
    amenities: ['University Proximity', 'Furnished', 'Security', 'Parking'],
    connectivity: ['Near University', 'Near Airport', 'Near Railway Station'],
    yield: 'High Yield',
    description: 'Fully furnished studio apartment perfect for students and young professionals',
    propertyAge: '3 years old',
    furnishing: 'Fully Furnished'
  },
  {
    id: '6',
    name: 'Premium 2BHK Apartment',
    type: 'Apartment',
    location: 'Worli, Mumbai',
    price: '₹2.8 Cr',
    priceValue: 28000000,
    bhk: '2 BHK',
    area: '1400 sq ft',
    amenities: ['Sea View', 'Gym', 'Swimming Pool', 'Security'],
    connectivity: ['Near Sea', 'Near Business District', 'Near Metro Station'],
    yield: 'High Yield',
    description: 'Premium 2BHK apartment with sea view and luxury amenities',
    propertyAge: 'New Construction',
    furnishing: 'Fully Furnished'
  },
  {
    id: '7',
    name: 'Investment Property',
    type: 'Apartment',
    location: 'Thane, Mumbai',
    price: '₹85 Lakhs',
    priceValue: 8500000,
    bhk: '1 BHK',
    area: '800 sq ft',
    amenities: ['Security', 'Parking', 'Garden'],
    connectivity: ['Near Metro Station', 'Near Mall', 'Near Railway Station'],
    yield: 'High Yield',
    description: 'Perfect investment property with high rental potential',
    propertyAge: '2 years old',
    furnishing: 'Semi-Furnished'
  },
  {
    id: '8',
    name: 'Luxury Penthouse',
    type: 'Penthouse',
    location: 'Juhu, Mumbai',
    price: '₹8.5 Cr',
    priceValue: 85000000,
    bhk: '4 BHK',
    area: '4000 sq ft',
    amenities: ['Private Terrace', 'Swimming Pool', 'Gym', 'Security'],
    connectivity: ['Near Beach', 'Near Airport', 'Near Mall'],
    yield: 'Medium Yield',
    description: 'Exclusive penthouse with private terrace and luxury amenities',
    propertyAge: 'New Construction',
    furnishing: 'Fully Furnished'
  }
];

export const analyzePropertyQuery = async (userQuery, propertyList) => {
  try {
    // Create a comprehensive prompt for Gemini API
    const systemPrompt = `You are WeOwn AI, a property platform AI assistant helping users select and find properties. You have access to a property database and can filter properties based on user queries.

Your role is to:
1. Understand user property requirements from natural language queries
2. Filter properties from the database based on criteria like location, type, BHK, yield, amenities
3. Provide helpful, contextual responses about properties
4. Suggest relevant properties that match user needs

Property Database:
${JSON.stringify(propertyList, null, 2)}

User Query: "${userQuery}"

Please analyze the user query and:
1. Identify the key requirements (location, property type, BHK, yield, amenities, etc.)
2. Filter properties that match these requirements
3. Provide a helpful response explaining what you found
4. Return the filtered properties in JSON format

Response format:
{
  "message": "Your helpful response to the user",
  "propertyIds": [array of matching property _id strings from the provided database],
  "filters": {applied filters},
  "totalFound": number of properties found
}

Be conversational, helpful, and provide property insights. If no exact matches, suggest alternatives.`;

    try {
      // Try to use Gemini API first
      const aiResponse = await callGeminiAPI(systemPrompt);
      
      // Parse the AI response
      try {
        const parsedResponse = safeJsonParse(aiResponse);
        return {
          message: parsedResponse.message,
          properties: (parsedResponse.propertyIds || []).map(id => 
            propertyList.find(p => p._id === id) || propertyList.find(p => (p._id || '').toString() === (id || '').toString())
          ).filter(Boolean),
          filters: parsedResponse.filters || {},
          totalFound: parsedResponse.totalFound || ((parsedResponse.propertyIds || []).length)
        };
      } catch (parseError) {
        console.log('AI response parsing failed, using fallback:', parseError);
        // Fallback to rule-based approach if AI response parsing fails
        return fallbackPropertyFilter(userQuery, propertyList);
      }
      
    } catch (apiError) {
      console.log('Gemini API call failed, using fallback:', apiError);
      // Fallback to rule-based approach if API fails
      return fallbackPropertyFilter(userQuery, propertyList);
    }

  } catch (error) {
    console.error('Error analyzing property query:', error);
    return {
      message: "I'm having trouble processing your request right now. Please try asking about:\n\n• Properties near metro stations\n• High yield properties\n• Specific BHK requirements\n• Property types (villa, apartment, commercial)",
      properties: propertyList.slice(0, 3),
      filters: {},
      totalFound: 3
    };
  }
};

// Fallback rule-based filtering
const fallbackPropertyFilter = (userQuery, propertyList) => {
  const lowerQuery = userQuery.toLowerCase();
  let filteredProperties = [];
  let message = '';
  let filters = {};

  // Extract filters from user query
  if (lowerQuery.includes('metro') || lowerQuery.includes('station')) {
    filters.connectivity = 'Near Metro Station';
  }
  
  if (lowerQuery.includes('high yield') || lowerQuery.includes('yield') || lowerQuery.includes('roi')) {
    filters.yield = 'High Yield';
  }
  
  if (lowerQuery.includes('2bhk') || lowerQuery.includes('2 bhk')) {
    filters.bhk = '2 BHK';
  }
  
  if (lowerQuery.includes('3bhk') || lowerQuery.includes('3 bhk')) {
    filters.bhk = '3 BHK';
  }
  
  if (lowerQuery.includes('4bhk') || lowerQuery.includes('4 bhk')) {
    filters.bhk = '4 BHK';
  }
  
  if (lowerQuery.includes('villa') || lowerQuery.includes('house')) {
    filters.type = ['Villa', 'Independent House'];
  }
  
  if (lowerQuery.includes('commercial') || lowerQuery.includes('office')) {
    filters.type = 'Commercial';
  }
  
  if (lowerQuery.includes('studio') || lowerQuery.includes('1bhk')) {
    filters.bhk = 'Studio';
  }
  
  if (lowerQuery.includes('near airport')) {
    filters.connectivity = 'Near Airport';
  }
  
  if (lowerQuery.includes('near mall')) {
    filters.connectivity = 'Near Mall';
  }
  
  if (lowerQuery.includes('near beach') || lowerQuery.includes('sea view')) {
    filters.connectivity = 'Near Sea';
  }
  
  if (lowerQuery.includes('new') || lowerQuery.includes('recent')) {
    filters.propertyAge = 'New Construction';
  }
  
  if (lowerQuery.includes('furnished')) {
    filters.furnishing = 'Fully Furnished';
  }

  // Apply filters
  filteredProperties = propertyList.filter(property => {
    let matches = true;
    
    if (filters.bhk && filters.bhk !== property.bhk) {
      matches = false;
    }
    
    if (filters.yield && filters.yield !== property.yield) {
      matches = false;
    }
    
    if (filters.type) {
      if (Array.isArray(filters.type)) {
        if (!filters.type.includes(property.type)) {
          matches = false;
        }
      } else if (filters.type !== property.type) {
        matches = false;
      }
    }
    
    if (filters.connectivity && !property.connectivity.includes(filters.connectivity)) {
      matches = false;
    }
    
    if (filters.propertyAge && filters.propertyAge !== property.propertyAge) {
      matches = false;
    }
    
    if (filters.furnishing && filters.furnishing !== property.furnishing) {
      matches = false;
    }
    
    return matches;
  });

  // Generate contextual message
  if (filteredProperties.length === 0) {
    message = "I couldn't find properties matching your exact criteria. However, I can suggest some alternatives. Try being more specific about your requirements, or ask me about:\n\n• Properties by location (metro, airport, mall areas)\n• Properties by type (apartment, villa, commercial)\n• Properties by yield (high, medium)\n• Properties by BHK (1, 2, 3, 4 BHK)";
    filteredProperties = propertyList.slice(0, 3); // Show some suggestions
  } else {
    const propertyTypes = [...new Set(filteredProperties.map(p => p.type))];
    const locations = [...new Set(filteredProperties.map(p => p.location))];
    
    message = `I found ${filteredProperties.length} properties matching your criteria!\n\n`;
    
    if (propertyTypes.length > 0) {
      message += `• Types: ${propertyTypes.join(', ')}\n`;
    }
    
    if (locations.length > 0) {
      message += `• Locations: ${locations.join(', ')}\n`;
    }
    
    message += `\nThese properties offer great value and match your requirements. You can click on any property to view more details.`;
  }

  return {
    message,
    properties: filteredProperties,
    filters,
    totalFound: filteredProperties.length
  };
};

// Robust JSON parser to handle code fences and extra text
const safeJsonParse = (text) => {
  try {
    return JSON.parse(text);
  } catch (_) {
    // Try to extract JSON between code fences or first {...}
    const fenceMatch = text.match(/```(?:json)?\n([\s\S]*?)```/i);
    if (fenceMatch) {
      return JSON.parse(fenceMatch[1]);
    }
    const braceMatch = text.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      return JSON.parse(braceMatch[0]);
    }
    throw new Error('Unable to parse JSON from AI response');
  }
};

// Function to call Gemini API
export const callGeminiAPI = async (prompt) => {
  try {
    console.log('Calling Gemini API with prompt:', prompt.substring(0, 200) + '...');
    
    const response = await fetch(`${GEMINI_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response:', data);
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

export default {
  analyzePropertyQuery,
  callGeminiAPI
};
