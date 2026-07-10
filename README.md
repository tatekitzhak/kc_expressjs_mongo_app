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
