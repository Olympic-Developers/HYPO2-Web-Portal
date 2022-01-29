import { CognitoUserPool } from "amazon-cognito-identity-js";
  
const poolData = {
  UserPoolId: 'us-east-2_ZpPDf7ZeL',
  ClientId: '3h8gft16acr1ho0n1fonsm78n'
};

export default new CognitoUserPool(poolData);