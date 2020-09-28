import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';
export default class ScanController extends ContainerController {
	constructor(element, history) {
		super(element);
		this.setModel({data: ''});

		this.on("displayLeaflet", (event)=>{
			history.push({
				pathname: '/leaflet',
				state: {
					SGTIN: this.model.data
				}
			});
		});
	}
}