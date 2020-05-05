import Server from './server';

async function main() { 
  const server = Server.instance;
  await server.start();
};

main();

