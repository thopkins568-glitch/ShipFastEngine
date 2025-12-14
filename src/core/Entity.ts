export class Entity {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public isSolid = false;
  public alpha = 1;
  public flipX = false;
  public tag?: string;
  public tags: string[] = [];
  public _shouldRemove = false;

  constructor(
    public assetKey: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setAsset(key: string) {
    this.assetKey = key;
  }

  hasTag(tag: string): boolean {
    return this.tag === tag || this.tags.includes(tag);
  }

  update(dt: number, scene?: any): void {}

  render(ctx: CanvasRenderingContext2D, assets: any): void {
    const img = assets?.[this.assetKey];
    if (!img) return;

    ctx.save();
    ctx.globalAlpha = this.alpha;

    if (this.flipX) {
      ctx.translate(this.x + this.width / 2, 0);
      ctx.scale
