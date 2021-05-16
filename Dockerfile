FROM golang:1.16.4-buster
ENTRYPOINT []

RUN apt-get update && apt-get install -y fortune fortune-off cowsay