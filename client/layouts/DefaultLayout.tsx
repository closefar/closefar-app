import { useAlert } from "context/AlertContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Alert } from "@material-tailwind/react";

export default function DefaultLayout({ children }) {
  const alert = useAlert();

  return (
    <div className="min-h-screen flex flex-col h-fit">
      <Navbar />
      <main className="flex-auto min-h-screen">{children}</main>
      <Footer />
      <div className="fixed w-full bottom-[5%] flex justify-center items-center z-50">
        <Alert
          className={`w-fit rounded-none border-l-4 font-medium text-[#212925]
            ${
              alert?.class === "success"
                ? "border-[#288736] bg-[#2ec946]/90"
                : "border-[#812141] bg-[#cd3945]/90"
            }
            `}
          open={!!alert?.message}
          // color={`${alert.class === "success" ? "green" : "red"}`}
        >
          {alert?.message ? alert?.message : ""}
        </Alert>
      </div>
    </div>
  );
}
