FROM node:16
USER node
# RUN mkdir -p /home/node/app/node_modules && chown node /home/node/app/
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
RUN chown node /home/node/app
COPY package.json .
RUN npm install
# COPY --chown=node:node . .
COPY . .
EXPOSE 3050
CMD [ "node", "index.js" ]