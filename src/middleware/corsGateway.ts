import { CorsOptions } from "cors";

const { 
  EXPRESSJS_REST_API,
  KC_ADMIN_DOMAIN_NAME,
  FRONTEND_DOMAIN_NAME } = process.env


// Gateway for CORS
const allowedOrigins = [ FRONTEND_DOMAIN_NAME, KC_ADMIN_DOMAIN_NAME, EXPRESSJS_REST_API ];

export const corsOptions: CorsOptions = {
  origin: allowedOrigins as string[],
  credentials: true,            //access-control-allow-credentials:true
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

