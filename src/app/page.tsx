export default function Home() {
  return (
    <main className="grid grid-cols-1 lg:grid-rows-2 gap-6 p-4 h-auto">
      {/* Header */}
      <header className="h-[58px] p-2">
        <h1 className="text-2xl font-bold pt-4 pl-2">Dashboard</h1>
      </header>

      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[56px]">
        {/* Column 1 */}
        <div className="grid grid-rows-2 gap-6">
          {/* Welcome Card */}
          <div className="flex flex-col justify-center items-start bg-red-400 text-white p-8 rounded shadow-lg h-full">
            <h2 className="text-2xl font-bold mb-2">Hi, Nithish</h2>
            <p className="text-lg">A fresh Dashboard greets you today!</p>
          </div>

          {/* Player Prompt Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center h-full">
            <h3 className="text-lg font-bold text-black mb-4">Start with a player for your screens</h3>
            <p className="mb-2 font-bold text-red-500">I need a player</p>
            <p className="mb-2 bg-slate-100 p-2 rounded">Subscribe to our Annual Plan & get FREE Yodeck Players for all your screens!</p>
            <p className="mb-4 bg-slate-100 p-2 rounded">Buy a Yodeck Player from $79.</p>
            <p className="mb-2 font-bold text-red-500">I have a player</p>
            <p className="bg-slate-100 p-2 rounded">Add Screen to register your device.</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="grid grid-rows-1 lg:grid-rows-2 gap-6">
          {/* Screen Status Card */}
          <div className="bg-white rounded shadow-lg p-8 flex flex-col h-full">
            <h3 className="text-lg font-bold mb-6">Screen Status</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Online', value: 1 },
                { label: 'Offline', value: 1 },
                { label: 'Registered', value: 1 },
                { label: 'Unregistered', value: 1 },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-100 rounded p-4 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{label}</span>
                  <span className="text-2xl font-bold">{value}</span>
                </div>
              ))}
            </div>

            <button className="text-red-500 font-bold text-left">Manage Screens</button>
          </div>
        </div>

        {/* Column 3 - Screen Location */}
        <div className="bg-white rounded shadow-lg flex flex-col h-full">
          <div className="p-8 flex flex-col h-full">
            <h3 className="text-lg font-bold mb-4">Screen Location</h3>
            <div className="flex-1 bg-amber-400 rounded"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
