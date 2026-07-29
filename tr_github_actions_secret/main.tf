terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
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
    AWS_EC2_INSTANCE_NAME                  = var.aws_ec2_instance_name
    AWS_REGION                             = var.aws_region
    AWS_ROLE                               = var.aws_role
    BACKEND_REST_API_DOCKER_HUB_REPO_NAME = var.backend_rest_api_docker_hub_repo_name
    DB_APP_SERVICE_NAME                    = var.db_app_service_name
    DB_NAME                                = var.db_name
    DB_PASSWORD                            = var.db_password
    DB_PORT                                = var.db_port
    DB_USER                                = var.db_user
    DEV_LOCALHOST                          = var.dev_localhost
    DOCKER_PASSWORD                        = var.docker_password
    DOCKER_USERNAME                        = var.docker_hub_username
    FRONTEND_DOMAIN_NAME                   = var.frontend_domain_name
    HOST_MACHINE                           = var.host_machine
    KC_ADMIN_DOMAIN_NAME                   = var.kc_admin_domain_name
    KC_AUDIENCE                            = var.kc_audience
    KC_PORT                                = var.kc_port
    KC_REALMS_NAME                         = var.kc_realms_name
    ME_PASSWORD                            = var.me_password
    ME_USERNAME                            = var.me_username
    MONGODB_DB                             = var.mongodb_db
    MONGODB_URL                            = var.mongodb_url
    MONGO_DATABASE                         = var.mongo_database
    MONGO_HOST                             = var.mongo_host
    MONGO_PASSWORD                         = var.mongo_password
    MONGO_PORT                             = var.mongo_port
    MONGO_USERNAME                         = var.mongo_username
    NODE_PORT                              = var.node_port
    NODE_USER                              = var.node_user
  }
}

# Loop through map to create secrets
resource "github_actions_secret" "repo_secrets" {
  for_each        = local.secrets
  repository      = local.repo_name
  secret_name     = each.key
  plaintext_value = each.value
}