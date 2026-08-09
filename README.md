# Structure of a Project: TypeScript, Node.js, Express and MongoDB Web Application

``` bash 

├ Base URL- The domain or IP address where the API is hosted
│────────────────────────────────────────────────────────────
├── Mongo Express- web-based admin interface for MongoDB:
│   └──  Mongo Express listens Endpoint:
│       ├── https://localhost/mongo-express/
│       ├── 
│       └── 
│
├── NodeJS App
│   ├── https://localhost/
│   │   │ 
│   │   ├── Auth Endpoint
│   │   │   ├── http://login.localhost
│   │   │   ├── 
│   │   │   └──
│   │   │   
│   │   │
│   │   ├── Nginx Health Check Endpoint
│   │   │   └── https://localhost/nginx_health
│   │   │   
│   │   └── NodeJS App Health Check Endpoint
│   │        ├── https://localhost/health1
│   │        ├── https://localhost/health2
│   │        ├── https://localhost/favourites
│   │        └── IResponse.ts
│   │   
│   ├── NodeJS App APIs Endpoint
│   │   ├── Api
│   │   │   ├── Datat Base Health Check Endpoint:
│   │   │   │   ├── https://localhost/db_ping
│   │   │   │   ├── 
│   │   │   │   └── 
│   │   │   │
│   │   │   ├─── Create MongoDB databases, collections and insert the first document:
│   │   │   │   ├── https://localhost/create_collections
│   │   │   │   ├── 
│   │   │   │   └── 
│   │   │   │
│   │   │   ├─── Retrieve data from MongoDB:
│   │   │   │   ├── https://localhost/people
│   │   │   │   ├── 
│   │   │   │   └──
│   │   
│   ├── keycloak
│   │   ├── Api
│   │   │   ├── Auth
│   │   │   │   ├── Login.ts
│   │   │   │   ├── RefreshToken.ts
│   │   │   │   └── Register.ts
│   │   │   └── Home.ts
│   │   └── index.ts
 
```

# Remove and clean dependencies
- `rm -rf package-lock.json node_modules`
- `rm -rf package-lock.json`
- `npm cache verify`
- `npm cache clean -f`


import express, { Application, Request, Response, NextFunction, type Router } from 'express';
import { SignJWT, jwtVerify, JWTPayload, generateSecret, createRemoteJWKSet } from "jose";
import 'dotenv/config';
import { keycloakConfig } from '../config/auth.config.js';

const { 
        KC_ADMIN_DOMAIN_NAME,
        KC_REALM_NAME } = process.env

export const keycloakConfig = {
    KC_JWKS_URL: `${KC_ADMIN_DOMAIN_NAME}/realms/${KC_REALM_NAME}/protocol/openid-connect/certs`,    
    KC_ISSUER: `${KC_ADMIN_DOMAIN_NAME}/realms/${KC_REALM_NAME}`,
    port: parseInt(`8443`), // keycloak Server port
  };



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