const devtools = {
	isOpen: false,
	orientation: undefined,
};

const threshold = 160;

const emitEvent = (isOpen, orientation) => {
	globalThis.dispatchEvent(new globalThis.CustomEvent('devtoolschange', {
		detail: {
			isOpen,
			orientation,
		},
	}));
};

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const playerController = document.querySelector('.playerController')
const playerControllerPointer = document.querySelector('.playerControllerPointer')
const divContainer = document.querySelector('.canvas-container')
const rainContainer = document.querySelector('.rain-container')
const fireFlyContainer = document.querySelector('.fire-fly-container')
const instructionEl = document.querySelector('.instruction')
playerController.addEventListener("touchstart", touchHandler);
playerController.addEventListener("touchmove", touchHandler);
playerController.addEventListener("touchend", touchEndHandler);

const gravity = 0.5

let lastKey
let playerDirection = "right"
let lastTime = Date.now()
let fps = 0
let jumpHeight = -13
let shiftRain = 0
let shiftFireflies = 0
let displayInstruction = true
let groundPlatformWidthLevel1
let groundPlatformWidthLevel2
let groundPlatformWidthLevel3
let groundPlatformWidthLevel4
let groundPlatformHeight
let levitatingPlatform1LevelWidth
let levitatingPlatform1LevelHeight
let levitatingPlatform2LevelWidth
let treeLogWidth
let treeLogHeight
let boulderLogWidth
let boulderLogHeight
let skillsBoardHeight
let hobbiesBoardHeight
let trainingAndEducationBoardHeight
let experienceBoardHeight
let hobbiesHouseHeight
let hobbiestypesHeight
let pentasoftHeight
let texasHeight
let socialAvesHeight
let kulchanHeight
let freelanceHeight
let teksewaHeight
let microcodeHeight
let skillsBoardWidth
let hobbiesBoardWidth
let trainingAndEducationBoardWidth
let experienceBoardWidth
let hobbiesHouseWidth
let hobbiestypesWidth
let pentasoftWidth
let texasWidth
let socialAvesWidth
let kulchanWidth
let freelanceWidth
let teksewaWidth
let microcodeWidth


// #region Image sources
const platformLevel1 = "./img/PlatformLvl1.png"
const platformLevel2 = "./img/PlatformLvl2.png"
const platformLevel3 = "./img/PlatformLvl3.png"
const platformLevel4 = "./img/PlatformLvl4.png"
const platformLevitating1Level1 = "./img/platformLevitating1.png"
const platformLevitating2Level1 = "./img/platformLevitating2.png"
const treeLog = "./img/treeLog.png"
const boulder = "./img/boulder.png"
const backgroundImage = "./img/backgroundSky.jpg"
const backgroundTreesImage = "./img/backgroundTrees.png"

const skillsBoard = "./img/skillsBoard.png"
const hobbiesBoard = "./img/hobbiesBoard.png"
const trainingAndEducationBoard = "./img/trainingAndEducationBoard.png"
const experienceBoard = "./img/experienceBoard.png"

const hobbiesHouse = "./img/hobbiesHouse.png"
const hobbiestypes = "./img/hobbiestypes.png"
const pentasoft = "./img/pentasoft.png"
const texas = "./img/texas.png"
const socialAves = "./img/socialAvesNoEyes.png"
const kulchan = "./img/kulchan.png"
const freelance = "./img/freelance.png"
const teksewa = "./img/teksewa.png"
const microcode = "./img/microcode.png"


// Characters spritesheets
const spriteRunRight = "./img/spriteRunRightLevel1.png"
const spriteRunLeft = "./img/spriteRunLeftLevel1.png"
const spriteIdleRight = "./img/spriteIdleRightLevel1.png"
const spriteIdleLeft = "./img/spriteIdleLeftLevel1.png"

// Skills
const animation = "./img/spriteAnimation.png"
const coding = "./img/spriteCoding.png"

// ExtraProps adding in skills section
const texasEye = "./img/spriteTexasEye.png"
const socialAvesLEye = "./img/spriteSocialAveLEye.png"
const socialAvesREye = "./img/spriteSocialAveREye.png"
const microcodeWeight = "./img/spritesMicrocode.png"

// #endregion

