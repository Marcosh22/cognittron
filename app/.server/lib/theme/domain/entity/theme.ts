import ThemeInterface from "./theme.interface";

class Theme implements ThemeInterface {
  private _id: string;
  private _title: string;
  private _academyId: string;

  constructor(
    id: string,
    title: string,
    academyId: string,
  ) {
    this._id = id;
    this._title = title;
    this._academyId = academyId;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
    if (this._title.length === 0) {
      throw new Error("Title is required");
    }
    if (this._academyId.length === 0) {
      throw new Error("Academy ID is required");
    }
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get academyId(): string {
    return this._academyId;
  }
}

export default Theme;
