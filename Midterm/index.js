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
                        div2.innerHTML = `<strong>${element["productName"]}</strong><br>$${element["price"]}<br><br>${element["description"]}`;
                        
                        const imageElement = document.createElement('img');
                        const imageSrc = element["image"];
                        console.log(element["image"]);
                        imageElement.src = imageSrc;
                        mainContainer.appendChild(imageElement);
                                
                        mainContainer.appendChild(div2);
                    }
                }
            }
        }
