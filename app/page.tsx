'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  FileSpreadsheet,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'

const classes = ['Believers Class', 'Baptismal Class', 'Workers in Training', 'Workers IT']
const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', '600 Level', 'Other']
const submissions = [
  { name: 'Adetola Ojo', matric: 'CH/24/0182', dept: 'Computer Science', level: '300 Level', training: 'Believers Class', worker: 'Yes', date: 'Oct 18, 2026' },
  { name: 'David Eze', matric: 'CH/23/0419', dept: 'Accounting', level: '400 Level', training: 'Workers IT', worker: 'Yes', date: 'Oct 17, 2026' },
  { name: 'Grace Adeyemi', matric: 'CH/25/0096', dept: 'Mass Communication', level: '200 Level', training: 'Baptismal Class', worker: 'No', date: 'Oct 16, 2026' },
  { name: 'Samuel Okafor', matric: 'CH/24/0277', dept: 'Electrical Engineering', level: '300 Level', training: 'Believers Class', worker: 'No', date: 'Oct 15, 2026' },
]

export default function Page() {
  const [admin, setAdmin] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#123b68] text-white shadow-sm"><ShieldCheck /></div>
            <div><p className="text-sm font-bold tracking-tight text-[#123b68]">Chapel Connect</p><p className="text-xs text-slate-500">Training management system</p></div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">2026 / 2027 Session</span>
            <button onClick={() => setLoginOpen(true)} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><LockKeyhole size={16} /> Admin portal</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 sm:hidden" aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      {!admin ? <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <section className="pt-4 lg:pt-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-[#123b68]"><ClipboardList size={14} /> Student response form</div>
            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-[-0.04em] text-[#102f52] sm:text-5xl">Chapel Training Class Information &amp; Feedback Form</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">Help us understand your training experience. Your response helps the chapel build stronger classes and serve students better.</p>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500"><span className="flex items-center gap-2"><ShieldCheck size={17} className="text-blue-600" /> Private &amp; secure</span><span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-blue-600" /> Takes 3 minutes</span></div>
            <div className="mt-12 hidden rounded-2xl bg-[#123b68] p-6 text-white shadow-xl shadow-blue-900/10 sm:block"><p className="text-sm font-semibold text-blue-100">A note from the chapel</p><p className="mt-3 text-lg font-medium leading-7">“Every response is a seed that helps us grow a better community of faith and learning.”</p></div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-25px_rgba(18,59,104,.25)] sm:p-8">
            {submitted ? <div className="flex min-h-[520px] flex-col items-center justify-center text-center"><div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 size={34} /></div><h2 className="mt-6 text-2xl font-bold text-[#102f52]">Thank you for sharing</h2><p className="mt-3 max-w-sm leading-7 text-slate-600">Your training feedback has been received. Your voice will help us improve future chapel classes.</p><button onClick={() => setSubmitted(false)} className="mt-8 rounded-lg bg-[#123b68] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0d2c4e]">Submit another response</button></div> : <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="flex flex-col gap-5">
              <div><h2 className="text-xl font-bold text-[#102f52]">Tell us about your class</h2><p className="mt-1 text-sm text-slate-500">All fields are required unless marked optional.</p></div>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" placeholder="e.g. Ada Okafor" /><Field label="Matriculation number" placeholder="e.g. CH/24/0182" /><Field label="Department" placeholder="Your department" /><SelectField label="Level" options={levels} /><SelectField label="Gender" options={['Male', 'Female', 'Prefer not to say']} /><SelectField label="Class enrolled in" options={classes} /><Field label="Name of class / group" placeholder="e.g. Batch A" /></div>
              <fieldset><legend className="mb-2 text-sm font-semibold text-slate-700">Are you a worker in the chapel?</legend><div className="flex gap-3"><label className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm"><input required type="radio" name="worker" value="yes" className="accent-[#123b68]" /> Yes</label><label className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm"><input required type="radio" name="worker" value="no" className="accent-[#123b68]" /> No</label></div></fieldset>
              <div><label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="feedback">Your experience during the class</label><textarea required id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value.slice(0, 1000))} rows={5} placeholder="Share what you learned, challenges, impact, and suggestions..." className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /><p className="mt-1 text-right text-xs text-slate-400">{feedback.length} / 1000</p></div>
              <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-[#123b68] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#0d2c4e]">Submit response <ArrowRight size={17} /></button>
            </form>}
          </section>
        </div>
      </main> : <AdminDashboard onLogout={() => setAdmin(false)} />}

      {loginOpen && <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#102f52]/40 p-5 backdrop-blur-sm"><div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#123b68]"><LockKeyhole /></div><h2 className="mt-5 text-xl font-bold text-[#102f52]">Admin sign in</h2><p className="mt-1 text-sm text-slate-500">Access student records and reports.</p></div><button onClick={() => setLoginOpen(false)} aria-label="Close"><X className="text-slate-400" /></button></div><form onSubmit={(e) => { e.preventDefault(); setAdmin(true); setLoginOpen(false) }} className="mt-6 flex flex-col gap-4"><Field label="Email address" placeholder="admin@chapel.edu" type="email" /><Field label="Password" placeholder="••••••••" type="password" /><button className="mt-2 rounded-lg bg-[#123b68] py-3 text-sm font-semibold text-white">Sign in to dashboard</button></form><p className="mt-4 text-center text-xs text-slate-400">Authorized chapel administrators only</p></div></div>}
      <footer className="border-t border-slate-200 bg-white px-5 py-5 text-center text-xs text-slate-500">Chapel Connect · Training feedback portal</footer>
    </div>
  )
}

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) { return <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">{label}<input required type={type} placeholder={placeholder} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label> }
function SelectField({ label, options }: { label: string; options: string[] }) { return <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">{label}<span className="relative"><select required className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-3.5 text-slate-400" /></span></label> }
function AdminDashboard({ onLogout }: { onLogout: () => void }) { const [query, setQuery] = useState(''); const filtered = submissions.filter((s) => Object.values(s).join(' ').toLowerCase().includes(query.toLowerCase())); return <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm font-medium text-blue-600">Admin portal / Overview</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-[#102f52]">Good morning, Admin</h1><p className="mt-1 text-sm text-slate-500">Here is what is happening with your training classes.</p></div><button onClick={onLogout} className="self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Sign out</button></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat icon={Users} label="Total students" value="248" trend="+12 this month" /><Stat icon={GraduationCap} label="Training classes" value="4" trend="All active" /><Stat icon={ShieldCheck} label="Chapel workers" value="86" trend="34.7% of total" /><Stat icon={BarChart3} label="Responses" value="92%" trend="Completion rate" /></div><div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]"><div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><h2 className="font-bold text-[#102f52]">Recent submissions</h2><p className="mt-1 text-xs text-slate-500">Latest student responses</p></div><button className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"><Download size={14} /> Export</button></div><div className="mt-5 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5"><Search size={16} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students..." className="w-full bg-transparent text-sm outline-none" /></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b border-slate-100 text-xs text-slate-400"><tr><th className="pb-3 font-medium">Student</th><th className="pb-3 font-medium">Level</th><th className="pb-3 font-medium">Training class</th><th className="pb-3 font-medium">Date</th></tr></thead><tbody>{filtered.map((s) => <tr key={s.matric} className="border-b border-slate-50"><td className="py-4"><p className="font-semibold text-slate-700">{s.name}</p><p className="text-xs text-slate-400">{s.matric}</p></td><td className="py-4 text-slate-600">{s.level}</td><td className="py-4 text-slate-600">{s.training}</td><td className="py-4 text-xs text-slate-500">{s.date}</td></tr>)}</tbody></table></div></div><div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-[#102f52]">Class distribution</h2><p className="mt-1 text-xs text-slate-500">Students by training class</p><div className="mt-7 flex flex-col gap-5">{[['Believers Class', 48], ['Baptismal Class', 27], ['Workers in Training', 16], ['Workers IT', 9]].map(([label, value]) => <div key={label as string}><div className="mb-2 flex justify-between text-sm"><span className="text-slate-600">{label}</span><span className="font-bold text-[#123b68]">{value}%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#2b73b8]" style={{ width: `${value}%` }} /></div></div>)}</div><div className="mt-8 grid grid-cols-2 gap-3"><Mini label="Male students" value="142" /><Mini label="Female students" value="106" /></div></div></div><div className="mt-6 grid gap-4 sm:grid-cols-3"><Quick icon={LayoutDashboard} label="Dashboard" /><Quick icon={ClipboardList} label="All students" /><Quick icon={Settings} label="Settings" /></div></main> }
function Stat({ icon: Icon, label, value, trend }: { icon: typeof Users; label: string; value: string; trend: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#2b73b8]"><Icon size={19} /></div><span className="text-xs font-medium text-emerald-600">{trend}</span></div><p className="mt-5 text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-[#102f52]">{value}</p></div> }
function Mini({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-lg font-bold text-[#123b68]">{value}</p></div> }
function Quick({ icon: Icon, label }: { icon: typeof LayoutDashboard; label: string }) { return <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50"><Icon size={18} className="text-[#2b73b8]" />{label}</button> }
