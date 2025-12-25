"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * Provides tooltip configuration (delay) and wraps Radix tooltip provider.
 *
 * @param {Object} props - Component props.
 * @param {number} [props.delayDuration=0] - Delay in milliseconds before showing or hiding tooltips.
 * @returns {JSX.Element} The Tooltip provider element.
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return (<TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />);
}

/**
 * High-level wrapper that renders a tooltip root inside a TooltipProvider.
 *
 * @param {Object} props - Props to pass through to the underlying tooltip root element.
 * @returns {JSX.Element} The rendered tooltip element.
 */
function Tooltip({
  ...props
}) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * Renders an element that activates a tooltip and forwards all received props to the underlying trigger.
 * @param {object} props - Props passed to the underlying Tooltip trigger (attributes, event handlers, children, etc.).
 * @returns {JSX.Element} The tooltip trigger element.
 */
function TooltipTrigger({
  ...props
}) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/**
 * Renders tooltip content inside a portal with animated appearance, positioning, and an attached arrow.
 *
 * @param {string} [className] - Additional CSS classes applied to the content container.
 * @param {number} [sideOffset=0] - Distance in pixels between the tooltip content and its trigger along the chosen side.
 * @param {import('react').ReactNode} children - Content to display inside the tooltip.
 * @returns {import('react').ReactElement} A React element containing the tooltip content wrapped in a portal, including visual styling and an arrow.
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}>
        {children}
        <TooltipPrimitive.Arrow
          className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }