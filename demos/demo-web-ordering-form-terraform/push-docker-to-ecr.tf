# Calculate hash of the Docker image source contents
data "external" "hash" {
  program = ["${path.module}/line_items_to_stripe_checkout_URL_lambda/hash.sh"]
}

# Build and push the Docker image whenever the hash changes
resource "null_resource" "push" {
  triggers = {
    hash = data.external.hash.result["hash"]
  }

  provisioner "local-exec" {
    command     = "docker build -t '${var.ecr_repo_name}' ./line_items_to_stripe_checkout_URL_lambda/ && aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin ${aws_ecr_repository.ecr_repo.repository_url} && docker tag ${var.ecr_repo_name}:latest ${aws_ecr_repository.ecr_repo.repository_url}:latest && docker push ${aws_ecr_repository.ecr_repo.repository_url}:latest"
    interpreter = ["bash", "-c"]
  }
}
