import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: "bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500",
      secondary: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500",
      outline: "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white focus:ring-slate-500",
      ghost: "text-slate-400 hover:bg-slate-800 hover:text-white focus:ring-slate-500",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    }

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10"
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }