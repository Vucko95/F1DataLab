"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // State to track if the client-side hydration is complete
  const [mounted, setMounted] = React.useState(false)

  // Use effect to set mounted to true once the component has been mounted on the client
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Only render the theme provider after client-side mount to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>  // Avoid rendering any theme-related class attributes on the server
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
