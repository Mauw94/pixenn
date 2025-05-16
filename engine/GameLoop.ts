export class DeltaTracker {
    private lastTime: number = 0;
    private delta: number = 0;
    private fps: number = 0;

    public getAndUpdateDelta(): number {
        if (this.lastTime == 0) {
            this.lastTime = this.getTimeStampMS();
            return 0;
        }

        const currentTime = this.getTimeStampMS();
        this.delta = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.fps = 1 / this.delta;
        this.lastTime = currentTime;
        return this.delta;
    }

    public getFps(): number {
        return this.fps;
    }

    private getTimeStampMS(): number {
        return (new Date()).getTime();
    }
}

type GameUpdateFunction = (delta: number) => void;
type GameRenderFunction = () => void;

export class GameLoop {
    private updateFunction: GameUpdateFunction;
    private renderFunction: GameRenderFunction;
    private deltaTracker: DeltaTracker;

    private animationFrame: number = 0;

    constructor(
        updateFunction: GameUpdateFunction,
        renderFunction: GameRenderFunction
    ) {
        this.updateFunction = updateFunction;
        this.renderFunction = renderFunction;
        this.deltaTracker = new DeltaTracker();
    }
    public run(): void {
        this.animationFrame = window.requestAnimationFrame(this.loop.bind(this));
    }

    public stop(): void {
        window.cancelAnimationFrame(this.animationFrame);
    }

    private loop(): void {
        const delta = this.deltaTracker.getAndUpdateDelta();
        this.updateFunction(delta);
        this.renderFunction();
        window.requestAnimationFrame(this.loop.bind(this));
    }
}