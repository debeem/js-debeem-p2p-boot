import { LogUtil } from 'debeem-utils';
import { TypeUtil } from 'debeem-utils';
import minimist from 'minimist';
import { PeerIdService } from 'debeem-lib';
import { PeerIdStorageService } from 'debeem-lib';
const argv = minimist( process.argv.slice( 2 ) );

/**
 * 	command line:
 * 	node src/tools/PeerIdGenerator.js --output <full output filename>
 * 	npm run gen-peer-id -- --output <full output filename>
 *
 *	@returns {Promise<boolean>}
 */
async function peerIdFuncGenerator()
{
	const filename = argv.output;
	if ( ! TypeUtil.isNotEmptyString( filename ) )
	{
		LogUtil.say( `Please specify a filename to save peerId data by -- --output <full output filename>` );
		return false;
	}

	//	Create a Uint8Array and write the swarm key to it
	const peerId = await PeerIdService.flushPeerId( filename );

	//
	//	read the result
	//
	setTimeout( async () =>
	{
		const storagePeerId = new PeerIdStorageService().storagePeerIdFromRaw( peerId );
		console.log( `swarmKey in file ${ filename }:` )
		console.log( `------------------------------------------------------------` )
		console.log( JSON.stringify( storagePeerId ) );
		console.log( `------------------------------------------------------------` )

	}, 100 );

	return true;
}


peerIdFuncGenerator().then();
