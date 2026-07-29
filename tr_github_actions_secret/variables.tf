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