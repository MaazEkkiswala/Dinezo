import { IconLoader2 } from '@tabler/icons-react'
import { Button } from './ui/button'
import { ComponentProps } from 'react'

interface IDzIconButton extends ComponentProps<'button'> {
  icon: React.ReactNode // JSX element
  onClick: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isLoading?: boolean
  isDisabled?: boolean
}

export default function DzIconButton({
  icon,
  onClick,
  isLoading = false,
  variant = 'outline',
  size = 'icon',
  isDisabled = false,
  className
}: IDzIconButton) {
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      variant={variant}
      size={size}
      className={`w-8 h-8 ${className ?? ''}`}
    >
      {isLoading ? <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> : icon}
    </Button>
  )
}
