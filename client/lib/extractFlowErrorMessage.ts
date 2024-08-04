import { errorCodeToMessage } from "./../constants/errorCodeToMessage";
import { extractPanic } from "./extractPanic";

// extract error code from error string for example [Error Code: 1007] ...
export const extractFlowErrorMessage = (error: string) => {
  const err = new String(error);

  if (err.indexOf("Declined: User rejected the request.") !== -1) {
    //error of user rejecting
    return err;
  } else if (err.indexOf("panic(") !== -1) {
    //error of panic in cadence
    return extractPanic(err);
  } else {
    const errorCodeArray = err.match(/(?<=\[Error Code: )(.*)(?=\])/gm);

    return errorCodeArray &&
      errorCodeArray.length > 0 &&
      errorCodeToMessage[errorCodeArray[0]]
      ? errorCodeToMessage[errorCodeArray[0]]
      : "an error ocurred";
  }
};
