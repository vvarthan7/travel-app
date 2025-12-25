"use client";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = React.createContext(null)

/**
 * Accesses the current sidebar context provided by SidebarProvider.
 *
 * @returns {object} The sidebar context value containing state, open flags, and action functions (e.g., `state`, `open`, `setOpen`, `isMobile`, `openMobile`, `setOpenMobile`, `toggleSidebar`).
 * @throws {Error} If called outside of a SidebarProvider.
 */
function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

/**
 * Provides sidebar state and controls to descendants and renders the sidebar wrapper.
 *
 * Persists open state to a cookie and registers a keyboard shortcut (Ctrl/Cmd+B) to toggle the sidebar.
 *
 * @param {object} props - Component props.
 * @param {boolean} [props.defaultOpen=true] - Initial open state when uncontrolled.
 * @param {boolean} [props.open] - Controlled open state; when provided, the component is controlled.
 * @param {(open:boolean) => void} [props.onOpenChange] - Callback invoked when the open state changes.
 * @param {string} [props.className] - Additional class names applied to the wrapper element.
 * @param {Object} [props.style] - Inline styles applied to the wrapper; CSS variables for sidebar widths are merged.
 * @param {React.ReactNode} [props.children] - Children rendered inside the provider.
 * @returns {JSX.Element} The provider element that supplies sidebar context and renders its children.
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value
    if (setOpenProp) {
      setOpenProp(openState)
    } else {
      _setOpen(openState)
    }

    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }, [setOpenProp, open])

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar])

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style
            }
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}>
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

/**
 * Render a responsive, collapsible sidebar that adapts between desktop and mobile layouts.
 *
 * Supports fixed desktop layout with optional collapsible states and a mobile sheet drawer.
 *
 * @param {Object} props - Component props.
 * @param {'left'|'right'} [props.side='left'] - Side of the screen where the sidebar is positioned.
 * @param {'sidebar'|'floating'|'inset'} [props.variant='sidebar'] - Visual/layout variant that affects padding, borders, and shadow.
 * @param {'offcanvas'|'icon'|'none'} [props.collapsible='offcanvas'] - Collapsibility mode; use "none" to render a non-collapsible fixed sidebar.
 * @param {string} [props.className] - Additional className applied to the container element.
 * @param {import('react').ReactNode} [props.children] - Child nodes rendered inside the sidebar.
 * @returns {JSX.Element} The rendered sidebar element (desktop layout, mobile sheet, or static container depending on props and viewport).
 */
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        )}
        {...props}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE
            }
          }
          side={side}>
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar">
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )} />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}>
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a compact trigger button that toggles the sidebar open state.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional classes applied to the button.
 * @param {(event: import('react').MouseEvent) => void} [props.onClick] - Optional click handler invoked before the sidebar is toggled.
 * @returns {JSX.Element} The sidebar toggle button element.
 */
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}>
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

/**
 * Renders the sidebar rail toggle control.
 *
 * This component outputs a decorative, accessible button positioned alongside the sidebar
 * that invokes the sidebar toggle action from context when clicked.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional CSS class names applied to the button.
 * @returns {JSX.Element} The sidebar rail button element.
 */
function SidebarRail({
  className,
  ...props
}) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props} />
  );
}

/**
 * Render a responsive inset container for main content when the sidebar uses the inset variant.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to apply to the main inset container.
 * @returns {JSX.Element} A <main> element used as the inset content area; all other props are forwarded to the element.
 */
function SidebarInset({
  className,
  ...props
}) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props} />
  );
}

/**
 * Render an Input pre-styled for use inside the sidebar.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to merge with the component's base styles.
 * @returns {JSX.Element} The styled Input element configured for sidebar placement.
 */
function SidebarInput({
  className,
  ...props
}) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props} />
  );
}

/**
 * Renders a styled container intended to be used as the sidebar header.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes applied to the header container.
 * @returns {JSX.Element} The sidebar header element.
 */
function SidebarHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props} />
  );
}

/**
 * Renders a styled container for the sidebar footer.
 * @param {string} [className] - Additional class names to apply to the footer container.
 * @param {Object} [props] - Additional HTML attributes forwarded to the root `div`.
 * @returns {JSX.Element} The rendered footer container element.
 */
function SidebarFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props} />
  );
}

/**
 * Render a themed sidebar separator element.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to apply to the separator.
 * @returns {JSX.Element} The Separator element configured for the sidebar.
 */
function SidebarSeparator({
  className,
  ...props
}) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props} />
  );
}

/**
 * Renders the scrollable content area for a sidebar.
 *
 * The root element includes data attributes for slotning and variant-aware styling, exposes a `className` prop to extend or override default layout and overflow styles, and forwards any additional props to the container div.
 *
 * @param {object} props - Props forwarded to the root div.
 * @param {string} [props.className] - Additional class names to apply to the container.
 * @returns {JSX.Element} A div element that serves as the sidebar's content container. */
function SidebarContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props} />
  );
}

/**
 * Renders a container that groups related sidebar items.
 *
 * The element includes data attributes (`data-slot="sidebar-group"` and `data-sidebar="group"`)
 * used for styling and layout, and forwards any additional props to the underlying div.
 *
 * @param {object} props - Props passed to the component.
 * @param {string} [props.className] - Additional CSS classes to apply to the container.
 * @returns {JSX.Element} The sidebar group wrapper element.
 */
function SidebarGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props} />
  );
}

