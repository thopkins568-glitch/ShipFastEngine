export class AssetManager {
    private static textures = new Map<string, HTMLImageElement>();

    static async loadTexture(name: string, src: string) {
        if (this.textures.has(name)) return;

        const img = new Image();
        img.src = src;
        await img.decode();
        this.textures.set(name, img);
    }

    static getTexture(name: string) {
        return this.textures.get(name);
    }
}
