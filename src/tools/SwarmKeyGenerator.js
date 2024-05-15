import { LogUtil } from 'debeem-utils';
import { TypeUtil } from 'debeem-utils';
import { SwarmKeyStorageService } from 'debeem-lib';
import { SwarmKeyService } from 'debeem-lib';
import minimist from "minimist";
const argv = minimist( process.argv.slice( 2 ) );

/**
 * 	command line:
 * 	node src/tools/SwarmKeyGenerator.js --output <full output filename>
 * 	npm run gen-swarm-key -- --output <full output filename>
 *
 *	@returns {Promise<boolean>}
 */
async function swarmKeyFuncGenerator()
{
	const filename = argv.output;
	if ( ! TypeUtil.isNotEmptyString( filename ) )
	{
		LogUtil.say( `Please specify a filename to save swarmKey data by -- --output <full output filename>` );
		return false;
	}

	//	Create a Uint8Array and write the swarm key to it
	const swarmKey = await SwarmKeyService.flushSwarmKey( filename );

	//
	//	read the result
	//
	setTimeout( async () =>
	{
		const swarmKeyString = new SwarmKeyStorageService().swarmKeyToString( swarmKey );
		console.log( `swarmKey in file ${ filename }:` )
		console.log( `------------------------------------------------------------` )
		console.log( swarmKeyString );
		console.log( `------------------------------------------------------------` )

	}, 100 );

	return true;
}


swarmKeyFuncGenerator().then();
