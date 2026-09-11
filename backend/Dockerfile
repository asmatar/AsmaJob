
# image docker for node
FROM node:22-alpine

#directory in docker container
WORKDIR /app

# Copie des fichiers de dépendances pour optimiser le cache
COPY package*.json ./

#install all dependency
RUN npm install

#copy the rest of our app into the container
COPY . .

# --- AJOUTER CETTE LIGNE POUR COMPILER ---
RUN npm run build

#set port environment variable
ENV PORT=3000
EXPOSE 3000

# start
CMD ["npm", "run", "start:prod"]