/**
 * Renders a styled label for a sidebar group and optionally delegates rendering to a child element.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes applied to the label container.
 * @param {boolean} [props.asChild=false] - When true, renders a `Slot` so the caller can provide the actual element; otherwise renders a `div`.
 * @returns {import('react').ReactElement} A React element representing the sidebar group label.
 */
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props} />
  );
}

/**
 * Renders an action control positioned for a sidebar group that can be rendered either as a native button or as a provided child element.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes applied to the control.
 * @param {boolean} [props.asChild=false] - When true, renders the control using a Slot wrapper so the caller's element receives the control behavior and attributes.
 * @param {...any} [props] - Additional props are forwarded to the rendered element (e.g., event handlers, aria attributes).
 * @returns {JSX.Element} The rendered sidebar group action element.
 */
function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props} />
  );
}

/**
 * Renders the content container for a sidebar group.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to apply to the container.
 * @returns {JSX.Element} A div element that serves as the sidebar group's content area. Additional props are forwarded to the underlying div.
 */
function SidebarGroupContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props} />
  );
}

/**
 * Render a vertical list container for sidebar menu items.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names to apply to the root `ul`.
 * @returns {JSX.Element} A `ul` element used as the sidebar menu container with layout and data attributes applied.
 */
function SidebarMenu({
  className,
  ...props
}) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props} />
  );
}

/**
 * Renders a sidebar menu list item (<li>) with default data attributes and base classes, forwarding additional props to the element.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to merge with the component's base classes.
 * @returns {JSX.Element} The rendered `<li>` element for a sidebar menu item.
 */
function SidebarMenuItem({
  className,
  ...props
}) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props} />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Render a sidebar menu button with configurable variant, size, active state, and optional tooltip.
 *
 * @param {Object} props - Component props.
 * @param {boolean} [props.asChild=false] - If true, renders a Slot instead of a native button to allow custom child elements.
 * @param {boolean} [props.isActive=false] - Marks the button as active (affects data attributes and styling).
 * @param {"default"|"ghost"|"secondary"} [props.variant="default"] - Visual variant for the button (controls computed classes).
 * @param {"default"|"sm"|"lg"} [props.size="default"] - Size variant for the button (controls computed classes).
 * @param {string|Object} [props.tooltip] - Tooltip content or props. If a string, it is used as the tooltip text; if an object, its properties are forwarded to the TooltipContent.
 * @param {string} [props.className] - Additional class names applied to the button.
 * @param {...any} [props.props] - Additional props forwarded to the underlying element (button or Slot).
 * @returns {JSX.Element} A React element for the menu button; when `tooltip` is provided, the button is wrapped in a Tooltip.
 */
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props} />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip} />
    </Tooltip>
  );
}

/**
 * Renders a positioned action control for a sidebar menu item.
 *
 * The control is placed at the top-right of a menu item, supports rendering as a Slot when `asChild`
 * is true, and can be configured to only become visible on hover/active states via `showOnHover`.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes applied to the control.
 * @param {boolean} [props.asChild=false] - Render a Slot instead of a native `button`, allowing consumers to provide the element.
 * @param {boolean} [props.showOnHover=false] - When true, hides the control by default and reveals it on hover/active/focus states.
 * @returns {JSX.Element} The menu action element (button or Slot) ready to receive event handlers and children.
 */
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props} />
  );
}

/**
 * Renders a small positioned badge for a sidebar menu item.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes to apply to the badge container.
 * @param {...any} [props] - Additional attributes forwarded to the badge's div element.
 * @returns {JSX.Element} The badge element to display alongside a sidebar menu item.
 */
function SidebarMenuBadge({
  className,
  ...props
}) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props} />
  );
}

/**
 * Render a skeleton placeholder for a sidebar menu item.
 *
 * @param {object} params - Component props.
 * @param {string} [params.className] - Additional CSS classes to apply to the root container.
 * @param {boolean} [params.showIcon=false] - Include a square icon placeholder when true.
 * @param {object} [params.props] - Additional props forwarded to the root div.
 * @returns {JSX.Element} A JSX element representing the sidebar menu item skeleton.
 */
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}>
      {showIcon && (
        <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width
          }
        } />
    </div>
  );
}

/**
 * Render a nested submenu list for the sidebar with built-in layout and collapse-aware styling.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Additional class names to apply to the root <ul>.
 * @param {import('react').HTMLAttributes<HTMLUListElement>} [props...] - All other props are forwarded to the underlying <ul> element.
 * @returns {JSX.Element} A JSX <ul> element representing a nested sidebar sub-menu.
 */
function SidebarMenuSub({
  className,
  ...props
}) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props} />
  );
}

/**
 * Render a list item that represents a sidebar sub-menu item.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional CSS classes applied to the list item.
 * @param {...any} [props.rest] - Additional props are forwarded to the underlying `li` element.
 * @returns {JSX.Element} The rendered `li` element for a sidebar sub-menu item.
 */
function SidebarMenuSubItem({
  className,
  ...props
}) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props} />
  );
}

/**
 * Render a sidebar sub-menu button used for nested menu items, optionally rendering a provided child element instead of an anchor.
 *
 * @param {Object} props - Component props.
 * @param {boolean} [props.asChild=false] - If true, render the provided child via Slot instead of an `<a>` element.
 * @param {"sm"|"md"} [props.size="md"] - Size variant that adjusts typography and spacing.
 * @param {boolean} [props.isActive=false] - When true, apply active styling.
 * @param {string} [props.className] - Additional CSS classes applied to the root element.
 * @returns {JSX.Element} The rendered sub-menu button element. */
function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props} />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}