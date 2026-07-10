// ONLY FOR LOCAL DEVELOPMENT
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import express, { Application, Request, Response, NextFunction, type Router } from 'express';
import { SignJWT, jwtVerify, JWTPayload, generateSecret, createRemoteJWKSet } from "jose";
import 'dotenv/config';
import { keycloakConfig } from '../config/auth.config.js'

export const keycloakRouter: Router = express.Router()

const JWKS = createRemoteJWKSet(new URL( keycloakConfig.KC_JWKS_URL as string));

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('*** Authorization token required ***');
  }
  const token = authHeader.split(' ')[1];

  try {

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: keycloakConfig.KC_ISSUER as string,
      audience: 'account',
      clockTolerance: '5s',
      algorithms: ['RS256'],
    });

    console.log('payload:', payload)
    req.user = payload; 

    next();

  } catch (error: any) {
    console.error("JWT Verification failed details:", error);
    return res.status(401).json({ 
        error: 'Unauthorized', 
        details: error.message,
        message: `Invalid or unauthorized token: ${ error }`
    });
    
  }
}

let user_data = {
  "https@https.com": [
    "HTTPS",
    "it worked perfectly!",
    "Great job.",
    "kevin is my best friend",
  ],
  "http@http.com": [
    "HTTP",
    "Nice one, it worked perfectly!",
    "Great job",
  ],
};


keycloakRouter.get("/protected", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  const userPayload = req.user as JWTPayload;
  const email = req.user;

  try {
   
    res.json({
      message: 'Welcome to the protected route!',
      // user: usersInfo,
      // users_info: usersInfo, 
      keycloak_info: userPayload,
      fetch_from_database: user_data[userPayload.email as keyof typeof user_data] || "No data for this user"
    });
  } catch (error) {
    console.log('error:', error)
    res.status(500).json({ message: "Error parsing user data", error });
  }
});

keycloakRouter.route("/health").
  get(async function (req: Request, res: Response) {

    const healthCheck = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now(),
      services: {
        database: 'connected', // Replace with actual DB ping logic
      },
      message: 'keycloak',
    };
  
    try {
      // Perform actual checks here (e.g., db.authenticate())
      res.status(200).json(healthCheck);
    } catch (error) {
      res.status(503).json({
        ...healthCheck,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // 1. The Login Route: Redirects to Keycloak
keycloakRouter.get('/login', (req: Request, res: Response) => {
  // Replace with your actual Keycloak URL and Client ID
  const realm = 'webapp';
  const clientId = 'your-client-id'; 
  const redirectUri = encodeURIComponent('http://localhost:3000/keycloak/callback');
  
  const keycloakLoginUrl = `https://localhost:8443/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;

  res.redirect(keycloakLoginUrl);
});

// 2. The Callback Route: This is where you RECORD THE LOG
keycloakRouter.get('/callback', async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No code provided from Keycloak');
  }

  try {
    // Exchange the code for a token (Server-to-Server call)
    // Note: You might need axios or fetch here to talk to Keycloak's /token endpoint
    
    /* LOGGING LOGIC:
       Once the token is received and validated, you log it here:
    */
    console.log(`[AUTH LOG] User login attempt detected at ${new Date().toISOString()}`);
    
    // For local dev, you can return the token to the user so they can use it in Bearer headers
    res.json({ 
        message: "Login successful. Use the access_token in your Authorization header.",
        code_received: code 
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
});

  keycloakRouter.get('/logout', (req: Request, res: Response) => {
    // Capture the user identity from the token if they are still authenticated
    // This is where you record who is leaving
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Optional: Decode without full verification just for logging purposes
      // or just log that a logout was requested.
      console.log(`[AUTH LOG] Logout initiated at ${new Date().toISOString()}`);
    }
  
    // Define Keycloak parameters
    const realm = 'webapp';
    const postLogoutRedirectUri = encodeURIComponent('http://localhost:3000/keycloak/public');
    const clientId = 'your-client-id';
  
    /**
     * Define the Keycloak Logout URL
     * In modern Keycloak (v18+), the standard OIDC logout endpoint is used.
     */
    const keycloakLogoutUrl = `https://localhost:8443/realms/${realm}/protocol/openid-connect/logout?client_id=${clientId}&post_logout_redirect_uri=${postLogoutRedirectUri}`;
  
    // Redirect the user to Keycloak to clear their session
    res.redirect(keycloakLogoutUrl);
  });

