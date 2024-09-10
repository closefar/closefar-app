import { errorCodeToMessageList } from "./../constants/errorCodeToMessage";
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

    const extractedError =
      errorCodeArray &&
      errorCodeToMessageList[
        errorCodeArray[0] as unknown as keyof typeof errorCodeToMessageList
      ];

    return extractedError ? extractedError : "an error ocurred";
  }
};
