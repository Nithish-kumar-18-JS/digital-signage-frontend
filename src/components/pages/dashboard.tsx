'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
export const Dashboard = () => {
    const user = useSelector((state: RootState) => state.user)
    console.log(user)
    return (<main className="grid grid-cols-1 lg:grid-rows-2 gap-6 p-0 h-auto">
        {/* Header */}
        <header className="h-[58px] p-0">
            <h1 className="text-2xl font-bold pt-4 pl-2">Dashboard</h1>
        </header>

        {/* Main Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[56px]">
            {/* Column 1 */}
            <div className="grid grid-rows-2 gap-6">
                {/* Welcome Card */}
                <div className="flex flex-col justify-center items-start bg-red-400  p-8 rounded shadow-lg h-full">
                    <h2 className="text-xl font-bold mb-2">Hi, {user.firstName} {user.lastName}</h2>
                    <p className="text-lg">A fresh Dashboard greets you today!</p>
                </div>

                {/* Player Prompt Card */}
                <div className=" rounded-lg bg-slate-100 dark:bg-slate-800 shadow-lg p-8 flex flex-col justify-center h-full">
                <h3 className="text-lg font-bold text-black mb-4 dark:text-white">Get started with a player for your screens</h3>
                
                <p className="mb-2 font-bold text-green-600 dark:text-green-500">I need a player</p>
                <p className="mb-2 bg-slate-100 p-2 rounded dark:bg-slate-800 dark:text-white">
                    Use our open-source player to stream content to any compatible device.
                </p>
                <p className="mb-4 bg-slate-100 p-2 rounded dark:bg-slate-800 dark:text-white">
                    Self-host or deploy using Docker, Raspberry Pi, or your preferred stack.
                </p>

                <p className="mb-2 font-bold text-green-600">I have a player</p>
                <p className="bg-slate-100 p-2 rounded dark:bg-slate-800 dark:text-white">
                    Add your screen to start registering and managing your device via the dashboard.
                </p>
                </div>

            </div>

            {/* Column 2 */}
            <div className="grid grid-rows-1 lg:grid-rows-2 gap-6">
                {/* Screen Status Card */}
                <div className=" rounded shadow-lg p-8 flex flex-col h-full dark:bg-slate-800 dark:text-white">
                    <h3 className="text-lg font-bold mb-6 dark:text-white">Screen Status</h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {[
                            { label: 'Online', value: 1 },
                            { label: 'Offline', value: 1 },
                            { label: 'Registered', value: 1 },
                            { label: 'Unregistered', value: 1 },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-slate-100 rounded p-4 flex flex-col items-center justify-center dark:bg-slate-800 dark:text-white">
                                <span className="text-lg font-bold dark:text-white">{label}</span>
                                <span className="text-xl font-bold dark:text-white">{value}</span>
                            </div>
                        ))}
                    </div>

                    <button className="text-red-500 font-bold text-left">Manage Screens</button>
                </div>
            </div>

            {/* Column 3 - Screen Location */}
            <div className=" rounded shadow-lg flex flex-col h-150 dark:bg-slate-800 dark:text-white">
                <div className="p-8 flex flex-col h-full">
                    <h3 className="text-lg font-bold mb-4 dark:text-white">Screen Location</h3>
                    <div className="flex-1 bg-amber-400 da rounded  dark:text-white"></div>
                </div>
            </div>
        </section>
    </main>)
}