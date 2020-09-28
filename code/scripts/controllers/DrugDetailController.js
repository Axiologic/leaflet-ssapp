import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import Drug from "../models/Drug.js";

function getViewModel(drug) {
    let viewModel = {
        "view-leaflet": {
            "label": "View eLeaflet (pdf)",
            "eventName": "view-leaflet"
        },
        "chapters": [
            {
                "icon": "resources/images/validity.png",
                "title": "Validity",
                "prop": "validityDate",
                "details": ""
            },
            {
                "icon": "resources/images/recommendations.png",
                "title": "Recommendations",
                "prop": "recommendations",
                "details": ""
            },
            {
                "icon": "resources/images/active_subs.png",
                "title": "Active Substances",
                "prop": "activeSubstances",
                "details": ""
            },
            {
                "icon": "resources/images/contraindications.png",
                "title": "Contra Indications",
                "prop": "contraIndications",
                "details": ""
            },
            {
                "icon": "resources/images/dosage.png",
                "title": "Dosage",
                "prop": "dosage",
                "details": ""
            }
        ]
    };


    for (let chapterIndex in viewModel.chapters) {
        let chapter = viewModel.chapters[chapterIndex];
        chapter.details = drug[chapter.prop];
    }

    return viewModel;
}

export default class DrugDetailController extends ContainerController {
    constructor(element, history) {
        super(element);
        let drug = new Drug();
        console.log("Adding to history");
        this.setModel(getViewModel(drug));
        let drugs = [];
        this.DSUStorage.getItem('/data/drugsHistory.json', 'json', (err, drugsHistory) => {
            if (err) {
            } else {
                drugs = drugsHistory;
            }
            let found = false;
            for(let i=0; i<drugs.length; i++){
                if(drugs[i].commercialName === drug.commercialName){
                    found = true;
                    break;
                }
            }
            if(!found){
                drugs.push(drug);
                this.DSUStorage.setItem('/data/drugsHistory.json', JSON.stringify(drugs), err => {
                    if (err) {
                        throw err;
                    }
                });
            }
        });


        this.on("view-leaflet", (event) => {
            console.log("Caught event", event);
            history.push("/leaflet");
        });
    }
}
