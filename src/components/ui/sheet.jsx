"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Root Sheet component that renders the sheet container and forwards all props to it.
 *
 * @param {Object} props - Props to pass to the sheet root; all properties are forwarded to the underlying element.
 * @returns {import('react').ReactElement} A React element representing the sheet root.
 */
function Sheet({
  ...props
}) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * Render a Sheet trigger element and forward all received props to it.
 * @param {object} props - Props to be passed through to the trigger element.
 * @returns {JSX.Element} A React element representing the sheet trigger.
 */
function SheetTrigger({
  ...props
}) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * Renders the sheet's close control and forwards props to the underlying Radix Close primitive.
 * @param {object} props - Props passed to the underlying Close component (e.g., event handlers, className, accessibility attributes).
 * @returns {JSX.Element} The Sheet close element.
 */
function SheetClose({
  ...props
}) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * Render a portal element for sheet content and forward all given props.
 * @param {object} props - Props passed through to the portal element (including children and DOM attributes).
 * @returns {JSX.Element} The sheet portal element that mounts its children into a React portal.
 */
function SheetPortal({
  ...props
}) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * Render the sheet backdrop overlay with built-in visibility and entrance/exit animations.
 *
 * @param {string} [className] - Additional CSS classes to merge with the component's default classes.
 * @param {...any} props - Additional props are forwarded to the underlying Radix Overlay component.
 * @returns {JSX.Element} A React element representing the sheet overlay/backdrop.
 */
function SheetOverlay({
  className,
  ...props
}) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props} />
  );
}

/**
 * Renders the sheet's content panel inside a portal with an overlay, slide-in animations, and an internal close control.
 *
 * The panel supports four entry sides and applies side-specific sizing, positioning, and enter/exit animations. It also
 * includes an accessible close button positioned in the top-right of the panel.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes to apply to the content panel.
 * @param {import('react').ReactNode} [props.children] - Content to render inside the sheet panel.
 * @param {'right'|'left'|'top'|'bottom'} [props.side="right"] - Side from which the sheet enters and exits.
 * @returns {import('react').JSX.Element} The rendered sheet content wrapped in a portal and overlay.
 */
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}>
        {children}
        <SheetPrimitive.Close
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * Renders a sheet header container with default padding and vertical spacing.
 * @param {Object} props - Props passed to the header element.
 * @param {string} [props.className] - Additional CSS classes merged with the default header classes.
 * @returns {JSX.Element} A div with data-slot="sheet-header" configured for header layout.
 */
function SheetHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props} />
  );
}

/**
 * Footer container for a sheet that sticks to the bottom and provides consistent padding and gap.
 *
 * @param {string} [className] - Additional CSS classes to apply to the footer container.
 * @param {object} [props] - Additional props forwarded to the container element.
 * @returns {JSX.Element} The rendered footer element for the sheet.
 */
function SheetFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props} />
  );
}

/**
 * Renders a styled title element for a Sheet.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to merge with the component's default title styles.
 * @returns {JSX.Element} A React element rendering the sheet title with default typography and any provided classes.
 */
function SheetTitle({
  className,
  ...props
}) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props} />
  );
}

/**
 * Render a sheet description element with muted small text styling and forwarded props.
 * @param {object} props - Props passed to the component.
 * @param {string} [props.className] - Additional CSS classes to append to the default styling.
 * @returns {JSX.Element} The rendered sheet description element.
 */
function SheetDescription({
  className,
  ...props
}) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}