// #region Reset object dimensions on window resize
setObjectDimensions();
function setObjectDimensions() {
    canvas.width = screen.width = window.innerWidth
    canvas.height = screen.height = window.innerHeight
    //if (window.outerWidth > 768) { 
        groundPlatformHeight = 120
        groundPlatformWidthLevel1 = 1168
        groundPlatformWidthLevel2 = 3234
        groundPlatformWidthLevel3 = 2309
        groundPlatformWidthLevel4 = 4071
        levitatingPlatform1LevelWidth = 397
        levitatingPlatform1LevelHeight = 355
        levitatingPlatform2LevelWidth = 353
        levitatingPlatform2LevelHeight = 348
        treeLogWidth = 1065
        treeLogHeight = 210
        boulderLogWidth = 315
        boulderLogHeight = 155
        skillsBoardWidth = 176
        skillsBoardHeight = 256
        hobbiesBoardWidth = 176
        hobbiesBoardHeight = 272
        trainingAndEducationBoardWidth = 286
        trainingAndEducationBoardHeight = 348
        experienceBoardWidth = 218
        experienceBoardHeight = 279
        hobbiesHouseWidth = 415
        hobbiesHouseHeight = 400
        hobbiestypesWidth = 505
        hobbiestypesHeight = 450
        pentasoftWidth = 572
        pentasoftHeight = 580
        texasWidth = 505
        texasHeight = 508
        socialAvesWidth = 486
        socialAvesHeight = 556
        kulchanWidth = 486
        kulchanHeight = 202
        freelanceWidth = 798
        freelanceHeight = 654
        teksewaWidth = 504
        teksewaHeight = 610
        microcodeWidth = 680
        microcodeHeight = 718
    // }
    // else {
    if (window.outerWidth <= 768) {
        jumpHeight = -18
        // playerController.style.display = "block"
        instructionEl.textContent = 'Use the controller in the bottom right side to move'
    }
}

