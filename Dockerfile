FROM node:22
WORKDIR /app
COPY . /app
RUN npm install
ENV PORT 8080
EXPOSE 8080
CMD ["npm","start"]