import { createLogger, transports } from "winston";
import { AppError } from "./app-errors";
import { NextFunction, Request, Response } from "express";
import { Yup } from "./Yup";

const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

class ErrorLogger {
  constructor() {}
  async logError(err: Error) {
    console.log("==================== Start Error Logger ===============");
    LogErrors.log({
      private: true,
      level: "error",
      message: `${new Date()}-${JSON.stringify(err)}`,
    });
    console.log("==================== End Error Logger ===============");
    // log error with Logger plugins

    return false;
  }

  isTrustError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    } else {
      return false;
    }
  }
}

const ErrorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorLogger = new ErrorLogger();

  // handle yup validation error
  if (err instanceof Yup.ValidationError) {
    errorLogger.logError( err)
    res.json({ message: err.errors }).status(400);
    return;
  }

  process.on("uncaughtException", (reason, promise) => {
    console.log(reason, "UNHANDLED");
    throw reason; // need to take care
  });

  process.on("uncaughtException", (error) => {
    errorLogger.logError(error);
    if (errorLogger.isTrustError(err)) {
      //process exist // need restart
    }
  });

  // console.log(err.description, '-------> DESCRIPTION')
  // console.log(err.message, '-------> MESSAGE')
  // console.log(err.name, '-------> NAME')
  if (err) {
    await errorLogger.logError(err);
    if (errorLogger.isTrustError(err)) {
      if (err instanceof AppError) {
        if (err.errorStack) {
          const errorDescription = err.errorStack;
          res.status(err.statusCode).json({ message: errorDescription });
          return;
        }
        res.status(err.statusCode).json({ message: err.message });
        return;
      } else {
        //process exit // terriablly wrong with flow need restart
      }
    }
    // return res.status(err.statusCode).json({ message: err.message });
    res.status(500).json({ message: err.message });
    return;
  }
  next();
};

export default ErrorHandler;
