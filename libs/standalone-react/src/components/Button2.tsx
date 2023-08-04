import * as React from "react"

export type Button2Props = {
  children ?: React.ReactNode
}

export function Button2({children} : Button2Props) : JSX.Element {
  return <button type="button">
    {children}
    <style jsx>{`
      button {
        color: blue;
      } 
    `}</style>
  </button>
}