// a function to re-draw the stats when screen.width and/or screen.height changed
function Init(reset) {
    scrollOffset = 0;
    if (reset === true) {  
        player = new Player()
        platforms = [
            new Platform({x: -20, y: canvas.height - groundPlatformHeight, width: groundPlatformWidthLevel1, height: groundPlatformHeight, image: createImage(platformLevel1), levitate: 0}),
            new Platform({x: groundPlatformWidthLevel1 + 120, y: canvas.height - levitatingPlatform1LevelHeight - 60, width: levitatingPlatform1LevelWidth, height: levitatingPlatform1LevelHeight, image: createImage(platformLevitating1Level1), levitate: 1}),
            new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + 360, y: canvas.height - levitatingPlatform2LevelHeight - 180, width: levitatingPlatform2LevelWidth, height: levitatingPlatform2LevelHeight, image: createImage(platformLevitating2Level1), levitate: 1}),
            new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + groundPlatformWidthLevel2 + 350, y: canvas.height - treeLogHeight, width: treeLogWidth, height: treeLogHeight, image: createImage(treeLog), levitate: 1}),
            new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + groundPlatformWidthLevel2 + groundPlatformWidthLevel3 + treeLogWidth + 180, y: canvas.height - boulderLogHeight, width: boulderLogWidth, height: boulderLogHeight, image: createImage(boulder), levitate: 1}),
            new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + 560, y: canvas.height - groundPlatformHeight, width: groundPlatformWidthLevel2, height: groundPlatformHeight, image: createImage(platformLevel2), levitate: 0}),
            new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + groundPlatformWidthLevel2 + 1040, y: canvas.height - groundPlatformHeight, width: groundPlatformWidthLevel3, height: groundPlatformHeight, image: createImage(platformLevel3), levitate: 0}),
            new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + groundPlatformWidthLevel2 + groundPlatformWidthLevel3 + 1750, y: canvas.height - groundPlatformHeight, width: groundPlatformWidthLevel4, height: groundPlatformHeight, image: createImage(platformLevel4), levitate: 0})
        ]

        genericObjects = [
            new GenericObject({x: 2600, y: canvas.height - 310, width: skillsBoardWidth, height: skillsBoardHeight, image: createImage(skillsBoard)}),
            new GenericObject({x: 4180, y: canvas.height - 320, width: hobbiesBoardWidth, height: hobbiesBoardHeight, image: createImage(hobbiesBoard)}),
            new GenericObject({x: 6700, y: canvas.height - 400, width: trainingAndEducationBoardWidth, height: trainingAndEducationBoardHeight, image: createImage(trainingAndEducationBoard)}),
            new GenericObject({x: 9460, y: canvas.height - 320, width: experienceBoardWidth, height: experienceBoardHeight, image: createImage(experienceBoard)}),

            new GenericObject({x: 4420, y: canvas.height - 420, width: hobbiesHouseWidth, height: hobbiesHouseHeight, image: createImage(hobbiesHouse)}),
            new GenericObject({x: 4920, y: canvas.height - 470, width: hobbiestypesWidth, height: hobbiestypesHeight, image: createImage(hobbiestypes)}),
            new GenericObject({x: 7100, y: canvas.height - 630, width: pentasoftWidth, height: pentasoftHeight, image: createImage(pentasoft)}),
            new GenericObject({x: 7890, y: canvas.height - 560, width: texasWidth, height: texasHeight, image: createImage(texas)}),
            new GenericObject({x: 9860, y: canvas.height - 550, width: socialAvesWidth, height: socialAvesHeight, image: createImage(socialAves)}),
            new GenericObject({x: 10530, y: canvas.height - 460, width: kulchanWidth, height: kulchanHeight, image: createImage(kulchan)}),
            new GenericObject({x: 11020, y: canvas.height - 710, width: freelanceWidth, height: freelanceHeight, image: createImage(freelance)}),
            new GenericObject({x: 11900, y: canvas.height - 660, width: teksewaWidth, height: teksewaHeight, image: createImage(teksewa)}),
            new GenericObject({x: 200, y: canvas.height - 660, width: microcodeWidth, height: microcodeHeight, image: createImage(microcode)})
        ]

        backgroundTrees = new GenericObject({x: 2600, y: 0, width: 13489/(1080/canvas.height), height: canvas.height, image: createImage(backgroundTreesImage)});
        background = new GenericObject({x: 0, y: 0, width: 13282, height: canvas.height, image: createImage(backgroundImage)});

        skills = [
            new Skill({x: 2930, y: canvas.height - 720, image: createImage(coding), cropWidth: 500, cropHeight: 500, width: 500, height: 500, lastFrame: 68}),
            new Skill({x: 4280, y: canvas.height - 670, image: createImage(animation), cropWidth: 500, cropHeight: 500, width: 500, height: 500, lastFrame: 90}),
            new Skill({x: 8080, y: canvas.height - 276, image: createImage(texasEye), cropWidth: 50, cropHeight: 50, width: 50, height: 50, lastFrame: 60}),
            new Skill({x: 8140, y: canvas.height - 276, image: createImage(texasEye), cropWidth: 50, cropHeight: 50, width: 50, height: 50, lastFrame: 60}),
            new Skill({x: 9928, y: canvas.height - 282, image: createImage(socialAvesLEye), cropWidth: 45, cropHeight: 50, width: 45, height: 50, lastFrame: 210}),
            new Skill({x: 10003, y: canvas.height - 282, image: createImage(socialAvesLEye), cropWidth: 45, cropHeight: 50, width: 45, height: 50, lastFrame: 210}),
            new Skill({x: 10153, y: canvas.height - 290, image: createImage(socialAvesREye), cropWidth: 45, cropHeight: 50, width: 45, height: 50, lastFrame: 210}),
            new Skill({x: 10230, y: canvas.height - 290, image: createImage(socialAvesREye), cropWidth: 45, cropHeight: 50, width: 45, height: 50, lastFrame: 210})
        ]
    }
    
    divContainer.style.width = canvas.width - 20
    divContainer.style.height = canvas.height -20

    setObjectDimensions()

    let platformCount = 0
    platforms.forEach(platform => {
        switch(platform.levitate) {
            case 0:
                platform.position.y = canvas.height - groundPlatformHeight
                break
            case 1:
                switch(platformCount) {
                    case 1:
                        platform.position.y = canvas.height - levitatingPlatform1LevelHeight - 10
                        break
                    case 2:
                        platform.position.y = canvas.height - levitatingPlatform1LevelHeight - 60
                        break
                    case 3:
                        platform.position.y = canvas.height - treeLogHeight - 60
                        break
                    case 4:
                        platform.position.y = canvas.height - boulderLogHeight
                        break
                }
                break
        }
        platformCount++
    })

    background.width = 13282
    background.height = canvas.height

    backgroundTrees.width = 13489/(1080/canvas.height)
    backgroundTrees.height = canvas.height

    let genericObjectCount = 0
    genericObjects.forEach(genericObject => {
        switch(genericObjectCount) {
            case 0:
                genericObject.position.y = canvas.height - 310
                break
            case 1:
                genericObject.position.y = canvas.height - 320
                break
            case 2:
                genericObject.position.y = canvas.height - 400
                break
            case 3:
                genericObject.position.y = canvas.height - 320
                break
            case 4:
                genericObject.position.y = canvas.height - 420
                break
            case 5:
                genericObject.position.y = canvas.height - 470
                break
            case 6:
                genericObject.position.y = canvas.height - 630
                break
            case 7:
                genericObject.position.y = canvas.height - 560
                break
            case 8:
                genericObject.position.y = canvas.height - 610
                break
            case 9:
                genericObject.position.y = canvas.height - 460
                break
            case 10:
                genericObject.position.y = canvas.height - 710
                break
            case 11:
                genericObject.position.y = canvas.height - 660
                break
        }
        genericObjectCount++
    })

    player.position.y = canvas.height - 500
}
  
// recalculate everything on resize
setTimeout(function () {
    Init(false)
    addEventListener("resize", Init, false)
}, 15)

// #endregion

