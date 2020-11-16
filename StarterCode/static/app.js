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

function BubbleCharts(outcome1) {

    d3.json("samples.json").then((importedData) => {

        //name to call otu_ids, otu_labels, sample_values
        var data = importedData.samples;

        console.log(data[0]);

        var filteredID = data.filter(row => row.id == outcome1);

        var otu_IDs = filteredID[0].otu_ids;
        var otu_Labels = filteredID[0].otu_labels;
        var sample_Values = filteredID[0].sample_values;

        console.log(otu_IDs);
        console.log(otu_Labels);
        console.log(sample_Values);

        //top 10 values
        var values_sliced = sample_Values.slice(0, 10).reverse();

        console.log(values_sliced);

        var otu_IDs_sliced = otu_IDs.slice(0, 10).map(row => `otu_${row}`).reverse();
        console.log(otu_IDs_sliced);

        var otu_Labels_sliced = otu_Labels.slice(0, 10).reverse();
        console.log(otu_Labels_sliced);

        //create bar chart (top10)
        var bars = {
            x: values_sliced,
            //error
            y: otu_IDs_sliced,
            text: otu_Labels_sliced,
            type: "bar",
            orientation: "h",
            color: "green"
        };

        var layout1 = {
            title: "Top 10 OTU",
            margin: {
                l: 120,
                r: 120,
                t: 120,
                b: 45
            }, 
            yaxis: {
                tickmode: "linear"
            }
        };

        var data1 = [bars];

        Plotly.newPlot("bar", data1, layout1);


        //create bubble chart
        var bubble = {
            x: otu_IDs,
            y: sample_Values,
            text: otu_Labels,
            mode: "markers",
            marker: {
                size: sample_Values,
                color: otu_IDs
            }
        };

        var layout2 = {
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

        var data2 = [bubble];

        Plotly.newPlot("bubble", data2, layout2);
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
