import type { Entity } from "./Entity";
import { Scene } from "./Scene";

export class SceneManager {
    private static instance: SceneManager;
    private currentScene!: Scene;

    private constructor() { }

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }

    public setCurrentScene(scene: Scene): void {
        this.currentScene = scene;
        this.currentScene.setup();
    }

    public getCurrentScene(): Scene {
        return this.currentScene;
    }

    public addEntity(entity: Entity): void {
        this.currentScene.addEntity(entity);
    }

    // public addEntity(entity: Entity, entityType: EntityType): void {
    //     switch (entityType) {
    //         case EntityType.PLAYER:
    //             this.currentScene.players.push(entity);
    //             break;
    //         case EntityType.PLAYER_ATTACK:
    //             this.currentScene.playerAttacks.push(entity);
    //             break;
    //         case EntityType.ENEMY_ATTACK:
    //         case EntityType.ENEMY:
    //             this.currentScene.enemies.push(entity);
    //             break;
    //     }
    // }

    public update(delta: number): void {
        this.currentScene.update(delta);
    }

    public render(): void {
        this.currentScene.render();
    }
}