// #region Player class
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.speed = 5
        this.width = 66
        this.height = 150
        this.jumpCount = 0
        this.frames = 0
        this.sprites = {
            stand: {
                right: createImage(spriteIdleRight),
                left: createImage(spriteIdleLeft),
                cropWidth: 170,
                width: 66
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 270,
                width: 101
            },
            jump: {
                right: createImage("./img/spriteJumpRightLevel1.png"),
                left: createImage("./img/spriteJumpLeftLevel1.png"),
                cropWidth: 240,
                width: 90
            }
        }

        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = this.sprites.stand.cropWidth
    }

    draw() {
        ctx.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 400, this.position.x, this.position.y, this.width, this.height)
    }

    update(dt) {
        this.draw()
        if ((fps <= 60 && dt > 12) ||
        (fps <= 120 && dt > 14) ||
        (fps <= 180 && dt > 16) || 
        (fps <= 240 && dt > 18) ||
        (fps > 240 && dt > 20)) {
            this.frames++
            if (this.frames > 90 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
                this.frames = 0
            }
            else if (this.frames > 24 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
                this.frames = 0
            }
            else if (this.frames > 3 && (this.currentSprite === this.sprites.jump.right || this.currentSprite === this.sprites.jump.left)) {
                this.frames = 0
            }
            this.position.y += this.velocity.y
            this.position.x += this.velocity.x
    
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
            {
                this.velocity.y += gravity
            }
            else 
            {
                //this.velocity.y = 0
                this.jumpCount = 0
            }
            lastTime = Date.now()
        }
    }
}

// #endregion

class Platform {
    constructor({x, y, width, height, image, levitate}) {
        this.position = {
            x,
            y
        }

        this.width = width
        this.height = height
        this.image = image

        this.levitate = levitate
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class Skill {
    constructor({x, y, image, cropWidth, cropHeight, width, height, lastFrame}) {
        this.position = {
            x,
            y
        }

        this.cropWidth = cropWidth
        this.cropHeight = cropHeight
        this.width = width
        this.height = height
        this.image = image
        this.frames = 1
        this.lastFrame = lastFrame
    }

    draw(dt) {
        ctx.drawImage(this.image, this.cropWidth * this.frames, 0, this.cropWidth, this.cropHeight, this.position.x, this.position.y, this.width, this.height)
        if ((fps <= 60 && dt > 12) ||
        (fps <= 120 && dt > 14) ||
        (fps <= 180 && dt > 16) || 
        (fps <= 240 && dt > 18) ||
        (fps > 240 && dt > 20)) {
            this.frames++
            if (this.frames > this.lastFrame) {
                this.frames = 0
            }
        }
    }
}

class GenericObject {
    constructor({x, y, width, height, image}) {
        this.position = {
            x,
            y
        }

        this.width = width
        this.height = height
        this.image = image
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image;
}

let player = new Player()
let platforms = [
    new Platform({x: -20, y: canvas.height - groundPlatformHeight, width: groundPlatformWidthLevel1, height: groundPlatformHeight, image: createImage(platformLevel1), levitate: 0}),
    new Platform({x: groundPlatformWidthLevel1 + 120, y: canvas.height - levitatingPlatform1LevelHeight - 60, width: levitatingPlatform1LevelWidth, height: levitatingPlatform1LevelHeight, image: createImage(platformLevitating1Level1), levitate: 1}),
    new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + 360, y: canvas.height - levitatingPlatform2LevelHeight - 180, width: levitatingPlatform2LevelWidth, height: levitatingPlatform2LevelHeight, image: createImage(platformLevitating2Level1), levitate: 1}),
    new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + groundPlatformWidthLevel2 + 350, y: canvas.height - treeLogHeight, width: treeLogWidth, height: treeLogHeight, image: createImage(treeLog), levitate: 1}),
    new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + groundPlatformWidthLevel2 + groundPlatformWidthLevel3 + treeLogWidth + 180, y: canvas.height - boulderLogHeight, width: boulderLogWidth, height: boulderLogHeight, image: createImage(boulder), levitate: 1}),
    new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + 560, y: canvas.height - groundPlatformHeight, width: groundPlatformWidthLevel2, height: groundPlatformHeight, image: createImage(platformLevel2), levitate: 0}),
    new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + groundPlatformWidthLevel2 + 1040, y: canvas.height - groundPlatformHeight, width: groundPlatformWidthLevel3, height: groundPlatformHeight, image: createImage(platformLevel3), levitate: 0}),
    new Platform({x: groundPlatformWidthLevel1 + levitatingPlatform1LevelWidth + levitatingPlatform2LevelWidth + groundPlatformWidthLevel2 + groundPlatformWidthLevel3 + 1750, y: canvas.height - groundPlatformHeight, width: groundPlatformWidthLevel4, height: groundPlatformHeight, image: createImage(platformLevel4), levitate: 0})
]

