FROM envoyproxy/envoy-alpine:latest
COPY envoyproxy-config/front-proxy-envoy.yaml /front-proxy-envoy.yaml
EXPOSE 8090
CMD envoy -c /front-proxy-envoy.yaml --service-cluster micro-front-ends-front-proxy