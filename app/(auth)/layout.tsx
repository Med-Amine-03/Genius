function AuthLayout({
    children,
}:{
    children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center bg-gray-800 h-full ">
      {children}
    </div>
  )
}

export default AuthLayout