let genericObjects = [
    //new GenericObject({x: 0, y: 0, width: 16000/(1080/canvas.height), height: canvas.height, image: createImage(background)}),
    new GenericObject({x: 2600, y: canvas.height - 310, width: skillsBoardWidth, height: skillsBoardHeight, image: createImage(skillsBoard)}),
    new GenericObject({x: 3500, y: canvas.height - 320, width: hobbiesBoardWidth, height: hobbiesBoardHeight, image: createImage(hobbiesBoard)}),
    new GenericObject({x: 6700, y: canvas.height - 400, width: trainingAndEducationBoardWidth, height: trainingAndEducationBoardHeight, image: createImage(trainingAndEducationBoard)}),
    new GenericObject({x: 9460, y: canvas.height - 320, width: experienceBoardWidth, height: experienceBoardHeight, image: createImage(experienceBoard)}),

    new GenericObject({x: 3720, y: canvas.height - 420, width: hobbiesHouseWidth, height: hobbiesHouseHeight, image: createImage(hobbiesHouse)}),
    new GenericObject({x: 4920, y: canvas.height - 470, width: hobbiestypesWidth, height: hobbiestypesHeight, image: createImage(hobbiestypes)}),
    new GenericObject({x: 7100, y: canvas.height - 630, width: pentasoftWidth, height: pentasoftHeight, image: createImage(pentasoft)}),
    new GenericObject({x: 7890, y: canvas.height - 560, width: texasWidth, height: texasHeight, image: createImage(texas)}),
    new GenericObject({x: 9860, y: canvas.height - 550, width: socialAvesWidth, height: socialAvesHeight, image: createImage(socialAves)}),
    new GenericObject({x: 10530, y: canvas.height - 460, width: kulchanWidth, height: kulchanHeight, image: createImage(kulchan)}),
    new GenericObject({x: 11020, y: canvas.height - 710, width: freelanceWidth, height: freelanceHeight, image: createImage(freelance)}),
    new GenericObject({x: 11900, y: canvas.height - 660, width: teksewaWidth, height: teksewaHeight, image: createImage(teksewa)}),
    new GenericObject({x: 12500, y: canvas.height - 720, width: microcodeWidth, height: microcodeHeight, image: createImage(microcode)})
]

let backgroundTrees = new GenericObject({x: 2600, y: 0, width: 13489/(1080/canvas.height), height: canvas.height, image: createImage(backgroundTreesImage)});
let background = new GenericObject({x: 0, y: 0, width: 13282, height: canvas.height, image: createImage(backgroundImage)});

let skills = [
    new Skill({x: 2930, y: canvas.height - 720, image: createImage(coding), cropWidth: 500, cropHeight: 500, width: 500, height: 500, lastFrame: 90}),
    new Skill({x: 4280, y: canvas.height - 810, image: createImage(animation), cropWidth: 500, cropHeight: 500, width: 500, height: 500, lastFrame: 90}),
    new Skill({x: 8080, y: canvas.height - 276, image: createImage(texasEye), cropWidth: 50, cropHeight: 50, width: 50, height: 50, lastFrame: 60}),
    new Skill({x: 8140, y: canvas.height - 276, image: createImage(texasEye), cropWidth: 50, cropHeight: 50, width: 50, height: 50, lastFrame: 60}),
    new Skill({x: 9928, y: canvas.height - 282, image: createImage(socialAvesLEye), cropWidth: 45, cropHeight: 50, width: 45, height: 50, lastFrame: 210}),
    new Skill({x: 10003, y: canvas.height - 282, image: createImage(socialAvesLEye), cropWidth: 45, cropHeight: 50, width: 45, height: 50, lastFrame: 210}),
    new Skill({x: 10153, y: canvas.height - 290, image: createImage(socialAvesREye), cropWidth: 45, cropHeight: 50, width: 45, height: 50, lastFrame: 210}),
    new Skill({x: 10230, y: canvas.height - 290, image: createImage(socialAvesREye), cropWidth: 45, cropHeight: 50, width: 45, height: 50, lastFrame: 210}),
    new Skill({x: 12619, y: canvas.height - 430, image: createImage(microcodeWeight), cropWidth: 425, cropHeight: 250, width: 425, height: 250, lastFrame: 110})
]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}

let scrollOffset = 0

