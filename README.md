# Micro_sample
tiny react/nodejs microservice architecture

# Requirements
- kubernetes
- docker hub account

# Set up
- update your etc/hosts file to map localhost to the host uri in the k8s config
- install [Skaffold](https://skaffold.dev/) for easy start up
- update the docker images in the k8 config to yours

# How to run
```sh
  skaffold dev
```
