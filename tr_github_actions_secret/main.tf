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

# --- Variables ---

variable "aws_ec2_instance_name" {
  type        = string
  default     = ""
  description = "AWS EC2 Instance Name"
}

variable "aws_region" {
  type        = string
  default     = ""
  description = "AWS Region"
}

variable "aws_role" {
  type        = string
  default     = ""
  description = "AWS IAM Role ARN"
}

variable "backend_rest_api_docker_hub_repo_name" {
  type        = string
  default     = ""
  description = "Backend REST API Docker Hub repo name"
}

variable "db_app_service_name" {
  type    = string
  default = ""
}

variable "db_name" {
  type    = string
  default = ""
}

variable "db_password" {
  type      = string
  default   = ""
  sensitive = true
}

variable "db_port" {
  type    = string
  default = ""
}

variable "db_user" {
  type    = string
  default = ""
}

variable "dev_localhost" {
  type    = string
  default = ""
}

variable "docker_password" {
  type        = string
  description = "Docker Hub access password or token"
  sensitive   = true
}

variable "docker_hub_username" {
  type        = string
  description = "Docker Hub username"
}

variable "frontend_domain_name" {
  type    = string
  default = ""
}

variable "host_machine" {
  type    = string
  default = ""
}

variable "kc_admin_domain_name" {
  type    = string
  default = ""
}

variable "kc_audience" {
  type    = string
  default = ""
}

variable "kc_port" {
  type    = string
  default = ""
}

variable "kc_realms_name" {
  type    = string
  default = ""
}

variable "me_password" {
  type      = string
  default   = ""
  sensitive = true
}

variable "me_username" {
  type    = string
  default = ""
}

variable "mongodb_db" {
  type    = string
  default = ""
}

variable "mongodb_url" {
  type      = string
  default   = ""
  sensitive = true
}

variable "mongo_database" {
  type    = string
  default = ""
}

variable "mongo_host" {
  type    = string
  default = ""
}

variable "mongo_password" {
  type      = string
  default   = ""
  sensitive = true
}

variable "mongo_port" {
  type    = string
  default = ""
}

variable "mongo_username" {
  type    = string
  default = ""
}

variable "node_port" {
  type    = string
  default = ""
}

variable "node_user" {
  type    = string
  default = ""
}