///<reference path="_.ts"/>

namespace oct.fah.app
{
  const NEW_WATCHER_SHOUT: string      = "newWatcherShoutText";
  const NEW_FAVORITE_SHOUT: string     = "newFavoriteShoutText";
  const HOVER_PREVIEW_SIZE: string     = "hoverPreviewSize";
  const HOVER_PREVIEW_ENABLED: string  = "enableHoverPreview";
  const IMAGE_FLOW_ENABLED: string     = "enableImageFlow";
  const LARGE_PREVIEWS_ENABLED: string = "enableLargePreviews";

  export class Settings
  {
    public static get NEW_WATCHER_SHOUT(): string
    {
      return NEW_WATCHER_SHOUT;
    }

    public static get NEW_FAVORITE_SHOUT(): string
    {
      return NEW_FAVORITE_SHOUT;
    }

    public static get HOVER_PREVIEW_SIZE(): string
    {
      return HOVER_PREVIEW_SIZE;
    }

    public static get HOVER_PREVIEW_ENABLED(): string
    {
      return HOVER_PREVIEW_ENABLED;
    }

    public static get IMAGE_FLOW_ENABLED(): string
    {
      return IMAGE_FLOW_ENABLED;
    }

    public static get LARGE_PREVIEWS_ENABLED(): string
    {
      return LARGE_PREVIEWS_ENABLED;
    }
  }
}
