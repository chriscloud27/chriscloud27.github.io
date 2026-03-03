import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] font-mono text-[11.5px] tracking-[.07em] uppercase font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--cyan)] text-[var(--blue)] hover:bg-[var(--cyan-dim)] hover:-translate-y-0.5',
        ghost:
          'bg-transparent text-[var(--g300)] border border-white/15 hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:-translate-y-0.5',
        outline:
          'border border-[rgba(0,229,255,0.24)] text-[var(--cyan)] hover:bg-[rgba(0,229,255,0.06)] hover:border-[var(--cyan)] hover:-translate-y-0.5',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'px-[26px] py-[13px]',
        sm: 'px-[16px] py-[9px] text-[10px]',
        lg: 'px-[32px] py-[15px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