var t = [];
function animate() {
    const main = ({emitEvents = true} = {}) => {
        const widthThreshold = globalThis.outerWidth - globalThis.innerWidth > threshold;
        const heightThreshold = globalThis.outerHeight - globalThis.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (
            !(heightThreshold && widthThreshold)
            && ((globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
        ) {
            if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
                emitEvent(true, orientation);
            }

            devtools.isOpen = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.isOpen && emitEvents) {
                emitEvent(false, undefined);
            }

            devtools.isOpen = false;
            devtools.orientation = undefined;
        }
    };

    main({emitEvents: false});
    setInterval(main, 500);

    // if (devtools.isOpen) {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height)
    //     ctx.font = "30px Arial";
    //     ctx.textAlign = "center";
    //     ctx.fillText("You Naughty Naughty", canvas.width/2, canvas.height/2);
    //     requestAnimationFrame(animate);
    //     instructionEl.style.display = 'none';
    // }
    // else {
        if (player.position.x === 100 && displayInstruction) {
            instructionEl.style.display = 'block';
        }
        let now = Date.now();
        let dt = now - lastTime;
        
        t.unshift(now);
        if (t.length > 10) {
            var t0 = t.pop();
            fps = Math.floor(1000 * 10 / (now - t0));
            
            // Check conditions to set speed
            if (fps <= 60) {
                player.speed = 8
            }
            else if (fps <= 120) {
                player.speed = 9
            }
            else if (fps <= 180) {
                player.speed = 10
            }
            else if (fps <= 240) {
                player.speed = 11
            }
            else {
                player.speed = 12
            }
        }
        requestAnimationFrame(animate)

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        background.draw()
        backgroundTrees.draw()
        genericObjects.forEach(genericObject => {
            genericObject.draw()
        })
        platforms.forEach(platform => {
            platform.draw()
        })
        skills.forEach(skill => {
            skill.draw(dt)
        })
        player.update(dt)

        if (keys.right.pressed && 
            (
                player.position.x < 400 || 
                ((platforms[platforms.length - 1].position.x + groundPlatformWidthLevel4 - canvas.width < 100) && player.width + player.position.x < canvas.width)
            )) {
            player.velocity.x = player.speed
            keys.right.pressed = true
            lastKey = 'right'
            playerDirection = "right"
        }
        else if ((keys.left.pressed && player.position.x > 100) ||
        (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
            player.velocity.x = -player.speed
            keys.left.pressed = true
            lastKey = 'left'
            playerDirection = "left"
        }
        else {
            player.velocity.x = 0
            
            if ((fps <= 60 && dt > 12) ||
            (fps <= 120 && dt > 14) ||
            (fps <= 180 && dt > 16) || 
            (fps <= 240 && dt > 18) ||
            (fps > 240 && dt > 20)) {
                if (keys.right.pressed && player.width + player.position.x < canvas.width) {
                    scrollOffset += player.speed
                    platforms.forEach(platform => {
                        platform.position.x -= player.speed
                    })

                    skills.forEach(skill => {
                        skill.position.x -= player.speed
                    })
                    
                    if (background.width + background.position.x - player.speed > canvas.width) {
                        background.position.x -= player.speed;
                    }
                    if (backgroundTrees.width + backgroundTrees.position.x - player.speed > canvas.width + 200) {
                        backgroundTrees.position.x -= player.speed * 0.97;
                    }
                    genericObjects.forEach(genericObject => {
                        genericObject.position.x -= player.speed
                    })

                    if (genericObjects[3].position.x - 200 <= canvas.width) {
                        shiftRain -= player.speed
                        rainContainer.style.transform = "translateX(" + (shiftRain) + "px)";
                    }
                    if (genericObjects[11].position.x - 200 <= canvas.width){
                        shiftFireflies -= player.speed
                        fireFlyContainer.style.transform = "translateX(" + (shiftFireflies) + "px)";
                    }
                }
        
                else if (keys.left.pressed && scrollOffset > 0) {
                    scrollOffset -= player.speed
                    platforms.forEach(platform => {
                        platform.position.x += player.speed
                    })

                    skills.forEach(skill => {
                        skill.position.x += player.speed
                    })

                    if (background.position.x <= -15) {
                        background.position.x += player.speed * 0.8
                    }
                    if (backgroundTrees.position.x + player.speed * 0.97 < 2600) {
                        backgroundTrees.position.x += player.speed * 0.97
                    }
                    genericObjects.forEach(genericObject => {
                        genericObject.position.x += player.speed
                    })
                    if (genericObjects[3].position.x - 200 <= canvas.width) {
                        shiftRain += player.speed
                        rainContainer.style.transform = "translateX(" + (shiftRain) + "px)";
                    }
                    if (genericObjects[11].position.x - 200 <= canvas.width){
                        shiftFireflies += player.speed
                        fireFlyContainer.style.transform = "translateX(" + (shiftFireflies) + "px)";
                    }
                }
            }
        } 

        // platform collision detection
        platforms.forEach(platform => {
            if (
                (player.position.y + player.height <= platform.position.y + 55) && 
                (player.position.y + player.height + player.velocity.y >= platform.position.y + 55) && 
                (player.position.x + player.width >= platform.position.x) && 
                (player.position.x <= platform.position.x + platform.width)
            ) {
                player.velocity.y = 0
                player.jumpCount = 0
                keys.up.pressed = false
                if (playerDirection === "right") {
                    player.currentSprite = player.sprites.stand.right
                    player.currentCropWidth = player.sprites.stand.cropWidth
                    player.width = player.sprites.stand.width
                }
                else if (playerDirection === "left") {
                    player.currentSprite = player.sprites.stand.left
                    player.currentCropWidth = player.sprites.stand.cropWidth
                    player.width = player.sprites.stand.width
                }
            }
        })

        //Sprite Switching
        if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right && !keys.up.pressed) {
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
        }
        else if (keys.left.pressed && lastKey === 'left' && player.currentSprite != player.sprites.run.left && !keys.up.pressed) {
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
        }
        else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite != player.sprites.stand.left && !keys.up.pressed) {
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
        }
        else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite != player.sprites.stand.right && !keys.up.pressed) {
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
        }
        else if (keys.up.pressed && playerDirection === "right") {
            player.currentSprite = player.sprites.jump.right
            player.currentCropWidth = player.sprites.jump.cropWidth
            player.width = player.sprites.jump.width
        }
        else if (keys.up.pressed && playerDirection === "left") {
            player.currentSprite = player.sprites.jump.left
            player.currentCropWidth = player.sprites.jump.cropWidth
            player.width = player.sprites.jump.width
        }

        // Environment Effects Enable
        if (genericObjects[3].position.x - 200 <= canvas.width) {
            rainContainer.style.display = 'block'
            let rainDropEl = document.querySelectorAll('.rain-drop')
            if (rainDropEl.length == 0) {
                makeItRain()
            }
        }
        else {
            rainContainer.style.display = 'none'
            let rainDropEl = document.querySelectorAll('.rain-drop')
            let rainSplashEl = document.querySelectorAll('.rain-splash-container')
            if (rainDropEl.length > 0) {
                rainDropEl.forEach(element => {
                    element.remove()
                })
            }
            if (rainSplashEl.length > 0) {
                rainSplashEl.forEach(element => {
                    element.remove()
                })
            }
        }
        if (genericObjects[11].position.x - 200 <= canvas.width) {
            fireFlyContainer.style.display = 'block'
            let fireFlyEl = document.querySelectorAll('.fire-fly')
            if (fireFlyEl.length == 0) {
                simulateFireflies()
            }
        }
        else {
            fireFlyContainer.style.display = 'none'
            let fireFlyEl = document.querySelectorAll('.fire-fly')
            if (fireFlyEl.length > 0) {
                fireFlyEl.forEach(element => {
                    element.remove()
                })
            }
        }

        // Reset if fall
        if (player.position.y > canvas.height) {
            Init(true)
        }
    // }
}

