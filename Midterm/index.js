/*fetch("./data.json")
            .then(function (response){
                return response.json
            }).then(function (data){
                appendRegData(data);
            }).catch(function (err){
                console.log('error: ' +err);
            })

function appendRegData(data){
    console.log(data);
    data = JSON.parse(data);
    console.log(data);
    for (let element of data) {
        console.log(element);
        for (product of data[element]){
            if(document.getElementById(product["productName"]) != null){
                let mainContainer = document.getElementById(product["productName"]);
                let div2 = document.createElement("div");
                div2.innerHTML = `${product["productName"]} <br> $${product["price"]} <br> ${product["description"]}`;
                mainContainer.appendChild(div2);
            }
        }
    }
}*/

fetch("./data.json")
            .then(function (response){
                return response.json();
            }).then(function (data){
                appendData(data);
            }).catch(function (err){
                console.log('error: ' +err);
            })

        function appendData(data){
            for (let productName in data){
                for (let element of data[productName]) {
                    if(document.getElementById(element["productName"]) != null){
                        let mainContainer = document.getElementById(element["productName"]);
                        console.log(element);
                        let div2 = document.createElement("div");
                        div2.innerHTML = `${element["productName"]}<br>$${element["price"]} <br>${element["description"]}`;
                        mainContainer.appendChild(div2);
                    }
                }
            }
        }