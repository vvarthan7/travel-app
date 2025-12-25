import { cn } from "@/lib/utils"

/**
 * Renders a rounded, pulsing skeleton placeholder element.
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes to merge with the base skeleton styles.
 * @param {...any} [props.*] - Props forwarded to the rendered div.
 * @returns {JSX.Element} The skeleton div element.
 */
function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }