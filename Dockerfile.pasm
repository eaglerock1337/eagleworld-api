FROM golang:1.16.4-buster AS build
RUN apt update && \
    apt install curl \
                git \
                bash \
                make \
                ca-certificates

WORKDIR /app

COPY go.* ./
RUN go mod download
RUN go mod verify

# copy source files and build the binary
COPY . .
RUN make build

FROM alpine:latest
RUN apk --no-cache add ca-certificates bash
WORKDIR /app/
COPY --from=build /app/server .
RUN ls -la
ENTRYPOINT ["./entrypoint.sh"]
