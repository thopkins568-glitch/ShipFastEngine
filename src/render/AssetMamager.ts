export interface TextureData {
    image: HTMLImageElement;
    frameCount?: number; // Optional number of frames for spritesheet
}

export class AssetManager {
    private static textures = new Map<string, TextureData>();

    static async loadTexture(name: string, src: string, frameCount?: number) {
        if (this.textures.has(name)) return;

        const img = new Image();
        img.src = src;
        await img.decode();
        this.textures.set(name, { image: img, frameCount });
    }

    static getTexture(name: string): HTMLImageElement | undefined {
        return this.textures.get(name)?.image;
    }

    static getFrameCount(name: string): number {
        return this.textures.get(name)?.frameCount ?? 1;
    }
}