animate()

addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft'){
        keys.left.pressed = true
        lastKey = 'left'
        playerDirection = "left"
    }
    else if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
    }
    else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        keys.right.pressed = true
        lastKey = 'right'
        playerDirection = "right"
    }
    else if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        if (player && player.jumpCount < 2)
        {
            player.velocity.y = jumpHeight
            keys.up.pressed = true
            player.jumpCount++
        }
    }
    else if(event.ctrlKey && (event.key === "S" || event.key === "s")) {
        event.preventDefault();
    }
    else if(event.ctrlKey && (event.key === "C")) {
        event.preventDefault();
    }
    else if(event.ctrlKey && (event.key === "E" || event.key === "e")) {
        event.preventDefault();
    }
    else if(event.ctrlKey && (event.key === "I" || event.key === "i")) {
        event.preventDefault();
    }
    else if(event.ctrlKey && (event.key === "K" || event.key === "k")) {
        event.preventDefault();
    }
    else if(event.ctrlKey && (event.key === "U" || event.key === "u")) {
        event.preventDefault();
    }
    else if(event.ctrlKey && (event.key === "J" || event.key === "j")) {
        event.preventDefault();
    }
    instructionEl.style.display = 'none';
    displayInstruction = false;
})

addEventListener('keyup', ({key}) => {
    if (key === 'a' || key === 'A' || key === 'ArrowLeft'){
        keys.left.pressed = false
        if (keys.right.pressed) {
            lastKey = 'right'
            playerDirection = "right"
        }
    }
    else if (key === 's' || key === 'S' || key === 'ArrowDown') {
    }
    else if (key === 'd' || key === 'D' || key === 'ArrowRight') {
        keys.right.pressed = false
        if (keys.left.pressed) {
            lastKey = 'left'
            playerDirection = "left"
        }
    }
    else if (key === 'w' || key === 'W' || key === 'ArrowUp') {
    }
})

document.body.querySelector('.leftbutton').addEventListener('mousedown', () => {
    keys.right.pressed = false
    keys.left.pressed = true
    lastKey = 'left'
    playerDirection = "left"
    instructionEl.style.display = 'none';
});

document.body.querySelector('.rightbutton').addEventListener('mousedown', () => {
    keys.left.pressed = false
    keys.right.pressed = true
    lastKey = 'right'
    playerDirection = "right"
    instructionEl.style.display = 'none';
});

