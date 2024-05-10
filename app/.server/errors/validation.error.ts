export default class ValidationError extends Error {
  public code: number;
  public details: Record<string, any>;

    constructor(message: string, details: Record<string, any>) {
      super(message)
  
      this.code = 422
      this.details = details
    }
  }
  