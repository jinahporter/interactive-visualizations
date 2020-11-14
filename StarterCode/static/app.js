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

function BubbleCharts() {

    d3.json("samples.json").then((importedData) => {

        //name to call otu_ids, otu_labels, sample_values
        var data = importedData.samples;

        console.log(data[0]);

        var otu_ids = data[0];
        //var otu_labels = data.map(row => row.otu_labels[0]);
        //var sample_values = data.map(row => row.sample_values[0]);

        console.log(otu_ids.otu_ids);
        console.log(otu_ids.otu_labels);
        console.log(otu_ids.sample_values);

        //create bubble chart
        var bubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };

        var layout1 = {
            xaxis: {
                title: "OTU_IDs"
            },
            margin: { 
                t: 0 
            },
            margin: { 
                t: 30 
            },
            hovermode: "closests"
        };

        var data1 = [bubble];

        Plotly.newPlot("bubble", data1, layout1);
    });
}

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
        BubbleCharts(getNames1);

    });
};



function optionChanged(newID) {
    getMetadata(newID);
    
    //pass my graphs function
    BubbleCharts(newID);


    
}

pullIDs();
