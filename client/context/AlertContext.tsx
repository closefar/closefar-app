import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

const AlertContext = createContext<Alert[]>(null);

const AlertDispatchContext =
  createContext<(data: CloseAction | OpenAction) => void>(null);

let alertDispatch: Dispatch<CloseAction | OpenAction>;

export function AlertProvider({ children }) {
  const [alert, dispatch] = useReducer(alertReducer, initialAlert);
  alertDispatch = dispatch;
  return (
    <AlertContext.Provider value={alert}>
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}

export function useAlertDispatch() {
  return useContext(AlertDispatchContext);
}

function alertReducer(
  alerts: Alert[],
  action: CloseAction | OpenAction
): Alert[] {
  switch (action.type) {
    case "open": {
      const id = Date.now().toString();
      setTimeout(() => {
        alertDispatch({ type: "close", id });
      }, 5000);
      console.log(alerts);
      return [
        ...alerts,
        {
          id,
          message: action.message,
          class: action.class,
          isShow: true,
        },
      ];
    }
    case "close": {
      const showedAlert = alerts.filter((alert) => alert.isShow);
      return showedAlert.map((alert) =>
        alert.id === action.id ? { ...alert, isShow: false } : alert
      );
    }

    default: {
      throw Error("Unknown action: " + (action as any).type);
    }
  }
}

const initialAlert: Alert[] = [];

type Action = {
  message: string;
  class: "success" | "error";
  type: "open" | "close";
};
type Alert = {
  message: string | ReactNode;
  class: "success" | "error";
  id: string;
  isShow: boolean;
};
type CloseAction = { type: "close"; id: string };
type OpenAction = {
  message: string | ReactNode;
  class: "success" | "error";
  type: "open";
};

{
  /* type Close = { type: "close" };
type Open = { type: "open" };
type Alert = { message: string; class: "success" | "error" };
type CloseAction = { type: "close" };
type OpenAction = { message: string; class: "success" | "error"; type: "open" }; */
}

{
  /* const AlertContext = createContext<Alert>(null);

const AlertDispatchContext =
  createContext<
    <T = CloseAction | OpenAction>(
      data: T extends CloseAction ? CloseAction : OpenAction
    ) => void
  >(null);

export function AlertProvider({ children }) {
  const [alert, dispatch] = useReducer<
    (alert: Alert, action: CloseAction | OpenAction) => Alert,
    Alert
  >(alertReducer, initialAlert, null);

  return (
    <AlertContext.Provider value={alert}>
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}

export function useAlertDispatch() {
  return useContext(AlertDispatchContext);
}

function alertReducer<T = CloseAction | OpenAction>(
  alert: Alert,
  action: T extends CloseAction ? CloseAction : OpenAction
): Alert {
  console.log(alert, action);
  switch (action.type) {
    case "open": {
      return { message: "aljsdf", class: "success" };
    }
    case "close": {
      return { message: "", class: "success" };
    }

    default: {
      throw Error("Unknown action: " + action!.type);
    }
  }
}

const initialAlert: { message: string; class: "success" | "error" } = {
  message: "",
  class: "success",
}; */
}
