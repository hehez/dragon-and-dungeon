function make_platform (left: number, width: number, height: number) {
    console.logValue("platform=> left", left)
    console.logValue("platform=> height", height)
    for (let index = 0; index <= width - 1; index++) {
        tiles.setTileAt(tiles.getTileLocation(left + index, height), sprites.dungeon.floorDark2)
        tiles.setWallAt(tiles.getTileLocation(left + index, height), true)
        if (Math.percentChance(20 / width)) {
            make_spike(left + index, height)
        }
        if (Math.percentChance(100 / width)) {
            make_coin(left + index, height)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy += 0
    }
})
function make_coin (col: number, rol: number) {
    sprite_coin = sprites.create(assets.image`myImage`, SpriteKind.Food)
    animation.runImageAnimation(
    sprite_coin,
    [img`
        . . . . . . . . 
        . . . . . . . . 
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . . . . . . . 
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        . . . . . . . . 
        `],
    500,
    true
    )
    tiles.placeOnTile(sprite_coin, tiles.getTileLocation(col, rol - 1))
    sprite_coin.y += -3
}
function make_spike (col: number, rol: number) {
    sprite_spike = sprites.create(assets.image`myImage2`, SpriteKind.Enemy)
    tiles.placeOnTile(sprite_spike, tiles.getTileLocation(col, rol - 1))
    sprite_spike.x += 0
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.placeOnTile(mySprite, tiles.getTileLocation(5, 158))
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . f 5 5 5 f f . . . . . 
        . . . . f 1 5 2 5 1 6 f . . . . 
        . . . f 1 6 6 6 6 6 1 6 f . . . 
        . . . f 6 6 f f f f 6 1 f . . . 
        . . . f 6 f f d d f f 6 f . . . 
        . . f 6 f d f d d f d f 6 f . . 
        . . f 6 f d 3 d d 3 d f 6 f . . 
        . . f 6 6 f d d d d f 6 6 f . . 
        . f 6 6 f 3 f f f f 3 f 6 6 f . 
        . . f f d 3 5 3 3 5 3 d f f . . 
        . . f d d f 3 5 5 3 f d d f . . 
        . . . f f 3 3 3 3 3 3 f f . . . 
        . . . f 3 3 5 3 3 5 3 3 f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . f 5 5 5 f f . . . . . 
        . . . . f 1 5 2 5 1 6 f . . . . 
        . . . f 1 6 6 6 6 6 1 6 f . . . 
        . . . f 6 6 f f f f 6 1 f . . . 
        . . . f 6 f f d d f f 6 f . . . 
        . . f 6 f d f d d f d f 6 f . . 
        . . f 6 f d 3 d d 3 d f 6 f . . 
        . . f 6 6 f d d d d f 6 6 f . . 
        . f 6 6 f 3 f f f f 3 f 6 6 f . 
        . . f f 3 3 5 3 3 5 3 d f f . . 
        . . . f d f 3 5 5 3 f f d f . . 
        . . . f d f 3 3 3 3 3 f f . . . 
        . . . f f 3 5 3 3 5 3 3 f . . . 
        . . . . f f f f f f f f f . . . 
        . . . . . . . . . f f . . . . . 
        `,img`
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . f 5 5 5 f f . . . . . 
        . . . . f 1 5 2 5 1 6 f . . . . 
        . . . f 1 6 6 6 6 6 1 6 f . . . 
        . . . f 6 6 f f f f 6 1 f . . . 
        . . . f 6 f f d d f f 6 f . . . 
        . . f 6 f d f d d f d f 6 f . . 
        . . f 6 f d 3 d d 3 d f 6 f . . 
        . . f 6 6 f d d d d f 6 6 f . . 
        . f 6 6 f 3 f f f f 3 f 6 6 f . 
        . . f f d 3 5 3 3 5 3 3 f f . . 
        . . f d f f 3 5 5 3 f d f . . . 
        . . . f f 3 3 3 3 3 f d f . . . 
        . . . f 3 3 5 3 3 5 3 f f . . . 
        . . . f f f f f f f f f . . . . 
        . . . . . f f . . . . . . . . . 
        `],
    100,
    true
    )
    pause(100)
    info.stopCountdown()
    game.showLongText("Haha, find the treasure", DialogLayout.Center)
})
function make_map (num_platforms: number, width: number, start_y: number, space: number) {
    let index = 0
    local_start = randint(0, 10 - width)
    console.logValue("local", local_start)
    console.logValue("index", index)
    console.logValue("space", space)
    for (let index = 0; index <= num_platforms; index++) {
        make_platform(randint(0, 10 - width), width, 160 - ((index + 1) * space + start_y))
    }
    return local_start + Math.round(width / 2)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.trail, 100)
    info.changeScoreBy(1)
})
function make_random (left: number, width: number, height: number) {
    local_start = randint(0, 100)
    make_platform(left + randint(width, 20), width, height)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.purpleOuterNorthEast, function (sprite, location) {
    tiles.placeOnRandomTile(mySprite, sprites.swamp.swampTile0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 100)
    mySprite.sayText("ouch!!", 1000, false)
    info.changeScoreBy(-1)
    info.changeLifeBy(-1)
})
let local_start = 0
let sprite_spike: Sprite = null
let sprite_coin: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level2`)
mySprite = sprites.create(img`
    . . . . . . 5 . 5 . . . . . . . 
    . . . . . f 5 5 5 f f . . . . . 
    . . . . f 1 5 2 5 1 6 f . . . . 
    . . . f 1 6 6 6 6 6 1 6 f . . . 
    . . . f 6 6 f f f f 6 1 f . . . 
    . . . f 6 f f d d f f 6 f . . . 
    . . f 6 f d f d d f d f 6 f . . 
    . . f 6 f d 3 d d 3 d f 6 f . . 
    . . f 6 6 f d d d d f 6 6 f . . 
    . f 6 6 f 3 f f f f 3 f 6 6 f . 
    . . f f d 3 5 3 3 5 3 d f f . . 
    . . f d d f 3 5 5 3 f d d f . . 
    . . . f f 3 3 3 3 3 3 f f . . . 
    . . . f 3 3 5 3 3 5 3 3 f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
info.setLife(3)
tiles.placeOnRandomTile(mySprite, sprites.swamp.swampTile0)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 250
scene.cameraFollowSprite(mySprite)
make_map(50, 3, 3, 3)
game.onUpdate(function () {
    if (false && mySprite.isHittingTile(CollisionDirection.Bottom)) {
    	
    } else {
    	
    }
})
