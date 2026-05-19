const UpvoteCounter = () => {
  return (
   <header className="flex items-center justify-between px-4 py-4 bg-[#0a0a0a]">
      {/* Լոգո / Վերնագիր */}
      <div className="text-white text-xl font-bold tracking-wide">
        UniBoard
      </div>

      {/* Պրոֆիլի Ավատար (U տառով) */}
      <div className="flex items-center justify-center w-8 h-8 bg-[#007aff] rounded-full text-white text-sm font-semibold cursor-pointer hover:bg-blue-600 transition-colors">
        U
      </div>
    </header>
  )
}

export default UpvoteCounter


