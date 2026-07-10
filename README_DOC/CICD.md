# Build => Scan => Test => Deploy

*******************************************************************
#   How to Configuration and Run the project on AWS EC2 server:  **
*******************************************************************
# How to Configuration and Run the project on AWS EC2 server:

1.  Modify an `.env` file is compatible correctly against Production
2. `docker network create kc_shared_central_nginx_proxy_network`
3. SSL
- Go to directory: `nginx/certs/` and run:
```bash
***** IF LOCALHOST ****

openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 -days 365 \
  -subj "/CN=3.145.25.141" -extensions EXT -config <( \
   printf "[dn]\nCN=3.145.25.141\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=IP:3.145.25.141\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

***** IF PROD ****
openssl req -x509 -out prod.crt -keyout prod.key \
  -newkey rsa:2048 -nodes -sha256 -days 365 \
  -subj "/CN=18.117.180.32" -extensions EXT -config <( \
   printf "[dn]\nCN=18.117.180.32\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=IP:18.117.180.32\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
  ```
4. Handle the CORS policy: `./middleware/corsGateway.js`

# Keycloak Server Admin
1. Update `docker-compose.yml` file
- # Add this extra host configuration mapping to route the traffic internally
    extra_hosts:
      - "[IP_ADDR_OR_DOMAIN_NAME]:host-gateway"

- KC_HOSTNAME_ADMIN_URL: https://[IP_ADDR_OR_DOMAIN_NAME]:8443
- KC_HOSTNAME_URL: https://[IP_ADDR_OR_DOMAIN_NAME]:8443

4. npm artifacts
- `npm run clean`
- `npm run build`

7. Deploy on EC2: `docker pull [repository_name]:[version]`
- To validate if your image has created: `docker images`
- Run container:
```bash
docker run -d \
--name abcd \
-p 4000:443 \
ranitzahak/tr-kc-spindraw-img:v1
```

- `docker compose down`
- `docker compose up -d`

- To list the running container: `docker ps`


# Keycloak Admin Console
- Create realm
- Create client - Login settings:
1. Root URL:`https://[domain_name]:4000` - The base URL of your application.
2. Home URL:`https://[domain_name]:4000`- Where the auth server redirects users if they click a "Back to Application" link.
3. Valid redirect URIs:`https://[domain_name]:4000/*` - Crucial. The specific paths where the auth server is allowed to send the login response. The wildcard * allows for various routes.
4. Valid post logout redirect URIs:`https://[domain_name]:4000/*` - Where the user is sent after logging out.
5. Web origins: `https://[domain_name]:4000` - This enables CORS. It allows your React app's domain to make JavaScript requests to the auth server.
- Create user: 


3. Client Keycloak
- The client account is represents an application or service that trusts Keycloak to authenticate users or authenticate itself.
- Clients are applications and services that can request authentication of a user:

```bash
Root URL: 
Home URL:
Valid redirect URIs:
Valid post logout redirect URIs:
Web origins:
```

  Field,     Value,                    Description
- Root URL: `https://localhost:4000` - The base URL of your application.
- Home URL: `https://localhost:5173`- Where the auth server redirects users if they click a "Back to Application" link.
- Valid redirect URIs: `https://localhost:5173/*` - Crucial. The specific paths where the auth server is allowed to send the login response. The wildcard * allows for various routes.
- Valid post logout redirect URIs: `https://localhost:5173/*` - Where the user is sent after logging out.
- Web origins: `https://localhost:5173` - This enables CORS. It allows your React app's domain to make JavaScript requests to the auth server.

ERROR:

vendor-tJYGX_wu.js:70 
 GET https://18.223.255.165/keycloak/protected 401 (Unauthorized)

index-BwQ2shQi.js:2 Failed to fetch data: AxiosError: Request failed with status code 401
    at zb (vendor-tJYGX_wu.js:70:1087)
    at XMLHttpRequest.D (vendor-tJYGX_wu.js:70:5927)