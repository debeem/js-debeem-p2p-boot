import chalk from 'chalk';

const usage = `
npm run <command> included in ${ chalk.bold( process.env.npm_package_name ) }:

${ chalk.bold( 'Usage:' ) }

  [help page]
  npm run ${ chalk.bold( 'help' ) }

  [run in development mode]
  npm run ${ chalk.bold( 'dev -- --port {port} --file_peer_id {file_peer_id} --file_swarm_key {file_swarm_key}' ) }

  [run in production mode]
  npm run ${ chalk.bold( 'start -- --port {port} --file_peer_id {file_peer_id} --file_swarm_key {file_swarm_key}' ) }


  [generate a new p2p peerId]
  npm run ${ chalk.bold( 'gen-peer-id -- --output {filename}' ) }

  [generate a new p2p swarmKey]
  npm run ${ chalk.bold( 'gen-swarm-key -- --output {filename}' ) }

`

console.log( '%s', usage );
