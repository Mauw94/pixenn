import { Camera } from "./Camera";
import InputListener from "./InputListener";
import { SceneManager } from "./SceneManager";

export interface GameData {
    context: CanvasRenderingContext2D;
    screenWidth: number;
    screenHeight: number;
    inputListener: InputListener;
    sceneManager: SceneManager;
    camera: Camera;
}