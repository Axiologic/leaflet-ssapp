$$.swarm.describe("leafletLoader", {
    mountDSU: function (mountPath, gtinSSI) {
        rawDossier.mount(mountPath, gtinSSI, (err) => {
            this.return(err);
        });
    }
});
