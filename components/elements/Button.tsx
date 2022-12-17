const Button = ({ label, handleClick, isLoading }: any) => {
  return (
    <button
      className={`mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none ${
        isLoading ? 'hidden' : ''
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}

export default Button
