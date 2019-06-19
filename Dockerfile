FROM node:9.11.2-alpine
WORKDIR /opt/services/djangoapp/knowis_web

COPY . /opt/services/djangoapp/knowis_web

RUN yarn
RUN yarn build
