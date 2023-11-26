import React from "react";

interface Props {
    onClick?: () => void;
}

//  export const SearchIcon = <PROPS extends Props & React.HTMLAttributes<any>,>({ props }: PROPS): JSX.Element => {
//     console.log(some)
//     return (
//       <div { ...rest} />
//     )
//   }

export const SearchIcon = <PROPS extends Props & React.HTMLAttributes<any>,>( props : PROPS): JSX.Element => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="0.8em"
    role="presentation"
    viewBox="0 0 24 24"
    width="0.7em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);