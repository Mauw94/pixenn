import { Entity } from "./Entity";

export class CollisionManager {

    constructor() { }

    public checkCollision(a: Entity, b: Entity): boolean {
        if (a.checkCollision(b)) return true;
        return false;
    }

    public checkCollisions(a: Entity, entities: Entity[]): boolean {
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];

            if (a.id === entity.id) continue;
            if (a.checkCollision(entity)) return true;
        }

        return false;
    }
}