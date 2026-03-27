import React from 'react'
interface ButtonProps {
   children:React.ReactNode;
   varient ?: "default" | "primary"
}
const Button = ({children , varient = "default"}:ButtonProps) => {
    const baseClass ="py-3 px-8 text-base font-medium rounded-lg shadow-sm transition transform hover:-translate-y-0.5"
   const varients = {
      default : "cursor-pointer  border border-transparent  text-white bg-blue-600 hover:bg-blue-700  ",
    primary: "bg-blue-500 text-white"
   }
  return (
   <button className={`${baseClass} ${varients[varient]} `}>
    {children}
   </button>
  )
}

export default Button