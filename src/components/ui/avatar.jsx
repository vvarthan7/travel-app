"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Render an avatar wrapper using Radix UI's Avatar.Root with base styling and an optional className.
 *
 * @param {string} [className] - Additional CSS classes to merge with the component's default classes.
 * @param {Object} [props] - Additional props forwarded to Radix Avatar.Root (e.g., id, style, aria attributes, children).
 * @returns {JSX.Element} The rendered Avatar.Root element with merged classes and forwarded props.
 */
function Avatar({
  className,
  ...props
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props} />
  );
}

/**
 * Render an avatar image element with merged class names and a `data-slot` of "avatar-image".
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional CSS class names appended to the default image classes.
 * @returns {JSX.Element} The rendered Avatar.Image element.
 */
function AvatarImage({
  className,
  ...props
}) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props} />
  );
}

/**
 * Renders an avatar fallback element displayed when an avatar image is unavailable.
 * @param {string} [className] - Additional CSS class names to merge with the component's default classes.
 * @param {Object} [props] - Additional props forwarded to the underlying Radix Avatar.Fallback element.
 * @returns {JSX.Element} The rendered Avatar.Fallback element with composed classes and a `data-slot="avatar-fallback"` attribute.
 */
function AvatarFallback({
  className,
  ...props
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props} />
  );
}

export { Avatar, AvatarImage, AvatarFallback }