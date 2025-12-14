// src/render/AssetManager.ts

export class AssetManager {
    private assets: Map<string, HTMLImageElement> = new Map();

    public loadAsset(key: string, src: string): void {
        const img = new Image();
        img.src = src;
        this.assets.set(key, img);
    }

    public get(key: string): HTMLImageElement | undefined {
        return this.assets.get(key);
    }
}
