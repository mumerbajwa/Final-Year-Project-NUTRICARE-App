import axios from 'axios';

const OPENAI_API_KEY = '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

export async function generateChatResponse(prompt) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful AI nutrition advisor.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI Chat Error:', error.response?.data || error.message);
    throw new Error('Failed to generate AI response.');
  }
}

export async function generateHealthReport(patientData) {
  const prompt = `Analyze the following patient data and provide a detailed health report focusing on malnutrition risks and recommendations.\n\nPatient Information:\nName: ${patientData.name}\nAge: ${patientData.age} years\nHeight: ${patientData.height} cm\nWeight: ${patientData.weight} kg\nMedical History: ${patientData.disease}\n\nPlease provide a structured report with the following sections:\n1. BMI Analysis\n2. Nutritional Risk Assessment\n3. Growth Status\n4. Dietary Recommendations\n5. Follow-up Recommendations\n\nFormat the response in a clear, professional manner suitable for healthcare professionals.`;
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: MODEL,
        messages: [
          { role: 'system', content: 'You are a medical AI assistant specialized in nutrition and malnutrition risk assessment.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 700,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI Health Report Error:', error.response?.data || error.message);
    throw new Error('Failed to generate health report.');
  }
} 