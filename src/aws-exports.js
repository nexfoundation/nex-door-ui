import { Auth } from 'aws-amplify';

const awsauth = {
    Auth: {

        // REQUIRED - Amazon Cognito Region
        region: process.env.VUE_APP_REGION,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.VUE_APP_COG_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.VUE_APP_COG_CLIENT_ID,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: process.env.VUE_APP_MANDATORY_SIGNIN
    },
    API: {
        endpoints: [
        {
            name: 'ServiceEndpoint',
            endpoint: process.env.VUE_APP_SERVICE_ENDPOINT
            // custom_header: async () => {
            //     // Alternatively, with Cognito User Pools use this:
            //     return { Authorization: (await Auth.currentSession()).idToken.jwtToken }
            // }
        },
        ]
    }
}

export default awsauth
Auth.configure(awsauth)
