packer {
    required_plugins {
        googlecompute = {
            source  = "github.com/hashicorp/googlecompute"
            version = "~> 1.1.4"
        }
        ansible = {
            version = "~> 1.1.1"
            source = "github.com/hashicorp/ansible"
        }
    }
}

source "googlecompute" "ubuntu" {
    project_id = var.project_id
    source_image = "debian-12-bookworm-v20240617"
    zone = "asia-southeast1-a"

    image_name = var.os_image_name
    address = "shuttlezone-static-ip-address"

    ssh_username = "${var.email}"
    credentials_json = "${var.gcp_credentials_json}"
}

build {
    sources = ["source.googlecompute.ubuntu"]

    provisioner "ansible" {
        playbook_file = "./.deploy/ansible/docker.yml"
    }

    provisioner "ansible" {
        playbook_file = "./.deploy/ansible/cert-bot.yml"
        extra_arguments = ["--extra-vars", "domain=${var.domain} email=${var.email}"]
    }
}