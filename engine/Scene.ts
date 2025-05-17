import type { Entity } from "./Entity";
import type { GameData } from "./GameData";

export abstract class Scene {
    public abstract alpha: number;
    public abstract entities: Entity[];
    public isGameOver: boolean = false;
    public isPaused: boolean = false;

    constructor(protected gameData: GameData) {
        this.gameData = gameData;
    }

    public abstract setup(): void;
    public abstract update(delta: number): void;
    public abstract render(): void;
    public abstract addEntity(entity: Entity): void;
    public abstract addEntities(entities: Entity[]): void;
    public abstract removeEntity(entity: Entity): boolean;
    public abstract removeEntities(entities: Entity[]): boolean;
    
    // NOTE: this goes to a collision manager/scene that needs to check
    // public checkCollisionsWithEnemies(attack: Entity): void {
    //     this.enemies.forEach((enemy) => {
    //         if (enemy.checkCollision(attack.collisionBox.x, attack.collisionBox.y)) {
    //             attack.shouldBeRemoved = true;
    //             // this.removeEntity(attack);
    //             enemy.hit();
    //         }
    //     })
    // }

    // cleanup(): void {
    //     this.playerAttacks.forEach((entity) => {
    //         this.removeEntity(this.playerAttacks, entity);
    //     });
    //     this.enemies.forEach((entity) => {
    //         this.removeEntity(this.enemies, entity);
    //     });
    //     this.playerAttacks.forEach((entity) => {
    //         this.removeEntity(this.playerAttacks, entity);
    //     });
    // }

    // removeEntity(list: Entity[], entity: Entity): void {
    //     const index = list.indexOf(entity);
    //     if (index > -1) {
    //         this.entities.splice(index, 1);
    //     }
    // }


    // abstract entities: Entity[];
    // NOTE: note sure if this needs to be in here
    // vvvv
    // abstract players: Entity[];
    // abstract enemies: Entity[];
    // abstract playerAttacks: Entity[];

}