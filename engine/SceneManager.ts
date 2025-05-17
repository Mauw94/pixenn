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

    public update(delta: number): void {
        this.currentScene.update(delta);
    }

    public render(): void {
        this.currentScene.render();
    }
}