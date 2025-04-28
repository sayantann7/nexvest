import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../components/ui/toggle-group";

export const ShadowSection: React.FC = () => {
  // Investment options data
  const quickAddOptions = [
    { value: 500, label: "+ ₹500" },
    { value: 1000, label: "+ ₹1,000" },
    { value: 5000, label: "+ ₹5,000" },
    { value: 10000, label: "+ ₹10,000" },
  ];

  // Year markers for the chart
  const yearMarkers = ["1yr", "5yrs", "10yrs", "15yrs", "20yrs"];

  return (
    React.createElement(
      Card,
      { className: "w-full max-w-[414px] mx-auto bg-app-primary rounded-[8.8px] shadow-glow-effect" },
      React.createElement(
        CardContent,
        { className: "p-6" },
        // Investment Type Toggle
        React.createElement(
          "div",
          { className: "flex justify-center mb-6" },
          React.createElement(
            ToggleGroup,
            {
              type: "single",
              defaultValue: "monthly",
              className: "h-[31px] rounded-[33px] border-[1.1px] border-solid border-[#00000033] overflow-hidden",
            },
            React.createElement(
              ToggleGroupItem,
              {
                value: "monthly",
                className: "w-[102px] h-[29px] rounded-[19.8px_0px_0px_19.8px] data-[state=on]:bg-[#0d0c34] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-[#666666]",
              },
              React.createElement("span", { className: "text-xs font-normal" }, "Monthly SIP")
            ),
            React.createElement(
              ToggleGroupItem,
              {
                value: "lumpsum",
                className: "w-[102px] h-[29px] rounded-[0px_19.8px_19.8px_0px] data-[state=on]:bg-[#0d0c34] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-[#666666]",
              },
              React.createElement("span", { className: "text-[12.2px] font-normal" }, "Lumpsum")
            )
          )
        ),
        // Investment Amount Label
        React.createElement(
          "div",
          { className: "text-center mb-4" },
          React.createElement(
            "p",
            { className: "[font-family:'Inter',Helvetica] font-normal text-[#222222] text-[14.2px] leading-[19.8px]" },
            "Amount you want to invest"
          )
        ),
        // Investment Amount Input
        React.createElement(
          "div",
          { className: "mb-6" },
          React.createElement(
            "div",
            { className: "relative flex items-center justify-center border-b-[1.1px] border-[#efefef] pb-1" },
            React.createElement(
              "span",
              { className: "absolute left-[94px] [font-family:'Inter',Helvetica] font-normal text-[#666666] text-[24.2px] leading-[29.7px]" },
              "₹"
            ),
            React.createElement(Input, {
              type: "text",
              defaultValue: "10000",
              className: "w-[71px] h-7 mx-auto pl-8 border-none text-center [font-family:'Inter',Helvetica] font-bold text-[#222222] text-[21.9px] leading-[29.7px] focus-visible:ring-0 focus-visible:ring-offset-0",
            })
          )
        ),
        // Quick Add Buttons
        React.createElement(
          "div",
          { className: "flex justify-center gap-1 mb-6" },
          quickAddOptions.map((option) =>
            React.createElement(
              Button,
              {
                key: option.value,
                className: "h-7 px-2.5 rounded-[33px] border-[1.1px] border-[#dddddd] bg-white hover:bg-gray-50",
              },
              React.createElement(
                "span",
                { className: "[font-family:'Inter',Helvetica] font-normal text-[#9a9a9a] text-[12.2px] leading-[16.5px]" },
                option.label
              )
            )
          )
        ),
        // Chart Section
        React.createElement(
          "div",
          { className: "relative mb-6 h-[140px] bg-[url(/vector.svg)] bg-[100%_100%]" },
          React.createElement(
            "div",
            { className: "absolute top-0 left-0" },
            React.createElement(
              "p",
              { className: "[font-family:'Poppins',Helvetica] font-normal text-[#9a9a9a] text-[15.4px] leading-normal" },
              "Est. returns after 20 years"
            ),
            React.createElement(
              "p",
              { className: "[font-family:'Poppins',Helvetica] font-semibold text-[#03d000] text-[24.2px] leading-normal mt-1" },
              "₹99,91,480"
            )
          ),
          React.createElement("div", {
            className: "absolute w-full h-full top-0 left-0 bg-[url(/clip-path-group.png)] bg-[100%_100%]",
          }),
          React.createElement(
            "div",
            { className: "absolute bottom-[-24px] left-4 right-4 flex justify-between" },
            yearMarkers.map((year, index) =>
              React.createElement(
                "span",
                {
                  key: index,
                  className: "[font-family:'Inter',Helvetica] font-normal text-[#9a9a9a] text-[13.2px] text-center",
                },
                year
              )
            )
          )
        ),
        // CTA Button
        React.createElement(
          Button,
          { className: "w-full h-10 mt-6 bg-[#0d0c34] hover:bg-[#1a1956] text-white rounded-[19.8px]" },
          React.createElement(
            "span",
            { className: "[font-family:'Inter',Helvetica] font-semibold text-[14.1px] leading-[26.4px]" },
            "Check out top performing funds"
          )
        ),
        // Disclaimer
        React.createElement(
          "p",
          { className: "mt-4 [font-family:'Inter',Helvetica] font-normal text-[#9a9a9a] text-[12.2px] text-center leading-[17.6px]" },
          "Note: This calculation is based on a projected annual return",
          React.createElement("br"),
          "rate with return of 12%. Installment frequency monthly."
        )
      )
    )
  );
};
