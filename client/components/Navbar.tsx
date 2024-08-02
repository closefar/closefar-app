import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BreakLine from "./BreakLine";
import useCurrentUser from "../hooks/useCurrentUser";
import * as fcl from "@onflow/fcl";
import * as transactions from "@transactions";
import * as scripts from "@scripts";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

const Navbar = () => {
  const currentUser = useCurrentUser();
  const [openMenu, setOpenMenu] = useState(false);

  const authenticate = async () => {
    try {
      await fcl.authenticate();
      // const status = await scripts.isSetupAndCreatedStorefront(user.addr);
      // !status.setup && (await transactions.setupAccount());
      // !status.storefront && (await transactions.createStoreFront());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const setupAccount = async () => {
      try {
        if (!currentUser.addr) return;
        const status = await scripts.isSetupAndCreatedStorefront(
          currentUser.addr
        );
        !status.setup && (await transactions.setupAccount());
        !status.storefront && (await transactions.createStoreFront());
      } catch (error) {
        console.log(error);
      }
    };
    setupAccount();
  });

  return (
    <>
      <div className="grid sm:grid-cols-3 grid-cols-2 lg:px-28 px-7 md:px-12 py-3">
        <div className="sm:flex items-center justify-start hidden">
          {currentUser.addr}
        </div>
        <div className="flex items-center justify-center">
          <Link href="/">
            <Image
              src={"/logo3.jpg"}
              alt=""
              width={100}
              height={100}
              priority={true}
              className="w-24 h-auto"
            />
          </Link>
        </div>
        <ul className="flex items-center justify-end">
          {!currentUser.loggedIn ? (
            <li onClick={authenticate} className="cursor-pointer">
              Connect Wallet
            </li>
          ) : (
            <>
              <div className=" hidden sm:flex items-center justify-end lg:gap-5 md:gap-3 gap-2">
                <li className="min-w-fit">
                  <Link href="/mint">Mint</Link>
                </li>
                <li className="min-w-fit">
                  <Link href="/collect">Collect</Link>
                </li>
                <li className="min-w-fit">
                  <Link href="/my-collections">My Collection</Link>
                </li>
                <li
                  className="min-w-fit cursor-pointer"
                  onClick={fcl.unauthenticate}
                >
                  Log Out
                </li>
              </div>
              <div className="sm:hidden">
                <Menu open={openMenu} handler={setOpenMenu}>
                  <MenuHandler>
                    <div className="flex items-center gap-1">
                      {currentUser.addr}
                      <svg
                        strokeWidth={2.5}
                        className={`h-3.5 w-3.5 transition-transform ${
                          openMenu ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <li className="min-w-fit">
                        <Link href="/mint">Mint</Link>
                      </li>
                    </MenuItem>
                    <MenuItem>
                      <li className="min-w-fit">
                        <Link href="/collect">Collect</Link>
                      </li>
                    </MenuItem>
                    <MenuItem>
                      <li className="min-w-fit">
                        <Link href="/my-collections">My Collection</Link>
                      </li>
                    </MenuItem>
                    <MenuItem>
                      <li
                        className="min-w-fit cursor-pointer"
                        onClick={fcl.unauthenticate}
                      >
                        Log Out
                      </li>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </>
          )}
        </ul>
      </div>
      <BreakLine />
    </>
  );
};

export default Navbar;
