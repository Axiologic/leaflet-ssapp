import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';
import parse from "../../utils/parse";
export default class ScanController extends ContainerController {
	constructor(element, history) {
		super(element);
		this.setModel({data: ''});

		this.on("displayLeaflet", (event)=>{
			const gtinComponents = parse(this.model.data);
			const gtinSSI = gtinResolver.createGTIN_SSI("default", gtinComponents.gtin, gtinComponents.batch, gtinComponents.expiration);
			if (typeof $$.interactions === "undefined") {
				require('callflow').initialise();
				const se = require("swarm-engine");
				const identity = "test/agent/007";
				se.initialise(identity);
				const SRPC = se.SmartRemoteChannelPowerCord;
				let swUrl = "http://localhost:8080/";
				const powerCord = new SRPC([swUrl]);
				$$.swarmEngine.plug(identity, powerCord);
			}

			$$.interactions
				.startSwarmAs("test/agent/007", "messageLoader", "mountDSU", `/tmp`, gtinSSI.getIdentifier())
				.onReturn((err, res) => {
					history.push("/view-leaflet");
				});
		});
	}
}