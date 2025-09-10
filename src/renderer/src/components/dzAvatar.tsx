import AppUtils from '@renderer/helpers/appUtils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface IDzAvatar {
  fallbackLabel: string

  src?: any
  alt?: string
  className?: string
}

export default function DzAvatar({ fallbackLabel, alt = '', src = '', className = '' }: IDzAvatar) {
  return (
    <Avatar className={AppUtils.classNames('border', className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackLabel}</AvatarFallback>
    </Avatar>
  )
}
