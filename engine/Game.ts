import { Camera } from "./Camera";
import type { GameData } from "./GameData";
import { GameLoop } from "./GameLoop";
import InputListener from "./InputListener";
import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";

export class Game {
    public isGameOver: boolean = false;
    public isPaused: boolean = false;
    public useTopDownCamera: boolean = false;
    public panCameraToPlayer: boolean = false;
    public gameData: GameData;

    private gameLoop: GameLoop | undefined;
    private sceneManager: SceneManager = SceneManager.getInstance();

    constructor(canvas: HTMLCanvasElement) {
        this.gameData = {
            context: canvas.getContext("2d")!,
            screenWidth: canvas.width,
            screenHeight: canvas.height,
            inputListener: new InputListener(),
            sceneManager: this.sceneManager,
            camera: new Camera(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height),
        };
    }

    public run(): void {
        if (this.sceneManager.getCurrentScene() === undefined) throw new Error('No current scene available.');

        this.gameLoop = new GameLoop(
            this.update.bind(this),
            this.render.bind(this)
        );

        this.gameLoop.run();
    }

    protected update(delta: number): void {
        this.sceneManager.update(delta);

        // NOTE: if player is setup we can center the camera on the player from above

        // if (this.panCameraToPlayer) {
        //     const { camera, player } = this.gameData;
        //     camera.x = player.xPos + this.offset - camera.width / 2;
        //     camera.y = player.yPos - camera.height / 2;
        // }
    }

    protected render(): void {
        this.gameData.context.clearRect(0, 0, this.gameData.screenWidth, this.gameData.screenHeight);
        this.sceneManager.render();
    }

    public setCurrentScene(scene: Scene): void {
        this.sceneManager.setCurrentScene(scene);
    }
}