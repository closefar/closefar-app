import { useAlert, useAlertDispatch } from "context/AlertContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Alert } from "@material-tailwind/react";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const alerts = useAlert();
  const alertDispatch = useAlertDispatch();

  return (
    <div className="relative min-h-screen flex flex-col h-fit">
      <Navbar />
      <main className="flex-auto min-h-screen">{children}</main>
      <Footer />
      <div className="fixed left-1/2 -translate-x-1/2 bottom-[5%] flex flex-col items-center gap-2 z-50">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            className={`w-fit rounded-none border-l-4 font-medium text-[#212925]
            ${
              alert?.class === "success"
                ? "border-[#288736] bg-[#2ec946]/90"
                : "border-[#812141] bg-[#cd3945]/90"
            }
            `}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            onClose={() => alertDispatch({ type: "close", id: alert.id })}
            open={alert.isShow}
            // color={`${alert.class === "success" ? "green" : "red"}`}
          >
            {alert?.message}
          </Alert>
        ))}
      </div>
    </div>
  );
}
