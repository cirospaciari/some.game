import Resources from './resources';
import Assets from '../assets/assets.json';
import Sprite from './sprite';

const canvas = document.querySelector('#viewport');
const ctx = canvas.getContext('2d');

const game = {
    canvas,
    ctx,
    objects: new Set(),
    getCenter(sprite_size) {
        sprite_size = sprite_size || 0;
        return {
            x: (game.canvas.width / 2) - (sprite_size / 2),
            y: (game.canvas.height / 2) - (sprite_size / 2)
        };
    }
};

function resizeCanvas() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    game.objects.forEach((obj) => obj.onResize(game));
}
window.onresize = resizeCanvas;
resizeCanvas();

//load all assets
Resources.loadAll(Assets).then((resources) => {
    game.resources = resources;

    function render(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //render args
        const render_args = {
            ...game,
            timestamp
        };
        game.objects.forEach((obj) => obj.render(render_args));

        //call render in next frame
        requestAnimationFrame(render);
    }

    //start render loop
    requestAnimationFrame(render);
});

const animation = new Sprite('Characters/GraveRobber/GraveRobber_walk.png', game.getCenter(48), 100, true, false);
animation.onResize = function({ getCenter }){
    this.position = getCenter(48);
}
game.objects.add(animation);
