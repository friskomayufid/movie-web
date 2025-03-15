import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: React.MouseEventHandler
  className?: string
}

const Button = ({ children, onClick, className = '', ...props }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
