function ChatTopBar() {
  return (
    <div className="border-b flex px-6 py-2 items-center flex-none">
      <div className="flex flex-col">
        <h3 className="text-grey-darkest mb-1 font-extrabold">#general</h3>
        <div className="text-grey-dark text-sm truncate">
          If his destiny be strange, it is also sublime.
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <div className="relative">
          <input type="search" placeholder="Search"
                 className="appearance-none border border-grey rounded-lg pl-8 pr-4 py-2" />
            <div className="absolute pin-y pin-l pl-3 flex items-center justify-center" style={{ top: 13 }}>
              <svg className="fill-current text-grey h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 20 20">
                <path
                  d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
              </svg>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChatTopBar;
