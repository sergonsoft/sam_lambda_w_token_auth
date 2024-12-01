import { 
    APIGatewayTokenAuthorizerEvent, 
    APIGatewayAuthorizerResult, 
    Context 
  } from 'aws-lambda';
  
  export const handler = async (
    event: APIGatewayTokenAuthorizerEvent, 
    context: Context
  ): Promise<APIGatewayAuthorizerResult> => {
    console.log('Authorizer event:', JSON.stringify(event, null, 2));
  
    // Extract token from the event
    const token = event.authorizationToken;
  
    // Your custom authorization logic
    if (token === 'allow') {
      return generatePolicy('user', 'Allow', event.methodArn);
    }
  
    return generatePolicy('user', 'Deny', event.methodArn);
  };
  
  // Helper function to generate IAM policy
  const generatePolicy = (
    principalId: string, 
    effect: 'Allow' | 'Deny', 
    resource: string
  ): APIGatewayAuthorizerResult => {
    const authResponse: APIGatewayAuthorizerResult = {
      principalId: principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }]
      }
    };
  
    return authResponse;
  };