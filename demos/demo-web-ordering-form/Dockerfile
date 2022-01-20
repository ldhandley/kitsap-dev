FROM public.ecr.aws/lambda/nodejs:12
COPY app.js package*.json ./
COPY node_modules ./node_modules
CMD [ "app.handler" ]
