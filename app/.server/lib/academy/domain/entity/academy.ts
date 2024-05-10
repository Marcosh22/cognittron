import AcademyInterface from "./academy.interface";

class Academy implements AcademyInterface {
  private _id: string;
  private _title: string;

  constructor(
    id: string,
    title: string,
  ) {
    this._id = id;
    this._title = title;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
    if (this._title.length === 0) {
      throw new Error("Title is required");
    }
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

}

export default Academy;
