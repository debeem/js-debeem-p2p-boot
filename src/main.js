import { LogUtil } from "debeem-utils";
import { Boot } from "./boot.js";

console.log( `main process.env`, process.env );
new Boot().startBoot()
	.then( ( res ) => console.log( `res :`, res ) )
	.catch( err => { LogUtil.say( err ) } );