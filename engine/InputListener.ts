class InputListener {
    private keys: Set<string> = new Set();
    private mouseDown: boolean = false;
    private mouseX: number = 0;
    private mouseY: number = 0;

    constructor() {
        window.addEventListener('keydown', (event) => {
            this.keys.add(event.key);
        });

        window.addEventListener('keyup', (event) => {
            this.keys.delete(event.key);
        });

        window.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });

        window.addEventListener('mousedown', (_event) => {
            this.mouseDown = true;
        });

        window.addEventListener('mouseup', (_event) => {
            this.mouseDown = false;
        });
    }

    isAnyKeyPressed(keys: string[]): boolean {
        if (keys.length === 0) return false;
        for (const key of keys) {
            if (this.keys.has(key)) {
                return true;
            }
        }
        return false;
    }

    isKeyPressed(key: string): boolean {
        return this.keys.has(key);
    }

    isKeyReleased(key: string): boolean {
        return !this.keys.has(key);
    }

    isMouseDown(): boolean {
        return this.mouseDown;
    }

    getMouseClickPosition(): [number, number] {
        return [this.mouseX, this.mouseY];
    }
}

export default InputListener;