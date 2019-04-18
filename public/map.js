function createMap() {
        // var center = getCenter(geodata);
        
        new Microsoft.Maps.Map('#myMap', {
            credentials: 'AuyI2iuaBDhptSUphEnSVX6LR6_S5ha9WQGz2XjcMqHRkFoz8P5K_F_g83nrNel0',
            center: new Microsoft.Maps.Location(40.855366, -73.882713),
            zoom: 15
        });
    
        // //Create custom Pushpin
        // var pin = new Microsoft.Maps.Pushpin(center, {
        //     title: 'Community Board ' + communityBoard,
        //     text: communityBoard
        // });
    
        // //Add the pushpin to the map
        // map.entities.push(pin);
        
        // Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {
        //     //Parse the GeoJson object into a Bing Maps shape.
        //     var shape = Microsoft.Maps.GeoJson.read(geodata);
    
        //     //Add the shape to the map.
        //     map.entities.push(shape);
        // });
}
window.onload = createMap;
