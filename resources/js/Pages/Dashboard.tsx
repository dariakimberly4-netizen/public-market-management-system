import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const modules = [
    { label: "Stallholders", subtitle: "Profiles & records", icon: "solar:users-group-rounded-bold-duotone", routeName: "tenants.index", accent: "from-blue-500 to-blue-700" },
    { label: "Stall Map", subtitle: "Interactive layout", icon: "solar:map-point-bold-duotone", routeName: "layouts.mapper", accent: "from-violet-500 to-violet-700" },
    { label: "Lease Management", subtitle: "Contracts & renewals", icon: "solar:document-text-bold-duotone", routeName: "contracts.index", accent: "from-cyan-500 to-cyan-700" },
    { label: "Collections", subtitle: "Payments & receipts", icon: "solar:wallet-money-bold-duotone", routeName: "payments.index", accent: "from-emerald-500 to-emerald-700" },
    { label: "Violations", subtitle: "Penalties & actions", icon: "solar:danger-triangle-bold-duotone", routeName: "penalties.index", accent: "from-rose-500 to-rose-700" },
    { label: "Inspections", subtitle: "Safety & compliance", icon: "solar:clipboard-check-bold-duotone", href: "/inspections", accent: "from-amber-500 to-orange-600", isNew: true },
    { label: "Vacant Stalls", subtitle: "Availability & status", icon: "solar:shop-2-bold-duotone", routeName: "stalls.index", accent: "from-teal-500 to-teal-700" },
    { label: "Reports", subtitle: "Ledger & analytics", icon: "solar:chart-2-bold-duotone", routeName: "reports.master_ledger", accent: "from-slate-600 to-slate-800" },
];

