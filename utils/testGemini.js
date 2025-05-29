const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = 'AIzaSyAwGFurjEKQGBFuEvxQxLMthnmrSnq50eQ';

async function testGeminiAPI() {
  try {
    console.log('Testing Gemini API...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: "Hello, this is a test message." }] }],
    });
    
    const response = await result.response;
    console.log('Success! API Response:', response.text());
    return true;
  } catch (error) {
    console.error('Test Failed:', error);
    return false;
  }
}

// Run the test
testGeminiAPI(); 