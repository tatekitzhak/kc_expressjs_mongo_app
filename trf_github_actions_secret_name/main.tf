terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "6.0.0" # Compatible with Terraform 1.5.x
    }
  }
}

# Configure the GitHub Provider
provider "github" {
  owner = "tatekitzhak" # GitHub Organization or User
}

# Define local secrets map
locals {
  repo_name = "kc_expressjs_mongo_app"

  secrets = {
    BACKEND_REST_API_DOCKER_HUB_REPO_NAME = "expressjs_rest_api_app:main"
    HOST_MACHINE          = "localhost"
    DEV_LOCALHOST         = "localhost:4000"
    FRONTEND_DOMAIN_NAME  = "https://3.17.57.159:4000"
    KC_ADMIN_DOMAIN_NAME  = "https://3.17.57.159:8443"
    KC_PORT               = "8443"
    KC_REALMS_NAME        = "HTTPs_localhost_realm"
    KC_AUDIENCE           = "https_localhost_client_id"
    NODE_USER             = "node"
    NODE_PORT             = "3000"
    DB_PORT               = "27017"
    DB_USER               = "testdb"
    DB_PASSWORD           = "admin"
    DB_NAME               = "mynodejsapp"
    MONGODB_URL           = "mongodb://root:admin@mongo:27017/mynodejsapp?authSource=admin"
    MONGODB_DB            = "blog"
    MONGO_HOST            = "mongo"
    MONGO_PORT            = "27017"
    MONGO_DATABASE        = "db_name"
    MONGO_USERNAME        = "root"
    MONGO_PASSWORD        = "admin"
    DB_APP_SERVICE_NAME   = "db_app"
    ME_USERNAME           = "admin"
    ME_PASSWORD           = "admin"
  }
}

# Loop through map to create secrets
resource "github_actions_secret" "repo_secrets" {
  for_each        = local.secrets
  repository      = local.repo_name
  secret_name     = each.key
  plaintext_value = each.value
}