export default function Dashboard({ stats, recentActivity, expiringContracts, buildingSummary }: any) {
    const user = (usePage().props as any).auth.user;
    const [currentTime, setCurrentTime] = useState(new Date());
    const [inspectionIsNew, setInspectionIsNew] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        setInspectionIsNew(localStorage.getItem("market-inspections-seen") !== "1");
        return () => clearInterval(timer);
    }, []);

    const markSeen = (label: string) => {
        if (label === "Inspections") {
            localStorage.setItem("market-inspections-seen", "1");
            setInspectionIsNew(false);
        }
    };

    const totalStalls = buildingSummary?.reduce((sum: number, item: any) => sum + Number(item.total || 0), 0) || stats?.total_stalls || 0;
    const occupied = buildingSummary?.reduce((sum: number, item: any) => sum + Number(item.occupied || 0), 0) || stats?.occupied_stalls || 0;
    const vacant = buildingSummary?.reduce((sum: number, item: any) => sum + Number(item.vacant || 0), 0) || stats?.vacant_stalls || 0;

    const counters = [
        { label: "Total Stalls", value: totalStalls, icon: "solar:shop-bold-duotone" },
        { label: "Occupied", value: occupied, icon: "solar:key-minimalistic-square-bold-duotone" },
        { label: "Vacant", value: vacant, icon: "solar:door-opened-bold-duotone" },
        { label: "Expiring Leases", value: expiringContracts?.length || 0, icon: "solar:calendar-mark-bold-duotone" },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Public Market Command Center" />

            <div className="min-h-[calc(100vh-64px)] bg-[#f4f7f5] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-5">
                    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 p-5 text-white shadow-xl sm:p-7">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
                                    <Icon icon="solar:city-bold-duotone" width="18" />
                                    Public Market Management System
                                </div>
                                <h1 className="text-2xl font-black tracking-tight sm:text-4xl">Public Market Command Center</h1>
                                <p className="mt-2 max-w-2xl text-sm text-emerald-100 sm:text-base">
                                    Welcome, {user.name}. Manage stallholders, leases, collections, compliance and market operations from one central workspace.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-left backdrop-blur-sm md:text-right">
                                <div className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                                    {currentTime.toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                                </div>
                                <div className="mt-1 text-2xl font-black tabular-nums">
                                    {currentTime.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {counters.map((item) => (
                            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-slate-500">{item.label}</div>
                                        <div className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{item.value}</div>
                                    </div>
                                    <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-800">
                                        <Icon icon={item.icon} width="26" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-7">
                        <div className="mb-5 text-center">
                            <div className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">Main Operations</div>
                            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">Choose a Market Module</h2>
                        </div>

                        <div className="relative mx-auto max-w-[820px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-slate-50 to-emerald-50/40 sm:min-h-[720px]">
                            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-emerald-300/70 sm:block" />
                            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[570px] w-[570px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 sm:block" />

                            <div className="absolute left-1/2 top-1/2 z-20 hidden h-52 w-52 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[8px] border-white bg-gradient-to-br from-emerald-950 to-emerald-700 p-5 text-center text-white shadow-2xl sm:flex">
                                <Icon icon="solar:shop-bold-duotone" width="42" className="mb-2 text-amber-300" />
                                <div className="text-xl font-black leading-tight">PUBLIC MARKET</div>
                                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">Command Center</div>
                                <div className="mt-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white">Tap a module</div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 p-4 sm:block sm:p-0">
                                {modules.map((module, index) => {
                                    const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2;
                                    const radius = 300;
                                    const x = Math.cos(angle) * radius;
                                    const y = Math.sin(angle) * radius;
                                    const style = { "--orbit-x": `${x}px`, "--orbit-y": `${y}px` } as any;
                                    const showNew = module.isNew && inspectionIsNew;
                                    const className = `group relative flex min-h-[118px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br ${module.accent} p-3 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl sm:absolute sm:left-[calc(50%+var(--orbit-x))] sm:top-[calc(50%+var(--orbit-y))] sm:h-32 sm:w-40 sm:min-h-0 sm:-translate-x-1/2 sm:-translate-y-1/2`;
                                    const content = (
                                        <>
                                            {showNew && (
                                                <span className="absolute -right-2 -top-2 animate-pulse rounded-full bg-yellow-300 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-slate-900 shadow-md">NEW</span>
                                            )}
                                            <Icon icon={module.icon} width="30" className="mb-2 transition-transform group-hover:scale-110" />
                                            <span className="text-sm font-black leading-tight">{module.label}</span>
                                            <span className="mt-1 text-[10px] font-medium text-white/80">{module.subtitle}</span>
                                        </>
                                    );

                                    if (module.routeName) {
                                        return (
                                            <Link key={module.label} href={route(module.routeName)} style={style} className={className} onClick={() => markSeen(module.label)}>
                                                {content}
                                            </Link>
                                        );
                                    }

                                    return (
                                        <a key={module.label} href={module.href} style={style} className={className} onClick={() => markSeen(module.label)}>
                                            {content}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-5 lg:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
                            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                                <h3 className="flex items-center gap-2 font-black text-slate-800">
                                    <Icon icon="solar:history-bold-duotone" className="text-emerald-700" width="22" />
                                    Recent Market Activity
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
                                        <tr><th className="px-5 py-3">Stall</th><th className="px-5 py-3">Stallholder</th><th className="px-5 py-3">Activity</th><th className="px-5 py-3">Date</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {recentActivity?.length ? recentActivity.slice(0, 6).map((activity: any, index: number) => (
                                            <tr key={index} className="hover:bg-emerald-50/40">
                                                <td className="px-5 py-3 font-black text-slate-800">{activity.stall_code}</td>
                                                <td className="px-5 py-3 text-slate-700">{activity.tenant_name}</td>
                                                <td className="px-5 py-3 text-slate-600">{activity.action}</td>
                                                <td className="px-5 py-3 font-semibold text-slate-500">{activity.date}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">No recent activity.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 text-white shadow-lg">
                            <div className="mb-4 flex items-center gap-2 font-black">
                                <Icon icon="solar:bell-bing-bold-duotone" width="22" />
                                Lease Alerts
                            </div>
                            <div className="space-y-3">
                                {expiringContracts?.length ? expiringContracts.slice(0, 5).map((contract: any, index: number) => (
                                    <div key={index} className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                                        <div className="text-xs font-bold text-orange-100">Stall {contract.stall}</div>
                                        <div className="mt-0.5 text-sm font-black">Expires in {contract.days_left} days</div>
                                    </div>
                                )) : (
                                    <div className="rounded-xl bg-white/10 p-4 text-sm font-semibold">No leases expiring within 30 days.</div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
