///<reference path="../_.ts"/>

namespace oct.fah.app
{
  export class StaticConfig
  {
    private _basePage: string     = "//www.furaffinity.net/";
    private _browsePage: string   = "//www.furaffinity.net/browse/";
    private _viewPage: string     = "//www.furaffinity.net/view/";
    private _subPage: string      = "//www.furaffinity.net/msg/submissions/";
    private _userPage: string     = "//www.furaffinity.net/user/";
    private _searchPage: string   = "//www.furaffinity.net/search/";
    private _messagesPage: string = "//www.furaffinity.net/msg/others/";
    private _previewPage: string  = "//t.facdn.net/";


    public get basePage(): string
    {
      return this._basePage;
    }

    public get browsePage(): string
    {
      return this._browsePage;
    }

    public get viewPage(): string
    {
      return this._viewPage;
    }

    public get subPage(): string
    {
      return this._subPage;
    }

    public get userPage(): string
    {
      return this._userPage;
    }

    public get searchPage(): string
    {
      return this._searchPage;
    }

    public get messagesPage(): string
    {
      return this._messagesPage;
    }

    public get previewPage(): string
    {
      return this._previewPage;
    }
  }
}
