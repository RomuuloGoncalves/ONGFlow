"use client"

import { CircleCheckIcon, XIcon } from "lucide-react"
import { toast } from "sonner"
import { useCallback } from "react"

import { Button } from "@/components/ui/button"

const useCustomToast = () => {
  const showToast = useCallback((message: string, type: "success" | "error") => {
    toast.custom((t) => (
      <div
        className={`w-full rounded-md border px-4 py-3 shadow-lg sm:w-[var(--width)] ${
          type === "success"
            ? "bg-green-200 border-green-400"
            : "bg-red-200 border-red-400"
        }`}
      >
        <div className="flex gap-2">
          <div className="flex grow gap-3">
            {type === "success" ? (
              <CircleCheckIcon
                className="mt-0.5 shrink-0 text-green-600"
                size={16}
                aria-hidden="true"
              />
            ) : (
              <XIcon
                className="mt-0.5 shrink-0 text-red-600"
                size={16}
                aria-hidden="true"
              />
            )}
            <div className="flex grow justify-between gap-12">
              <p
                className={`text-sm ${
                  type === "success" ? "text-green-900" : "text-red-900"
                }`}
              >
                {message}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className={`group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent ${
              type === "success" ? "text-green-900" : "text-red-900"
            }`}
            onClick={() => toast.dismiss(t)}
            aria-label="Close banner"
          >
            <XIcon
              size={16}
              className="opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    ))
  }, [])

  return { showToast }
}

export default useCustomToast
