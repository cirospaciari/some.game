const fs = require('fs');
const path = require('path');

//allowed image extensions
const image_extensions = ['.png', '.jpge', '.jpg'];

//get all images in directory and subdirectories
function getResources(directory, resources){
    //get files and folders
    const info = fs.readdirSync(directory);

    info.forEach((file)=> {
        //get file fullname
        const fullname = path.join(directory, file);
        
        const stats = fs.lstatSync(fullname);
        //check if its a directory
        if(stats.isDirectory()){
            getResources(fullname, resources); 
        }else{ 
            //get extension and check if its a allowed image extension
            const file_extension = path.extname(fullname);
            if(image_extensions.some((extension)=> extension == file_extension)){
                resources.push(fullname);
            }
        }
    });
    return resources;
}

const Resources = getResources('./assets', []);
fs.writeFileSync(path.join(__dirname, './assets.json'), JSON.stringify(Resources));