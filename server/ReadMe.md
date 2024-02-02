## Install dependencies
npm install
npx prisma init
npx prisma db push

## create .env file and add the following to it
DATABASE_URL="file:.../src/database/dev.db"

## start the app
npm run start:dev