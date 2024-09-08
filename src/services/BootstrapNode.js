import { createLibp2p } from 'libp2p';
//import { preSharedKey } from 'libp2p/pnet';
import { preSharedKey } from '@libp2p/pnet';
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { mplex } from '@libp2p/mplex'
import { tcp } from '@libp2p/tcp';
import { webSockets } from '@libp2p/websockets';
//import { bootstrap } from '@libp2p/bootstrap'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'
//import { floodsub } from '@libp2p/floodsub'
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
//import { circuitRelayTransport, circuitRelayServer } from 'libp2p/circuit-relay'
import { circuitRelayTransport, circuitRelayServer } from '@libp2p/circuit-relay-v2'
//import { identifyService } from 'libp2p/identify'
import { identify, identifyPush } from '@libp2p/identify'
import { ProcessUtil } from "debeem-utils";


export class BootstrapNode
{
	/**
	 * @typedef {import('@libp2p/interface').Libp2p} Libp2p
	 *
	 * @typedef {import('@libp2p/interface/peer-id').PeerId} PeerId
	 * @typedef {import('@libp2p/interface/peer-id').RSAPeerId} RSAPeerId
	 * @typedef {import('@libp2p/interface/peer-id').Ed25519PeerId} Ed25519PeerId
	 * @typedef {import('@libp2p/interface/peer-id').Secp256k1PeerId} Secp256k1PeerId
	 *
	 * @typedef {import('@libp2p/interface/pubsub').PubSub} PubSub
	 * @typedef {import('@libp2p/interface/pubsub').PubSubEvents} PubSubEvents
	 *
	 * @typedef {import('libp2p').Libp2pOptions} Libp2pOptions
	 *
	 */

	/**
	 * @typedef {import('@libp2p/interface').Libp2p} Libp2p
	 * @typedef {import('peer-id')} PeerId
	 */

	/**
	 * @typedef {Object} HopRelayOptions
	 * @property {PeerId} [peerId]
	 * @property {string[]} [listenAddresses = []]
	 * @property {string[]} [announceAddresses = []]
	 * @property {boolean} [pubsubDiscoveryEnabled = true]
	 * @property {string[]} [pubsubDiscoveryTopics = ['_peer-discovery._p2p._pubsub']] uses discovery default
	 */

