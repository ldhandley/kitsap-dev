provider "aws" {
  profile = "default"
  region  = "us-west-1"
}


# # aws ecr create-repository --repository-name lambda-docker-demo --image-scanning-configuration scanOnPush=true

resource "aws_ecr_repository" "ecr_repo" {
  name                 = var.ecr_repo_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# # docker tag lambda-docker-demo:latest $AWS_ACCOUNT_ID.dkr.ecr.us-west-1.amazonaws.com/lambda-docker-demo:latest
#
#module "docker_image" {
#  source = "terraform-aws-modules/lambda/aws//modules/docker-build"
#
#  create_ecr_repo = true
#  ecr_repo        = "demo_ecr_repo"
#  image_tag       = "1.0"
#  source_path     = "context"
#  build_args      = {
#    FOO = "bar"
#  }
#}
#
#resource "docker_image" "pos-backend-image" {
#  name = "pos-backend-image"
#  build {
#    path = "."
#    tag  = ["pos-backend-image:develop"]
#    build_arg = {
#    }
#    label = {
#    }
#  }
#}
#
##
##module "lambda_function" {
##  source = "terraform-aws-modules/lambda/aws"
##
##  function_name  = "my-lambda1"
##  create_package = false
##
##  image_uri    = module.docker_image.image_uri
##  package_type = "Image"
##}
##
##
##
##
##
##resource "aws_iam_role" "iam_for_lambda" {
##  name = "iam_for_lambda"
##
##  assume_role_policy = <<EOF
##{
##  "Version": "2012-10-17",
##  "Statement": [
##    {
##      "Action": "sts:AssumeRole",
##      "Principal": {
##        "Service": "lambda.amazonaws.com"
##      },
##      "Effect": "Allow",
##      "Sid": ""
##    }
##  ]
##}
##EOF
##}
##
##resource "aws_lambda_function" "line_items_to_stripe_checkout_URL_lambda" {
##  filename      = "lambda_function_payload.zip"
##  function_name = "lambda_function_name"
##  role          = aws_iam_role.iam_for_lambda.arn
##  handler       = "index.test"
##
##  # The filebase64sha256() function is available in Terraform 0.11.12 and later
##  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
##  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
##  source_code_hash = filebase64sha256("lambda_function_payload.zip")
##
##  runtime = "nodejs12.x"
##
##  environment {
##    variables = {
##      foo = "bar"
##    }
##  }
##}
