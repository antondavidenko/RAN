var sceneBuilder = function(viewObj, sceneJSON)
{
	var sceneContainer = new PIXI.Container();
	var textures = {};
	var scene = [];

    function createSprite(spriteData, container)
	{
		var sprite;
		if (spriteData.image) {sprite= new PIXI.Sprite.fromImage(spriteData.image);}
		if (spriteData.texture) {sprite= new PIXI.Sprite(textures[spriteData.texture]);}
		if (spriteData.scalex) {sprite.scale.x *= spriteData.scalex;}
		if (spriteData.scaley) {sprite.scale.y *= spriteData.scaley;}
        if (spriteData.scale) {sprite.scale.y = sprite.scale.x = spriteData.scale;}
		if (spriteData.setx) {sprite.x = spriteData.setx;}
		if (spriteData.sety) {sprite.y = spriteData.sety;}
		if (spriteData.alpha) {sprite.alpha = spriteData.alpha;}	
		if (spriteData.anchor) {sprite.anchor.set(spriteData.anchor);}
		container.addChild(sprite);
		scene[spriteData.name] = sprite;
	}

    function createAnimation(animationData, container)
	{
        var frames = [];
        for (var i = 0; i < animationData.frames.length; i++) {
            frames.push(PIXI.Texture.fromFrame(animationData.frames[i]));
        }

        var anim = new PIXI.extras.AnimatedSprite(frames);
        if (animationData.setx) {anim.x = animationData.setx;}
        if (animationData.sety) {anim.y = animationData.sety;}
        anim.anchor.set(0.5);
        anim.animationSpeed = animationData.speed;
        anim.play();
        if (animationData.scale) {anim.scale.x = anim.scale.y = animationData.scale;}

        container.addChild(anim);
        scene[animationData.name] = anim;
	}

    function createText(textData, container)
	{
		var text = new PIXI.Text(textData.text, textData.params);
		if (textData.setx) {text.x = textData.setx;}
		if (textData.sety) {text.y = textData.sety;}
		container.addChild(text);
		scene[textData.name] = text;
	}

    function createContainer(containerData, container)
	{
		var i;
		var newContainer =  new PIXI.Container();
        container.addChild(newContainer);
        scene[containerData.name] = newContainer;

        for (i=0; i<containerData.content.length; i++)
        {
            if (containerData.content[i].type == "sprite") { createSprite(containerData.content[i], newContainer); } else
            if (containerData.content[i].type == "animation") { createAnimation(sceneJSON.scene[i], newContainer); } else
            if (containerData.content[i].type == "text") { createText(containerData.content[i], newContainer); } else
            if (containerData.content[i].type == "container") { createContainer(containerData.content[i], newContainer); }
        }
	}
	
	var i;
	for (i=0; i<sceneJSON.textures.length; i++)
	{
		textures[sceneJSON.textures[i].name] = PIXI.Texture.fromImage(sceneJSON.textures[i].img);
	}	
	
	for (i=0; i<sceneJSON.scene.length; i++)
	{
		if (sceneJSON.scene[i].type == "sprite") { createSprite(sceneJSON.scene[i], sceneContainer); } else
        if (sceneJSON.scene[i].type == "animation") { createAnimation(sceneJSON.scene[i], sceneContainer); } else
		if (sceneJSON.scene[i].type == "text") { createText(sceneJSON.scene[i], sceneContainer); } else
        if (sceneJSON.scene[i].type == "container") { createContainer(sceneJSON.scene[i], sceneContainer); }
	}
	
	viewObj.scene = scene;
	viewObj.container = sceneContainer;
	viewObj.textures = textures;
	
	return viewObj;
};

module.exports = sceneBuilder;