	/**
	 * Create a Libp2p Relay with HOP service
	 *
	 * @param {HopRelayOptions} options
	 * @returns {Promise<Libp2p>}
	 */
	static async create(
		{
			peerId = undefined,
			swarmKey = undefined,
			listenAddresses = [],
			announceAddresses = []
		}
	)
	{
		return new Promise( async ( resolve, reject ) =>
		{
			try
			{
				if ( ! ProcessUtil.isNodeVersionSufficient( `20.17.0` ) )
				{
					return reject( `BootstrapNode.create :: this program must be run on node version 20.17.0 or above!` );
				}

				// let options = {
				// 	peerId : peerId,
				// 	modules : {
				// 		transport : [ Websockets, TCP ],
				// 		streamMuxer : [ MPLEX ],
				// 		connEncryption : [ NOISE ],
				// 		pubsub : GossipSub,
				// 		peerDiscovery : [ pubsubPeerDiscovery({
				// 			interval: 1000
				// 		}) ]
				// 	},
				// 	addresses : {
				// 		listen : listenAddresses,
				// 		announce : announceAddresses
				// 	},
				// 	config : {
				// 		pubsub : {
				// 			enabled : pubsubDiscoveryEnabled
				// 		},
				// 		peerDiscovery : {
				// 			[ PubsubPeerDiscovery.tag ] : {
				// 				topics : pubsubDiscoveryTopics,
				// 				enabled : pubsubDiscoveryEnabled
				// 			}
				// 		},
				// 		relay : {
				// 			enabled : true, // Allows you to dial and accept relayed connections. Does not make you a relay.
				// 			hop : {
				// 				enabled : true // Allows you to be a relay for other peers
				// 			}
				// 		}
				// 	}
				// };

				//
				//   connectionGater: ConnectionGater
				//
				//   /**
				//    * libp2p transport manager configuration
				//    */
				//   transportManager: TransportManagerInit
				//
				//   /**
				//    * An optional datastore to persist peer information, DHT records, etc.
				//    *
				//    * An in-memory datastore will be used if one is not provided.
				//    */
				//   datastore: Datastore
				//
				//   /**
				//    * libp2p PeerStore configuration
				//    */
				//   peerStore: PersistentPeerStoreInit
				//
				//   /**
				//    * keychain configuration
				//    */
				//   keychain: KeyChainInit
				//
				//
				let options = {
					peerId: peerId,
					addresses : {
						listen : listenAddresses,
						//announce: ['/dns4/auto-relay.libp2p.io/tcp/443/wss/p2p/QmWDn2LY8nannvSWJzruUYoLZ4vV83vfCBwd8DipvdgQc3']
						announce : announceAddresses,
					},
					transports : [
						tcp(),
						webSockets(),
						circuitRelayTransport()
					],
					streamMuxers : [
						yamux(), mplex()
					],
					connectionEncryption : [
						noise()
					],
					peerDiscovery: [
						pubsubPeerDiscovery({
							interval: 3000
						})
					],
					services : {
						relay : circuitRelayServer(),
						//identify : identifyService(),
						identify: identify(),
						identifyPush: identifyPush(),
						pubsub: gossipsub({
							//
							//	https://github.com/ChainSafe/js-libp2p-gossipsub
							//

							//	boolean identifying whether the node should emit to self on publish,
							//	in the event of the topic being subscribed
							//	(defaults to false).
							emitSelf : false,

							//	Do not throw `InsufficientPeers` error if publishing to zero peers
							allowPublishToZeroPeers: true,

							//
							//	Do not throw PublishError.NoPeersSubscribedToTopic error
							//	if there are no peers listening on the topic.
							//
							//	N.B. if you sent this option to true,
							//	and you publish a message on a topic with
							//	no peers listening on that topic,
							//	no other network node will ever receive the message.
							//
							allowPublishToZeroTopicPeers: true,

							//	boolean identifying if incoming messages on a subscribed topic
							//	should be automatically gossiped
							//	(defaults to true).
							gossipIncoming : true,

							//	boolean identifying whether the node should fall back to the floodsub protocol,
							//	if another connecting peer does not support gossipsub (defaults to true).
							fallbackToFloodsub : true,

							//	boolean identifying if self-published messages should be sent to all peers, (defaults to true).
							floodPublish : true,

							//	boolean identifying whether PX is enabled;
							//	this should be enabled in bootstrappers and other
							//	well-connected/trusted nodes (defaults to false).
							doPX : true,

							//	boolean identifying if we want to sign outgoing messages or not (default: true)
							signMessages : true,

							//	boolean identifying if message signing is required for incoming messages or not (default: true)
							strictSigning : true,
						}),

					},
					connectionManager: {
						maxConnections: 1024,
						minConnections: 0
					}
				};
				if ( swarmKey )
				{
					options.connectionProtector = preSharedKey( {
						psk : swarmKey
					} );
				}

				/**
				 * @typedef NodeServices {object}
				 * @property relay {import('libp2p/circuit-relay').CircuitRelayService}
				 * @property identify {import('libp2p/identify').IdentifyService}
				 * @property pubsub {import('@libp2p/interface/pubsub').PubSub<PubSubEvents>}
				 */
				/**
				 * @type {import('@libp2p/interface').Libp2p<NodeServices>}
				 */
				const node = await createLibp2p( /** @type {Libp2pOptions<NodeServices>} */ options );
				node.addEventListener( 'peer:connect', ( evt ) =>
				{
					try
					{
						const peerId = evt.detail;
						console.log( 'Connection established to:', peerId.toString() ) // Emitted when a peer has been found
					}
					catch ( err )
					{
						console.error( err );
					}
				} );
				node.addEventListener( 'peer:discovery', ( evt ) =>
				{
					try
					{
						const peerInfo = evt.detail;
						//console.log( `peerInfo : `, peerInfo );
						//node.dial( peerInfo.id );
						console.log( `Discovered: ${ peerInfo.id.toString() }` );
					}
					catch ( err )
					{
						console.error( err );
					}
				} );

				//	...
				resolve( node );
			}
			catch ( err )
			{
				reject( err );
			}
		});
	}
}
