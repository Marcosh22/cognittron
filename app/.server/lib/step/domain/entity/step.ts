import StepInterface from "./step.interface";

class Step implements StepInterface {
  private _id: string;
  private _title: string;
  private _content: string;
  private _trailId: string;

  constructor(
    id: string,
    title: string,
    content: string,
    trailId: string,
  ) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._trailId = trailId;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
    if (this._title.length === 0) {
      throw new Error("Title is required");
    }
    if (this._content.length === 0) {
      throw new Error("Content is required");
    }
    if (this._trailId.length === 0) {
      throw new Error("Trail ID is required");
    }
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public get trailId(): string {
    return this._trailId;
  }
}

export default Step;
