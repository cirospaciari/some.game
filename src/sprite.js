
class Sprite {

    constructor(img_name, position, speed, loop, flip){
        this.img_name = img_name;
        this.loop = loop || false;
        this.started = false;
        this.ended = false;
        this.position = position;
        this.speed = speed;
        this.flip = flip;
    }

    restart(){
        this.started = false;
    }

    onResize(){}

    render({ ctx, resources, timestamp }){
        ctx.save();

        const img = resources[this.img_name];
        const sprite_size = img.height;
        if(this.started){
            if(this.flip){
                // move to x + img's width
                // adding img.width is necessary because we're flipping from
                //     the right side of the img so after flipping it's still
                //     at [x,y]
                ctx.translate(this.position.x+sprite_size,this.position.y);
                // scaleX by -1; this "trick" flips horizontally
                ctx.scale(-1,1);
            }
            ctx.drawImage(img, //sprite
                          sprite_size * this.step, //sprite x position 
                          0,  //sprite y position
                          sprite_size,  //frame width
                          sprite_size,  //frame height
                          this.flip ? 0 : this.position.x, //viewport x
                          this.flip ? 0 : this.position.y, //viewport y
                          sprite_size,  //destination width
                          sprite_size,  //destination height
                          );
            const elapsed = timestamp - this.last_timestamp;
            //increment step
            if(elapsed > this.speed){
                this.step++;
                //save last timestamp
                this.last_timestamp = timestamp;
                //check frames and loop if needed
                if(this.step >= this.frames){
                    if(this.loop) //restart
                        this.step = 0;
                    else //end animation
                        this.ended = true;
                }
            }
        }else{
           
            this.frames = img.width / sprite_size;
            this.step = 0;
            this.last_timestamp = timestamp 
            this.started = true;
        }

        ctx.restore();
    }

}

export default Sprite;