class EnumClass
{
  private value: string;

  protected constructor(value: string)
  {
    this.value = value;
  }

  public toString(): string
  {
    return this.value;
  }
}

class CSS extends EnumClass
{
  public static NONE: CSS    = new CSS("none");
  public static INHERIT: CSS = new CSS("inherit");
  public static INITIAL: CSS = new CSS("initial");
}

class CSSDisplay extends CSS
{
  public static BLOCK: CSSDisplay        = new CSSDisplay("block");
  public static INLINE_BLOCK: CSSDisplay = new CSSDisplay("inline-block");
  public static INLINE: CSSDisplay       = new CSSDisplay("inline");
}

class CSSTextTransform extends CSS
{
  public static CAPS:  CSSTextTransform = new CSSTextTransform("capitalize");
  public static UPPER: CSSTextTransform = new CSSTextTransform("uppercase");
  public static LOWER: CSSTextTransform = new CSSTextTransform("lowercase");
}
