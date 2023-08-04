import * as React from "react"

export type ButtonAProps = {
  children ?: React.ReactNode
}

export function ButtonA({children} : ButtonAProps) : JSX.Element {
  return <button type="button">
    {children}
    <style jsx>{`
      button {
        color: red;
      } 
    `}</style>
  </button>
}

export type ButtonBProps = {
  children ?: React.ReactNode
}

export function ButtonB({children} : ButtonBProps) : JSX.Element {
  return <button type="button">
    {children}
    <style jsx>{`
      button {
        color: orange;
      } 
    `}</style>
  </button>
}
