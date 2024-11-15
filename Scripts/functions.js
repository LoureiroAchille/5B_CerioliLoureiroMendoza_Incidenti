export const getCoordinates = (luogo) => {
    return new Promise((resolve)=>{
        fetch("conf.json").then(r => r.json()).then(confData => {
            fetch(confData.geoUrl.replace("$LUOGO", luogo[0])).then(r => r.json()).then(data => {
                let object = {name:luogo[0],coords:[data[0].lat,data[0].lon]};
                resolve(object);
            })
        })
    })
}