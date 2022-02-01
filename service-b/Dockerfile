FROM node:lts-slim as builder

WORKDIR /home/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

FROM node:lts-alpine AS release
COPY --from=builder /home/app /home/app

WORKDIR /home/app

EXPOSE 3000

# ENTRYPOINT [ "node" ]
CMD [ "node", "./server" ]