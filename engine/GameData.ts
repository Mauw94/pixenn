import { Camera } from "./Camera";
import { CollisionManager } from "./collisionManager";
import InputListener from "./InputListener";
import { SceneManager } from "./SceneManager";

export interface GameData {
    context: CanvasRenderingContext2D;
    screenWidth: number;
    screenHeight: number;
    inputListener: InputListener;
    collisionManager: CollisionManager;
    sceneManager: SceneManager;
    camera: Camera;
}