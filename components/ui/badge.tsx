import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-[3px] border px-[10px] py-[4px] font-mono text-[10px] tracking-[.06em] uppercase transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-[rgba(0,229,255,.14)] bg-[rgba(0,229,255,.06)] text-[var(--cyan-dim)]',
        secondary:
          'border-white/[.07] bg-white/[.04] text-[var(--g500)]',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
