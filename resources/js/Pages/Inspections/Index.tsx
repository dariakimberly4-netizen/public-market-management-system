import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";

const inspectionTypes = [
    { title: "Sanitation", icon: "solar:shield-check-bold-duotone", note: "Cleanliness, waste handling and hygiene compliance" },
    { title: "Fire Safety", icon: "solar:fire-bold-duotone", note: "Extinguishers, exits, wiring and obstruction checks" },
    { title: "Stall Condition", icon: "solar:shop-2-bold-duotone", note: "Structure, signage, fixtures and approved alterations" },
    { title: "Permit Check", icon: "solar:document-text-bold-duotone", note: "Lease, permits and required market documents" },
];

const sampleRows = [
    { stall: "A-014", holder: "Maria Santos", type: "Sanitation", date: "Sep 24, 2026", status: "Scheduled" },
    { stall: "B-021", holder: "Joel Reyes", type: "Fire Safety", date: "Sep 24, 2026", status: "Scheduled" },
    { stall: "C-008", holder: "Ana Cruz", type: "Stall Condition", date: "Sep 25, 2026", status: "Pending" },
];

export default function InspectionsIndex() {
    return (
        <AuthenticatedLayout>
            <Head title="Market Inspections" />
            <div className="min-h-[calc(100vh-64px)] bg-[#f4f7f5] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-5">
                    <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-amber-100">Public Market Operations</div>
                            <h1 className="mt-1 text-3xl font-black">Inspections & Compliance</h1>
                            <p className="mt-2 max-w-2xl text-sm text-orange-50">Plan inspections, record findings, track corrective actions and keep market stalls compliant.</p>
                        </div>
                        <Link href={route("dashboard")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-black text-orange-700 shadow-sm hover:bg-orange-50">
                            <Icon icon="solar:arrow-left-bold" width="18" /> Back to Orbit
                        </Link>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {inspectionTypes.map((item) => (
                            <button key={item.title} className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
                                <div className="mb-4 inline-flex rounded-2xl bg-amber-50 p-3 text-amber-700 group-hover:bg-amber-100">
                                    <Icon icon={item.icon} width="28" />
                                </div>
                                <div className="font-black text-slate-900">{item.title}</div>
                                <div className="mt-1 text-xs leading-5 text-slate-500">{item.note}</div>
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                        {[
                            ["Inspections Today", "2", "solar:calendar-bold-duotone"],
                            ["Pending", "1", "solar:clock-circle-bold-duotone"],
                            ["For Correction", "0", "solar:danger-triangle-bold-duotone"],
                            ["Compliant", "24", "solar:verified-check-bold-duotone"],
                        ].map(([label, value, icon]) => (
                            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-wider text-slate-500">{label}</div>
                                        <div className="mt-1 text-3xl font-black text-slate-900">{value}</div>
                                    </div>
                                    <Icon icon={icon} width="30" className="text-amber-600" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-black text-slate-900">Inspection Schedule</h2>
                                <p className="text-xs text-slate-500">Demo records for the new inspection workflow</p>
                            </div>
                            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-black text-white hover:bg-amber-600">
                                <Icon icon="solar:add-circle-bold" width="18" /> Schedule Inspection
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
                                    <tr><th className="px-5 py-3">Stall</th><th className="px-5 py-3">Stallholder</th><th className="px-5 py-3">Inspection</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Action</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {sampleRows.map((row) => (
                                        <tr key={`${row.stall}-${row.type}`} className="hover:bg-amber-50/50">
                                            <td className="px-5 py-4 font-black text-slate-900">{row.stall}</td>
                                            <td className="px-5 py-4 text-slate-700">{row.holder}</td>
                                            <td className="px-5 py-4 text-slate-600">{row.type}</td>
                                            <td className="px-5 py-4 font-semibold text-slate-600">{row.date}</td>
                                            <td className="px-5 py-4"><span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-800">{row.status}</span></td>
                                            <td className="px-5 py-4"><button className="font-black text-amber-700 hover:text-amber-900">Open</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
