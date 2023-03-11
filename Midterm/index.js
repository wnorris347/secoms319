pullRegGoods();

function pullRegGoods(){
    fetch("./data.json")
        .then(function (response){
            return response.json;
        }).then(function (data){
            appendRegData(data);
        }).catch(function (error){
            console.log("error: " + error);
        })
}

function appendRegData(data){
    let containers = document.getElementsByClassName("bakedGood");
    let i = 0;
    for (let element of data['Baked Goods']) {
        let mainContainer = containers[i];
        console.log(element);
        let div2 = document.createElement("div");
        div2.innerHTML = `${element["productName"]} <br> ${element["price"]} <br> ${element["description"]}`;
        mainContainer.appendChild(div2);
        i++;
    }
}

