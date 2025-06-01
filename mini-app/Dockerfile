# base image
FROM node:20.10-alpine

WORKDIR /usr/app

# copy only package.json và package-lock.json
COPY ./package*.json ./

# cài dependencies và devDependencies (để build)
RUN npm ci

# copy toàn bộ mã nguồn
COPY . .
RUN chown -R node:node /usr/app

# build Next.js
RUN npm run build

# start app
CMD ["npm", "start"]
