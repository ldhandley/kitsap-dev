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

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "line_items_to_stripe_checkout_URL_lambda" {
  depends_on    = [
    null_resource.push
  ]
  image_uri     = "${aws_ecr_repository.ecr_repo.repository_url}@${data.aws_ecr_image.lambda_image.id}" 
  function_name = "demo_web_ordering_form_terraform"
  role          = aws_iam_role.iam_for_lambda.arn
  package_type  = "Image"

}


resource "aws_api_gateway_rest_api" "checkout" {
  name = "demo_web_ordering_form_terraform"
}

resource "aws_api_gateway_resource" "checkout" {
  rest_api_id = aws_api_gateway_rest_api.checkout.id
  parent_id   = aws_api_gateway_rest_api.checkout.root_resource_id
  path_part   = "checkouts"
}

# /checkouts will respond to OPTIONS and POST
# OPTIONS resources 
resource "aws_api_gateway_method" "checkout_OPTIONS" {
  rest_api_id   = aws_api_gateway_rest_api.checkout.id
  resource_id   = aws_api_gateway_resource.checkout.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "checkout_OPTIONS" {
  rest_api_id = aws_api_gateway_rest_api.checkout.id
  resource_id = aws_api_gateway_resource.checkout.id
  http_method = aws_api_gateway_method.checkout_OPTIONS.http_method
  type = "MOCK"
}


resource "aws_api_gateway_method_response" "checkout_OPTIONS" {
  depends_on = [aws_api_gateway_method.checkout_OPTIONS]
  rest_api_id = aws_api_gateway_rest_api.checkout.id
  resource_id = aws_api_gateway_resource.checkout.id
  http_method = aws_api_gateway_method.checkout_OPTIONS.http_method
  status_code = 200
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Headers" = true
  }
  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "checkout_OPTIONS" {
  depends_on = [aws_api_gateway_integration.checkout_OPTIONS, aws_api_gateway_method_response.checkout_OPTIONS]
  rest_api_id = aws_api_gateway_rest_api.checkout.id
  resource_id = aws_api_gateway_resource.checkout.id
  http_method = aws_api_gateway_method.checkout_OPTIONS.http_method
  status_code = 200
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'", # replace with hostname of frontend (CloudFront)
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET, POST'" # remove or add HTTP methods as needed
  }
}

# POST resources 
resource "aws_api_gateway_method" "checkout_POST" {
  rest_api_id   = aws_api_gateway_rest_api.checkout.id
  resource_id   = aws_api_gateway_resource.checkout.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "checkout_POST" {
  rest_api_id             = aws_api_gateway_rest_api.checkout.id
  resource_id             = aws_api_gateway_resource.checkout.id
  http_method             = aws_api_gateway_method.checkout_POST.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.line_items_to_stripe_checkout_URL_lambda.invoke_arn
  depends_on    = [
    aws_api_gateway_method.checkout_POST,
    aws_lambda_function.line_items_to_stripe_checkout_URL_lambda
    ]
}

resource "aws_api_gateway_method_response" "checkout_POST" {
    rest_api_id   = "${aws_api_gateway_rest_api.checkout.id}"
    resource_id   = "${aws_api_gateway_resource.checkout.id}"
    http_method   = "${aws_api_gateway_method.checkout_POST.http_method}"
    status_code   = "200"
    response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Headers" = true
  }
    depends_on = [aws_api_gateway_method.checkout_POST]
}


resource "aws_api_gateway_integration_response" "checkout_POST" {
  rest_api_id = "${aws_api_gateway_rest_api.checkout.id}"
  resource_id = "${aws_api_gateway_resource.checkout.id}"
  http_method = "${aws_api_gateway_method.checkout_POST.http_method}"
  status_code = 200
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'",
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Requested-With'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'"
  }
  depends_on = [
    aws_api_gateway_integration.checkout_POST,
    aws_api_gateway_method_response.checkout_POST,
  ]
}




# Lambda
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.line_items_to_stripe_checkout_URL_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/*/* part allows invocation from any stage, method and resource path
  # within API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.checkout.execution_arn}/*/*/*"
}


resource "aws_api_gateway_deployment" "checkout" {
  rest_api_id = aws_api_gateway_rest_api.checkout.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.checkout.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "checkout" {
  deployment_id = aws_api_gateway_deployment.checkout.id
  rest_api_id   = aws_api_gateway_rest_api.checkout.id
  stage_name    = "prod"
}

#resource "aws_api_gateway_method_settings" "checkout" {
#  rest_api_id = aws_api_gateway_rest_api.checkout.id
#  stage_name  = aws_api_gateway_stage.checkout.stage_name
#  method_path = "*/*"
#
#  settings {
#    metrics_enabled = true
#    logging_level   = "INFO"
#  }
#}

resource "aws_api_gateway_gateway_response" "response_4xx" {
  rest_api_id   = aws_api_gateway_rest_api.checkout.id
  response_type = "DEFAULT_4XX"

  response_templates = {
    "application/json" = "{'message':$context.error.messageString}"
  }

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin" = "'*'" # replace with hostname of frontend (CloudFront)
  }
}

resource "aws_api_gateway_gateway_response" "response_5xx" {
  rest_api_id   = aws_api_gateway_rest_api.checkout.id
  response_type = "DEFAULT_5XX"

  response_templates = {
    "application/json" = "{'message':$context.error.messageString}"
  }

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin" = "'*'" # replace with hostname of frontend (CloudFront)
  }
}
