class Resources {

    static loadSprite(path){
        return new Promise((resolve, reject)=> {
            const img = new Image();
            img.onerror = (error)=> reject({ error, path });
            img.onload = ()=> resolve({ path, img });
            img.src = `./${path}`;
        });
    }


    static async loadAll(paths) {
        //load all resources and reduces to an Object
        return (await Promise.all(paths.map((path)=> Resources.loadSprite(path)))).reduce((resources, sprite)=> {
            //remove assets part of the path name
            resources[sprite.path.substr(7)] = sprite.img;
            return resources;
        }, {});
    }

}

export default Resources;