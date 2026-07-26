import dotenv from 'dotenv';
import 'dotenv/config';
dotenv.config();

const { MONGO_USERNAME, 
        MONGO_PASSWORD, 
        MONGO_HOST, 
        MONGO_PORT, 
        MONGO_DATABASE, 
        NODE_PORT,
        KC_ADMIN_DOMAIN_NAME,
        KC_REALMS_NAME } = process.env


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


// keycloak Server configuration loaded from environment variables

export const keycloakConfig = {
    KC_JWKS_URL: `${KC_ADMIN_DOMAIN_NAME}/realms/${KC_REALMS_NAME}/protocol/openid-connect/certs`,    
    KC_ISSUER: `${KC_ADMIN_DOMAIN_NAME}/realms/${KC_REALMS_NAME}`,
    // KC_JWKS_URL: `https://localhost:8443/realms/HTTPs_localhost_realm/protocol/openid-connect/certs`,    
    // KC_ISSUER: `https://localhost:8443/realms/HTTPs_localhost_realm`,
    port: parseInt(`8443`), // keycloak Server port
  };
  
