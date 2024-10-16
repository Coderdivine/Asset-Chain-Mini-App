"use client";
import React, { useContext } from "react";
import { useTonWallet } from "../hooks/useTonWallet";
import { DashboardContext } from "@/pages/App";
import { useEvmWallet } from "@/hooks/useEvmWallet";
import { concatAddress } from "@/utils/concatAddress";
import logo from "../icons/AssetConnect.png";
import tonlogo from "../icons/tonlogo.png";
import Image from "next/image";
import assetChainLogo from "../icons/whiteassetchainlogo.png";
import loadingImage from "../icons/AssetchainLoading.png";
import arrowRight from "../icons/arrow-right.png";
import metamaskLogo from "../icons/Metamask.png";

const ConnectButton = ({ toggleModal }: ConnectButton) => {
  const { connectWallet, disconnectWallet, userFriendlyAddress } =
    useTonWallet();
  const { connectEvmWallet, evmAddress } = useEvmWallet();
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  const { tonConnected, evmConnected, disbleEvm, disableTon, processing } =
    dashboardContext;
  const address = concatAddress(userFriendlyAddress);
  const addressEVM = concatAddress(evmAddress || "");

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-50">
      <div className="modal-glow pt-6 w-full md:w-1/2 rounded-t-lg">
        <span className="flex justify-between mb-4 pl-4 pr-4">
          <h2 className="text-lg font-bold mb-4">
            <Image src={logo} alt="logo" className="w-48" />
          </h2>
          <h2
            onClick={toggleModal}
            className="text-lg text-center mb-4 h-[30px] w-[30px] rounded-full text-[#537AA5] bg-gray-700 cursor-pointer"
          >
            X
          </h2>
        </span>

        <div className="bg-[#0B131E] h-auto rounded-t-[30px] p-6 pb-1 min-full">
          <div className="h-auto text-center">
            <h1 className="text-center font-bold text-white text-2xl">
              Select Wallet
            </h1>
            <span className="text-center font-bold text-sm text-gray-400">
              Connect your wallet or Dapp on Asset Chain network or connect to
              TON network
            </span>

            <div>
              <div className="mt-6">
                {!disbleEvm && (
                  <>
                    {!processing && !evmConnected ? (
                      <span
                        onClick={connectEvmWallet}
                        className="bg-[#0049e7] flex mt-4 px-7 rounded-lg font-bold py-4 justify-between text-white"
                      >
                        <div className="flex text-center">
                          <Image
                            className="w-44"
                            src={assetChainLogo}
                            alt="spin"
                          />
                        </div>
                        <span className="mt-1 text-light text-xl">
                          <Image src={arrowRight} alt="" />
                        </span>
                      </span>
                    ) : (
                      <span className="flex flex-col items-center mt-4 font-bold text-center text-white">
                        {!evmConnected ? (
                          <>
                            <span className="relative bg-[#0049e7] rounded-full w-24 h-24 flex items-center justify-center">
                              <div className="spinning-gradient absolute inset-0 rounded-full z-0"></div>
                              <Image
                                className="relative w-24 h-24 object-contain z-10 rounded-full"
                                src={loadingImage}
                                alt=""
                              />
                            </span>
                            <span className="text-md font-bold text-center mt-4 text-gray-400">
                              {processing ? "Connecting" : "Asset Chain"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-center">
                              <Image
                                className="w-24 h-24 rounded-lg"
                                src={metamaskLogo}
                                alt=""
                              />
                            </span>
                            <span className="grid text-md font-bold text-center mt-4 text-gray-400">
                              <span className="text-sm font-light">
                                Metamask on Asset Chain
                              </span>
                              {evmAddress && addressEVM}
                            </span>
                          </>
                        )}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="mt-6 text-center">
                {!disableTon && (
                  <div>
                    {!tonConnected ? (
                      <span
                        // disabled={disableTon}
                        onClick={connectWallet}
                        className="flex flex-col items-center justify-center"
                      >
                        <Image
                          alt="tonimage"
                          src={tonlogo}
                          className="w-14 h-14 rounded-full"
                        />
                        <span className="font-bold text-md mt-2 text-white">
                          Ton
                        </span>
                      </span>
                    ) : (
                      <span
                        onClick={disconnectWallet}
                        className="flex flex-col items-center justify-center"
                      >
                        <Image
                          alt="tonimage"
                          src={tonlogo}
                          className="w-14 h-14 rounded-full"
                        />
                        <span className="font-bold text-sm mt-1 text-white">
                          {address || ""}
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {(!evmConnected || !tonConnected) && (
              <div className="mt-4 mb-2 border-t border-t-[#55687c] pb-1">
                <span className="text-xs font-bold text-[#55687c]">
                  AssetConnect is Asset Chain{"’"}s native wallet connection
                  toolkit designed to seamlessly link any wallet and DApp within
                  the Asset Chain ecosystem.
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-around w-auto">
            {/* {!disbleEvm && (
              <div>
                <button
                  disabled={disbleEvm}
                  onClick={connectEvmWallet}
                  className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
                >
                  <img
                    src="https://pbs.twimg.com/profile_images/1805286722768343041/IeuGAwF3_400x400.jpg"
                    alt="AssetChain"
                    className="w-8 h-8 mr-4 rounded-full"
                  />
                  {!evmConnected ? (
                    <span className="font-bold">
                      {processing ? "Connecting" : "Asset Chain"}
                    </span>
                  ) : (
                    <span className="font-bold">
                      {evmAddress && addressEVM}
                    </span>
                  )}
                </button>
              </div>
            )} */}

            {/* {!disableTon && (
              <div>
                {!tonConnected ? (
                  <div>
                    <button
                      disabled={disableTon}
                      onClick={connectWallet}
                      className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
                    >
                      <img
                        src="https://pbs.twimg.com/profile_images/1833486393823096832/N39rUf-e_400x400.png"
                        alt="TON"
                        className="w-8 h-8 mr-4 rounded-full"
                      />
                      <span className="font-bold">TON</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={disconnectWallet}
                      className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
                    >
                      <img
                        src="https://pbs.twimg.com/profile_images/1833486393823096832/N39rUf-e_400x400.png"
                        alt="TON"
                        className="w-8 h-8 mr-4 rounded-full"
                      />
                      <span className="font-bold">{address || ""}</span>
                    </button>
                  </div>
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectButton;
