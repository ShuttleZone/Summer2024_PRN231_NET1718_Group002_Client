terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.30.0"
    }
  }
}

provider "google" {
  project     = var.project_id
  region      = var.region
}

resource "google_compute_instance" "shuttle_zone_web_client" {
  boot_disk {
    auto_delete = true
    device_name = "shuttle-zone-client"

    initialize_params {
      image = "projects/${var.project_id}/global/images/vigig-client-debian"
      size  = 50
      type  = "pd-balanced"
    }

    mode = "READ_WRITE"
  }

  can_ip_forward      = false
  deletion_protection = false
  enable_display      = false

  labels = {
    goog-ec-src = "vm_add-tf"
  }

  machine_type = "e2-medium"
  name         = "shuttle-zone-client"

  network_interface {
    access_config {
      network_tier = "PREMIUM"
      nat_ip = var.static_ip
    }

    queue_count = 0
    stack_type  = "IPV4_ONLY"
    subnetwork  = "projects/${var.project_id}/regions/${var.region}/subnetworks/default"
  }

  scheduling {
    automatic_restart   = true
    on_host_maintenance = "MIGRATE"
    preemptible         = false
    provisioning_model  = "STANDARD"
  }

  shielded_instance_config {
    enable_integrity_monitoring = true
    enable_secure_boot          = false
    enable_vtpm                 = true
  }

  zone = var.zone
}
