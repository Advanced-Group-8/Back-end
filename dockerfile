FROM node:24-alpine

WORKDIR /backend

COPY package*.json ./
 
RUN npm ci

COPY . .

RUN npm run build 

# Ta bort denna rad - den förstör path resolution
# RUN npm prune --production

EXPOSE 3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /backend
USER nextjs

CMD ["npm", "start"]