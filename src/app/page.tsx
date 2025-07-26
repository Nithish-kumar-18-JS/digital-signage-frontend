export default function Home() {
  return (
    // Container
   <main className="grid grid-cols-1 lg:grid-rows-2 gap-6 h-auto">
     <div className="h-[58px] p-2">
      <h1 className="text-2xl font-bold pt-4 pl-2">Dashboard</h1>
     </div>
     {/* Main grid */}
     <div className="grid grid-cols-1 h-[58px] lg:grid-cols-3 gap-14 p-4">
      {/* Column 1 */}
      <div className="grid grid-rows-1 h-150 max-sm:h-170 max-md:h-170 max-lg:h-160 lg:grid-rows-2 gap-6 ">
        <div className="flex h-72 text-white flex-col items-start justify-center h-50 w-full bg-red-400 p-8 rounded shadow-2xl">
          <p className="text-2xl font-bold">Hi , Nithish</p>
          <p className="text-lg">A fresh Dashboard greets you today!</p>
        </div>
        <div className="h-80 max-sm:h-90 max-md:h-90 w-full p-8 pb-16 max-sm:pt-16-4 max-md:pt-16 flex flex-col items-start justify-center rounded-lg shadow-2xl bg-white">
          <p className="text-lg max-sm:text-base max-md:text-base font-bold text-black mb-4 mt-8">Start with a player for your screens</p>
          <p className="mb-4 font-bold text-red-500">I need a player</p>
          <p className="mb-2 bg-slate-100 p-2 rounded">Subscribe to our Annual Plan & get FREE Yodeck Players for all your screens!</p>
          <p className="mb-4 bg-slate-100 p-2 rounded">Buy a Yodeck Player from $79.</p>
          <p className="mb-2 font-bold text-red-500">I have a player</p>
          <p className="mb-2 bg-slate-100 p-2 rounded">Add Screen to register your device.</p>
        </div>
      </div>

      {/* Column 2 */}
      <div className="grid grid-rows-1 h-150 max-sm:h-189 max-md:h-189 lg:grid-rows-2 gap-6 ">
        <div className="h-158 max-sm:h-189 max-md:h-189 w-full bg-white rounded shadow-2xl p-8 max-sm:p-6 max-md:p-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="h-10 w-full  rounded p-8 flex items-start justify-start">
              <p className="text-lg font-bold">Screen Status</p>
            </div>
            <div className="h-70 w-full rounded p-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="h-30 w-full bg-slate-100 rounded p-8 flex items-center justify-center flex-col">
                <p className="text-lg font-bold">Online</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="h-30 w-full bg-slate-100 rounded p-8 flex items-center justify-center flex-col">
                <p className="text-lg font-bold">Offline</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="h-30 w-full bg-slate-100 rounded p-8 flex items-center justify-center flex-col">
                <p className="text-lg font-bold">Registered</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="h-30 w-full bg-slate-100 rounded p-8 flex items-center justify-center flex-col">
                <p className="text-lg font-bold">Unregistered</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
            <div className="h-50 max-sm:h-85 max-md:h-85 w-full rounded p-8 flex items-end justify-start">
              <p className="text-lg font-bold text-red-500">Manage Screens</p>
            </div>
          </div>
        </div>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col h-158 bg-white rounded shadow-2xl">
        <div className="h-full w-full p-8">
          <p className="text-lg font-bold p-4">Screen Location</p>
          <div className="flex-1 bg-amber-400 rounded h-130"></div>
        </div>
      </div>
     </div>
   </main>
  );
}