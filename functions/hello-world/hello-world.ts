// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import { APIGatewayEvent } from 'aws-lambda';

const handler = async (event: APIGatewayEvent) => {
  try {
    const subject = event?.queryStringParameters?.name || 'World';
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
