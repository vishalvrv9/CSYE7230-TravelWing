packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {

  type    = string
  default = "us-east-1"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "source_ami" {
  type    = string
  default = "ami-058bd2d568351da34"
} 

variable "owners" {
  type    = string
  default = "891377128318"
}

variable "ami_users" {
  type    = string
  default = "339713031935"
}

source "amazon-ebs" "debian" {
  instance_type = "t2.medium"
  region        = "${var.aws_region}"
  ami_name      = "Travel-Wing-AMI-${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"

  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  source_ami   = "${var.source_ami}"
  ssh_username = "${var.ssh_username}"
  ami_users = ["${var.ami_users}"]

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 50
    volume_type           = "gp2"
  }
}

build {
  name    = "learn-packer"
  sources = ["source.amazon-ebs.debian"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/WebAppRenamed"
  }

  provisioner "file" {
    source      = "./webapplication.service"
    destination = "/tmp/webapplication.service"
  }

  provisioner "file" {
    source      = "./frontend.service"
    destination = "/tmp/frontend.service"
  }

  provisioner "shell" {
    scripts = ["./setup.sh"]
  }
}