document.body.querySelector('.upbutton').addEventListener('click', () => {
    if (player && player.jumpCount < 1)
    {
        player.velocity.y = jumpHeight
        keys.up.pressed = true
        player.jumpCount++
        instructionEl.style.display = 'none';
    }
});

document.body.querySelector('.leftbutton').addEventListener('mouseup', () => {
    initialX = 0
    initialY = 0
    keys.left.pressed = false
    keys.right.pressed = false
});

document.body.querySelector('.rightbutton').addEventListener('mouseup', () => {
    initialX = 0
    initialY = 0
    keys.left.pressed = false
    keys.right.pressed = false
});

function touchHandler(e) {
    if(e.touches) {
        // playerControllerPointer.style.display = "block"
        if (e.touches[0].pageY > playerController.getBoundingClientRect().y &&
            e.touches[0].pageY < playerController.getBoundingClientRect().y + 230 &&
            e.touches[0].pageX < playerController.getBoundingClientRect().x + 300 &&
            e.touches[0].pageX > playerController.getBoundingClientRect().x) {
            playerControllerPointer.style.left = (e.touches[0].pageX - canvas.offsetLeft - 50)
            playerControllerPointer.style.top = (e.touches[0].pageY - canvas.offsetTop - 50)
        }
        
        if (e.touches[0].pageX > playerController.getBoundingClientRect().x + 200) {
            keys.left.pressed = false
            keys.right.pressed = true
            lastKey = 'right'
            playerDirection = "right"
        }
        else if (e.touches[0].pageX < playerController.getBoundingClientRect().x + 100) {
            keys.right.pressed = false
            keys.left.pressed = true
            lastKey = 'left'
            playerDirection = "left"
        }
        if (e.touches[0].pageY < playerController.getBoundingClientRect().y + 50) {
            if (player && player.jumpCount < 1)
            {
                player.velocity.y = jumpHeight
                keys.up.pressed = true
                player.jumpCount++
            }
        }
        instructionEl.style.display = 'none';
        e.preventDefault();
    }
}

function touchEndHandler() {
    initialX = 0
    initialY = 0
    keys.left.pressed = false
    keys.right.pressed = false
    playerControllerPointer.style.display = "none"
}

function rainDrop(rainLocation) {
    let amount = 80
    let i = 0 
    rainContainer.style.height = window.innerHeight + 100 + 'px'
    while(i < amount) {
        let drop = document.createElement('i')
        let dropSize = Math.random() * 5
        let delay = Math.random() * -20
        drop.classList.add('rain-drop')
        drop.style.width = 0.2 * dropSize + 'px'
        drop.style.top = '-50 px'
        drop.style.animationDelay = delay + 's'
        
        if (rainLocation === 'LEFT') {
            amount = 10
            let posX = Math.floor(Math.random() * 300)
            drop.style.left = posX + 'px'
        }
        else if (rainLocation === 'RIGHT') {
            amount = 10
            let posX = Math.floor(Math.random() * 300)
            drop.style.left = canvas.width - posX + 'px'
        }
        else {
            let posX = Math.floor(Math.random() * (canvas.width - 900))
            drop.style.left = 300 + posX + 'px'
        }
        rainContainer.appendChild(drop)
        i++
    }
}

function rainSplash() {
    let amount = 20
    let i = 0
    while(i < amount) {
        let posX = Math.floor(Math.random() * (window.innerWidth - 400))
        let posY = Math.floor(Math.random() * 5)
        let delay = Math.random() * -20
        let splashContainer = document.createElement('div')
        splashContainer.classList.add('rain-splash-container')
        splashContainer.style.left = posX + 200 + 'px'
        splashContainer.style.top = canvas.height - 65 - posY + 'px'
        rainContainer.appendChild(splashContainer)
        let splashCount = 6
        let j = 0
        while(j < splashCount) {
            let splash = document.createElement('i')
            splash.classList.add('rain-splash')
            splash.style.animationDelay = delay + 's'
            splashContainer.appendChild(splash)
            j++
        }
        i++
    }
}

function makeItRain() {
    rainDrop('LEFT');
    rainDrop('RIGHT');
    rainDrop('MIDDLE');
    rainSplash();
}

function simulateFireflies() {
    let amount = 50
    let i = 0
    while(i < amount) {
        let firefly = document.createElement('i')
        let fireflyize = (Math.random() * 6) + 4
        let delay = Math.random() * -100
        firefly.classList.add('fire-fly')
        firefly.style.width = fireflyize + 'px'
        firefly.style.height = fireflyize + 'px'
        firefly.style.top = '-50 px'
        firefly.style.animationDelay = delay + 's'
        let posX = Math.floor(Math.random() * 1200)
        let posY = Math.floor(Math.random() * (canvas.height - 100))
        firefly.style.left = 50 + posX + 'px'
        firefly.style.top = posY + 'px'

        fireFlyContainer.appendChild(firefly)
        i++
    }
}