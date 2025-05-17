import type { GameData } from "./GameData";

export abstract class Entity {
    public hasBeenSetup: boolean = false;
    public shouldBeRemoved: boolean = false;
    public isHit: boolean = false;
    public isDead: boolean = false;
    public readonly id: Symbol;
    // TODO: we can 'hardcore' ids for certain important entities
    // such as a player and keep a dict of these entities. This can be handle for later checking

    public xPos: number = 0;
    public yPos: number = 0;
    public speed: number = 0;
    public width: number = 0;
    public height: number = 0;
    public scale: number = 1;
    public health: number = 0;

    protected velocityX: number = 0;
    protected velocityY: number = 0;
    protected isAttack1: boolean = false;
    protected isAttack2: boolean = false;
    protected isAttack3: boolean = false;
    public collisionBox: { x: number, y: number, width: number, height: number } = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    
    // TODO: shouldn't be a hardcoded value.
    public FRAME_SIZE = 50;
    public blinkTimeMs: number = 0;
    public currBlinkTimeMs: number = 0;
    public minBlinkOpacity: number = 0.5;
    public hitTimeMs: number = 2000;

    constructor() {
        this.id = Symbol();
        this.currBlinkTimeMs = this.blinkTimeMs;
        this.width = 100;
        this.height = 100;
        this.speed = 150;
        this.health = 100;
    }

    public runSetup(): void {
        this.setup();
        this.hasBeenSetup = true;
    }

    public abstract setup(): void;
    public abstract update(gameData: GameData, delta: number): void;
    public abstract render(gameData: GameData): void;

    public scaleUp(amount: number): void {
        this.width *= amount;
        this.height *= amount;
        this.FRAME_SIZE *= amount;
    }

    protected setBlinkMs(blinkTimeMs: number): void {
        this.blinkTimeMs = blinkTimeMs;
        this.currBlinkTimeMs = blinkTimeMs;
    }

    protected doFlinch(delta: number): void {
        this.currBlinkTimeMs -= delta * 1000;
        if (this.currBlinkTimeMs <= -this.blinkTimeMs) {
            this.currBlinkTimeMs = this.blinkTimeMs;
        }
    }

    protected calculateOpacity(): number {
        const opacityVariance = 1 - this.minBlinkOpacity;
        const opacityValue = (Math.abs(this.currBlinkTimeMs) / this.blinkTimeMs) * opacityVariance;
        return this.minBlinkOpacity + opacityValue;
    }

    protected checkCanvasBounds(gameData: GameData): void {
        const { context } = gameData;

        // NOTE: can expand canvas bounds
        // if (this.xPos < -context.canvas.width) {
        //     this.xPos = -context.canvas.width;
        // } else if (this.xPos > context.canvas.width * 2) {
        //     this.xPos = context.canvas.width * 2;
        // }

        if (this.xPos < 0) {
            this.xPos = 0;
        } else if (this.xPos > context.canvas.width - this.FRAME_SIZE) {
            this.xPos = context.canvas.width - this.FRAME_SIZE;
        }

        if (this.yPos < 0) {
            this.yPos = 0;
        } else if (this.yPos > context.canvas.height - this.FRAME_SIZE) {
            this.yPos = context.canvas.height - this.FRAME_SIZE;
        }
    }

    protected updateCollisionBox(gameData: GameData): void {
        const { camera } = gameData
        this.collisionBox.x = this.xPos + this.FRAME_SIZE / 2 - camera.x;
        this.collisionBox.y = this.yPos + this.FRAME_SIZE / 2 - camera.y;
        this.collisionBox.width = this.FRAME_SIZE;
        this.collisionBox.height = this.FRAME_SIZE;
    }

    public drawCollisionBox(gameData: GameData): void {
        gameData.context.fillRect(
            this.collisionBox.x, this.collisionBox.y,
            this.collisionBox.width, this.collisionBox.height);
    }

    public checkCollision(collider: Entity): boolean {
        return (
            collider.collisionBox.x >= this.collisionBox.x &&
            collider.collisionBox.x <= this.collisionBox.x + this.collisionBox.width &&
            collider.collisionBox.y >= this.collisionBox.y &&
            collider.collisionBox.y <= this.collisionBox.y + this.collisionBox.height
        );
    }

    public hit(): void {
        // TODO: implement logging framework
        // check for connectivity on game creation
        // Be able to configure to endpoint 
        // log('enemy got hit', 'warn');
        console.log('enemy got hit.');
    }
}