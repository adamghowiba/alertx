'use client'

import { Alert, AlertJsx } from "alertx";


export default function Home() {
  return (
    <main>
      <Alert message="Alert with Styled Components" />
      <AlertJsx message="Alert with styled jsx" />


      <h1>Hello</h1>
    </main>
  );
}
