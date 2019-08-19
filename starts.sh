if [ -d "../schulcloud-server" ]; then
  cd ../schulcloud-server
  npm run seed
  NODE_ENV=test npm run start
fi
