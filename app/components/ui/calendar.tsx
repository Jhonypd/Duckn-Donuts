"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "~/utils/cn"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "w-full",
        months: "flex flex-col gap-4",
        month: "space-y-4",
        month_caption: "flex items-center justify-between px-1",
        caption_label: "text-dn-cocoa text-sm font-semibold",
        dropdowns: "flex items-center gap-2",
        dropdown_root: "relative",
        dropdown:
          "border-dn-cream-border bg-dn-cream text-dn-cocoa rounded-lg border px-2 py-1 text-xs font-semibold",
        months_dropdown: "me-1",
        years_dropdown: "ms-1",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "text-dn-cocoa h-7 w-7 rounded-full p-0 hover:bg-dn-cream-border",
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "text-dn-cocoa h-7 w-7 rounded-full p-0 hover:bg-dn-cream-border",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-dn-mist w-9 text-[11px] font-semibold uppercase",
        weeks: "flex flex-col gap-1.5",
        week: "flex w-full",
        day: "text-center text-sm",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "text-dn-cocoa h-9 w-9 rounded-full p-0 text-sm font-semibold hover:bg-dn-cream-border",
        ),
        selected:
          "bg-dn-caramel text-dn-caramel-deep hover:bg-dn-caramel hover:text-dn-caramel-deep focus:bg-dn-caramel",
        today: "border-dn-caramel text-dn-caramel-deep border",
        outside: "text-dn-mist opacity-45",
        disabled: "text-dn-mist opacity-40",
        range_middle: "bg-dn-cream",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
