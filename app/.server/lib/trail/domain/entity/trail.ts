import TrailInterface from "./trail.interface";

class Trail implements TrailInterface {
  private _id: string;
  private _title: string;
  private _themeId: string;

  constructor(
    id: string,
    title: string,
    themeId: string,
  ) {
    this._id = id;
    this._title = title;
    this._themeId = themeId;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
    if (this._title.length === 0) {
      throw new Error("Title is required");
    }
    if (this._themeId.length === 0) {
      throw new Error("Theme ID is required");
    }
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get themeId(): string {
    return this._themeId;
  }
}

export default Trail;
