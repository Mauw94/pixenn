import { EntityType } from "./EntityType";
import type { GameData } from "./GameData";

export abstract class Entity {
    public abstract EntityType: EntityType;
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

    public FRAME_SIZE = 50;
    private blinkTimeMs: number = 0;
    private currBlinkTimeMs: number = 0;
    private minBlinkOpacity: number = 0.5;
    private hitTimeMs: number = 2000;

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
    }

    public setup(): void {
        this.hasBeenSetup = true;
    }

    // NOTE: this can also be moved to some implementation of an Entity
    public update(gameData: GameData, delta: number): void {
        if (!this.hasBeenSetup) return;

        this.updateCollisionBox(gameData);

        if (this.isHit && this.hitTimeMs >= 0) {
            this.hitTimeMs -= delta * 1000;
            this.doFlinch(delta);
            if (this.hitTimeMs <= 0) {
                this.isHit = false;
                this.hitTimeMs = 2000;
                this.currBlinkTimeMs = this.blinkTimeMs;
            }
        }
    }

    public isEnemy(): boolean { return this.EntityType === EntityType.ENEMY }
    public isPlayer(): boolean { return this.EntityType === EntityType.PLAYER; }
    public isPlayerAttack(): boolean { return this.EntityType === EntityType.PLAYER_ATTACK; }
    public isEnemyAttack(): boolean { return this.EntityType === EntityType.ENEMY_ATTACK; }

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

    public checkCollision(x: number, y: number): boolean {
        return (
            x >= this.collisionBox.x &&
            x <= this.collisionBox.x + this.collisionBox.width &&
            y >= this.collisionBox.y &&
            y <= this.collisionBox.y + this.collisionBox.height
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