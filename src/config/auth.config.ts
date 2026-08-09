import dotenv from 'dotenv';
import 'dotenv/config';
dotenv.config();

// Helper function to remove trailing slashes from URLs
const cleanUrl = (url?: string) => (url ? url.replace(/\/+$/, '') : '');

// const {
//     KC_ADMIN_DOMAIN_NAME = 'https://localhost:8443',
//     KC_REALM_NAME = 'HTTPS_localhost_realm',
//     KC_INTERNAL_URL = 'http://keycloak_container:8080'
// } = process.env;

const { 
    KC_ADMIN_DOMAIN_NAME,
    KC_REALM_NAME = 'HTTPS_localhost_realm',
    KC_INTERNAL_URL = 'http://keycloak_container:8080',
    KC_PORT = '8443'
  } = process.env;

type ConnectionEnv = 'app' | 'db' | 'redis';

interface ConnectionInfo {
    [name: string]: string | number | undefined | Record<string, string>;
};


export const ConnectionConfig: Record<ConnectionEnv, ConnectionInfo> = {
    "db": {
        uri: process.env.MONGODB_URI,
        dbName: process.env.MONGODB_DB,
        collection: {
            categoryBlog: 'category',
            subcategoryBlog: 'subcategory',
            topicBlog: 'topic',
            articleBlog: 'article',
            videoBlog: 'video'
        }
    },
    "redis": {
        host: process.env['REDIS_HOST'],
        port: process.env['REDIS_PORT'] //parseInt(process.env.REDIS_PORT)
    },
    "app": {
        host: process.env['NODE_PORT'],
        port: process.env.NODE_PORT //parseInt(process.env.APP_PORT)
    }
}

const publicIssuerHost = cleanUrl(KC_ADMIN_DOMAIN_NAME) || 'https://localhost:8443';
const internalHost = cleanUrl(KC_INTERNAL_URL);

export const keycloakConfig = {
    // Fetch keys internally via Docker's HTTP network
    KC_JWKS_URL: `${KC_INTERNAL_URL}/realms/${KC_REALM_NAME}/protocol/openid-connect/certs`,

    // Validate token payload against public HTTPS issuer
    KC_ISSUER: `${KC_ADMIN_DOMAIN_NAME}/realms/${KC_REALM_NAME}`,
    // port: parseInt(`8443`),
    port: parseInt(KC_PORT, 10),
}
