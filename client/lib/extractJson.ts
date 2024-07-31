export const extractJSON = (s: string) => {
  const str = new String(s);
  let firstOpen, firstClose, candidate;
  firstOpen = str.indexOf("responseBody={", firstOpen + 1);
  do {
    firstClose = str.lastIndexOf("}");
    console.log("firstOpen: " + firstOpen, "firstClose: " + firstClose);
    if (firstClose <= firstOpen) {
      return null;
    }
    do {
      candidate = str.substring(firstOpen, firstClose + 1);
      console.log("candidate: " + candidate);
      try {
        const res = JSON.parse(candidate);
        console.log("...found");
        return [res, firstOpen, firstClose + 1];
      } catch (e) {
        console.log("...failed");
      }
      firstClose = str.substr(0, firstClose).lastIndexOf("}");
    } while (firstClose > firstOpen);
    firstOpen = str.indexOf("{", firstOpen + 1);
  } while (firstOpen != -1);
};
