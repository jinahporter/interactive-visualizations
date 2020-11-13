function getMetadata(outcome) {

    d3.json("samples.json").then((importedData) => {
        //console.log(importedData);
        var data = importedData.metadata;

        console.log(data);

        var getIDs = data.filter(row => row.id == outcome);

        var arr = getIDs[0];
        //console.log(getIDs);

        var results = d3.select("#sample-metadata");
        results.html("");

        Object.entries(arr).forEach(([a, b]) => {
            results.append("h6").text(`${a}, ${b}`);
        })
    })
};



function pullIDs() {
    d3.json("samples.json").then((importedData) => {

        var chooseData = d3.select("#selDataset");
        var getNames = importedData.names;

        getNames.forEach((a) => {
            chooseData.append("option").text(a);
        });

        var getNames1 = getNames[0];
        getMetadata(getNames1);

        //pass my graphs function (getNames1)

    });
};

function optionChanged(newID) {
    getMetadata(newID);

    
    //pass my graphs function (getNames1)
}

pullIDs();
