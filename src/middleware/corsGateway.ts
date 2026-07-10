import { CorsOptions } from "cors";

const { 
  DEV_LOCALHOST,
  KC_DOMAIN_NAME,
  PROD_FRONTEND_DOMAIN_NAME } = process.env

// const PROD_FRONTEND_DOMAIN_NAME = process.env.FRONTEND_DOMAIN_NAME;
// const DEV_LOCALHOST = `https://localhost:4000`;
// const KC_DOMAIN_NAME = `https://${process.env.KC_DOMAIN_NAME}`

// Gateway for CORS
const allowedOrigins = [ PROD_FRONTEND_DOMAIN_NAME, KC_DOMAIN_NAME, DEV_LOCALHOST ];

export const corsOptions: CorsOptions = {
  origin: allowedOrigins as string[],
  credentials: true,            //access-control-allow-credentials:true
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

// export default corsOptions;
