import React from 'react';
import { cn } from "@/lib/utils";

export interface DisplayContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function DisplayContainer({ 
  children, 
  className, 
  ...props 
}: DisplayContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/60 to-purple-50 text-foreground p-4 sm:p-8 overflow-hidden",
        "animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl" />
      </div>
      <div className="relative w-full">{children}</div>
    </div>
  );
}