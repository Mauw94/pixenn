import { Entity } from "./Entity";
import { EntityType } from "./EntityType";
import type { GameData } from "./GameData";

export class Player extends Entity {
    public EntityType: EntityType = EntityType.PLAYER;

    constructor(x: number, y: number) {
        super();
        this.width = 50;
        this.height = 50;
        this.xPos = x;
        this.yPos = y;
    }

    public update(gameData: GameData, delta: number): void {
        // NOTE: maybe update in entity also abstract.
        super.update(gameData, delta);
        const { inputListener, camera } = gameData;

        this.velocityX = 0;
        this.velocityY = 0;

        if (inputListener.isAnyKeyPressed(["ArrowRight", "d"])) {
            this.velocityX = this.speed * delta;
        } else if (inputListener.isAnyKeyPressed(["ArrowLeft", "a"])) {
            this.velocityX = -(this.speed * delta);
        }

        if (inputListener.isAnyKeyPressed(["ArrowUp", "w"])) {
            this.velocityY = -(this.speed * delta);
        } else if (inputListener.isAnyKeyPressed(["ArrowDown", "s"])) {
            this.velocityY = this.speed * delta;
        }

        this.xPos += this.velocityX;
        this.yPos += this.velocityY;

        // NOTE: should be able to be configurable
        camera.x = (this.xPos) - camera.width / 2;
        camera.y = this.yPos - camera.height / 2;
    }

    public render(gameData: GameData): void {
        const { context, camera } = gameData;
        context.fillStyle = 'white';
        context.fillRect(this.xPos - camera.x, this.yPos - camera.y, this.width, this.height);
    }
}