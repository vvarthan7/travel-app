import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Determine whether the current viewport width is considered mobile.
 *
 * @returns {boolean} `true` if the viewport width is less than MOBILE_BREAKPOINT, `false` otherwise. The hook coerces its internal state so it returns `false` until the viewport width has been measured. 
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}