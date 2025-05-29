import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAwGFurjEKQGBFuEvxQxLMthnmrSnq50eQ';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateChatResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.0-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    throw new Error('Failed to generate AI response.');
  }
}

export async function generateHealthReport(patientData) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.0-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `Analyze the following patient data and provide a detailed health report focusing on malnutrition risks and recommendations.\n\nPatient Information:\nName: ${patientData.name}\nAge: ${patientData.age} years\nHeight: ${patientData.height} cm\nWeight: ${patientData.weight} kg\nMedical History: ${patientData.disease}\n\nPlease provide a structured report with the following sections:\n1. BMI Analysis\n2. Nutritional Risk Assessment\n3. Growth Status\n4. Dietary Recommendations\n5. Follow-up Recommendations\n\nFormat the response in a clear, professional manner suitable for healthcare professionals.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini Health Report Error:', error);
    throw new Error('Failed to generate health report.');
  }
} 