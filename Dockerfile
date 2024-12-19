FROM node:18.20.5-alpine

WORKDIR /erp_fe_app
COPY . .
RUN yarn install

EXPOSE 5444

CMD ["yarn", "prod"]