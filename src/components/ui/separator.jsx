"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Render a horizontal or vertical separator element.
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes applied to the root element.
 * @param {'horizontal'|'vertical'} [props.orientation="horizontal"] - Orientation of the separator; "horizontal" renders a full-width 1px horizontal line, "vertical" renders a full-height 1px vertical line.
 * @param {boolean} [props.decorative=true] - Whether the separator is decorative; passed through to the underlying element.
 * @param {Object} [props.rest] - Additional props forwarded to the underlying separator element.
 * @returns {import('react').ReactElement} A React element representing the separator.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props} />
  );
}

export { Separator }