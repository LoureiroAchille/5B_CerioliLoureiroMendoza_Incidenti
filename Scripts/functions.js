export const getCoordinates = (luogo) => {
    console.log(luogo);
    return new Promise((resolve)=>{
        fetch("conf.json").then(r => r.json()).then(confData => {
            fetch(confData.geoUrl.replace("$LUOGO", luogo[0])).then(r => r.json()).then(data => {
                let object = {name:luogo[0],date:luogo[2],time:luogo[3],plates:luogo[1],injured:luogo[4],dead:luogo[5],coords:[data[0].lat,data[0].lon]};
                console.log(object);
                resolve(object);
            })
        })
    })
}