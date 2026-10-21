"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ClipboardList,
  LockKeyhole,
  Pencil,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

const levels = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "600 Level",
  "Other",
];
const classes = [
  "Believers Class",
  "Baptismal Class",
  "Workers in Training",
  "Workers IT",
];
type Submission = {
  id: string;
  full_name: string;
  matric_number: string;
  department: string;
  level: string;
  gender: string;
  class_enrolled: string;
  class_group: string;
  is_worker: boolean;
  feedback: string;
  created_at: string;
};

export default function Page() {
  const [admin, setAdmin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  useEffect(() => {
    fetch("/api/admin/login")
      .then((response) => response.json())
      .then((data) => setAdmin(data.authenticated === true))
      .catch(() => setAdmin(false));
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#123b68] text-white">
              <ShieldCheck />
            </div>
            <div>
              <p className="text-sm font-bold text-[#123b68]">
                RUC Training Department
              </p>
              <p className="text-xs text-slate-500">Training feedback portal</p>
            </div>
          </div>
          {admin ? (
            <button
              onClick={async () => {
                await fetch("/api/admin/login", { method: "DELETE" });
                setAdmin(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              <LockKeyhole size={16} /> Log out
            </button>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              <LockKeyhole size={16} /> Admin portal
            </button>
          )}
        </div>
      </header>
      {admin ? (
        <Admin onLogout={() => setAdmin(false)} />
      ) : (
        <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[.8fr_1.2fr]">
          <section className="pt-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-[#123b68]">
              <ClipboardList size={14} /> Student response form
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#102f52]">
              Training Class Information &amp; Feedback
            </h1>
            <p className="mt-5 leading-7 text-slate-600">
              Share your experience with the RUC Training Department. Your
              response helps us improve future classes.
            </p>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            {submitted ? (
              <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-[#102f52]">
                  Response received
                </h2>
                <p className="mt-3 text-slate-600">
                  Thank you for sharing your feedback.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-lg bg-[#123b68] px-5 py-3 text-sm font-semibold text-white"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <StudentForm onSuccess={() => setSubmitted(true)} />
            )}
          </section>
        </main>
      )}
      {loginOpen && (
        <Login
          onClose={() => {
            setLoginOpen(false);
            setError("");
          }}
          onSuccess={() => {
            setAdmin(true);
            setLoginOpen(false);
          }}
          error={error}
          setError={setError}
        />
      )}
      <footer className="border-t border-slate-200 bg-white px-5 py-5 text-center text-xs text-slate-500">
        RUC Training Department · Training feedback portal
      </footer>
    </div>
  );
}

function StudentForm({ onSuccess }: { onSuccess: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, isWorker: data.isWorker === "yes" }),
    });
    setBusy(false);
    if (response.ok) onSuccess();
    else setError("Unable to save your response. Please try again.");
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-[#102f52]">
        Tell us about your class
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="fullName"
          label="Full name"
          placeholder="e.g. Ada Okafor"
        />
        <Field
          name="matricNumber"
          label="Matriculation number"
          placeholder="RUN/CMP/23/15323"
        />
        <Field
          name="department"
          label="Department"
          placeholder="Your department"
        />
        <Select name="level" label="Level" options={levels} />
        <Select name="gender" label="Gender" options={["Male", "Female"]} />
        <Select
          name="classEnrolled"
          label="Class enrolled in"
          options={classes}
        />
        <Field
          name="classGroup"
          label="Name of class / group"
          placeholder="Jah Class"
        />
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">
          Are you a worker in the chapel?
        </legend>
        <div className="flex gap-3">
          <label className="flex flex-1 gap-2 rounded-lg border p-3 text-sm">
            <input required type="radio" name="isWorker" value="yes" /> Yes
          </label>
          <label className="flex flex-1 gap-2 rounded-lg border p-3 text-sm">
            <input required type="radio" name="isWorker" value="no" /> No
          </label>
        </div>
      </fieldset>
      <label className="text-sm font-semibold">
        Your experience
        <textarea
          required
          name="feedback"
          rows={5}
          className="mt-2 w-full resize-none rounded-lg border bg-slate-50 p-3 font-normal outline-none focus:border-blue-500"
          placeholder="Share what you learned and your suggestions..."
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        disabled={busy}
        className="rounded-lg bg-[#123b68] px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {busy ? "Saving..." : "Submit response"}
      </button>
    </form>
  );
}

function Admin({ onLogout }: { onLogout: () => void }) {
  const [rows, setRows] = useState<Submission[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Submission | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  useEffect(() => {
    fetch("/api/submissions")
      .then(async (r) => {
        if (!r.ok) throw new Error();
        setRows(await r.json());
      })
      .catch(() => setError("Could not load live submissions."));
  }, []);
  const filtered = rows.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  async function removeStudent(id: string) {
    if (
      !window.confirm(
        "Delete this student response? This action cannot be undone.",
      )
    )
      return;
    const response = await fetch(
      `/api/submissions?id=${encodeURIComponent(id)}`,
      { method: "DELETE" },
    );
    if (response.ok)
      setRows((current) => current.filter((row) => row.id !== id));
    else setActionError("Could not delete the student response.");
  }
  function exportStudents() {
    const headers = [
      "Full name", "Matriculation number", "Department", "Level", "Gender",
      "Class enrolled", "Class group", "Worker", "Answer", "Submitted at",
    ];
    const values = filtered.map((row) => [
      row.full_name, row.matric_number, row.department, row.level, row.gender,
      row.class_enrolled, row.class_group, row.is_worker ? "Yes" : "No",
      row.feedback, new Date(row.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...values]
      .map((line) => line.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\\n");
    const url = URL.createObjectURL(new Blob(["\\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "ruc-training-student-responses.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
  async function saveStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !editing ||
      !window.confirm("Save these changes to this student response?")
    )
      return;
    setSaving(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/submissions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing.id,
        ...data,
        isWorker: data.isWorker === "yes",
      }),
    });
    setSaving(false);
    if (response.ok) {
      const updated = await response.json();
      setRows((current) =>
        current.map((row) => (row.id === updated.id ? updated : row)),
      );
      setEditing(null);
    } else setActionError("Could not update the student response.");
  }
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">Admin portal</p>
          <h1 className="mt-1 text-3xl font-bold text-[#102f52]">
            Student responses
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Live records from the RUC Training Department database.
          </p>
        </div>
        <button
          onClick={async () => {
            await fetch("/api/admin/login", { method: "DELETE" });
            onLogout();
          }}
          className="self-start rounded-lg border px-4 py-2 text-sm font-semibold"
        >
          Sign out
        </button>
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-3 sm:flex-1">
            <Search size={17} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, matric number, department, class, or answer..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <button
            onClick={exportStudents}
            disabled={filtered.length === 0}
            className="rounded-lg bg-[#123b68] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export to Excel
          </button>
        </div>
        {error ? (
          <p className="py-12 text-center text-sm text-red-600">{error}</p>
        ) : (
          <div className="mt-5 flex flex-col gap-3">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-500">
                No responses found.
              </p>
            ) : (
              filtered.map((row) => (
                <article
                  key={row.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <div>
                      <h2 className="font-bold text-[#102f52]">
                        {row.full_name}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {row.matric_number} · {row.department} · {row.level}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400">
                      {new Date(row.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                    <p>
                      <b>Class:</b> {row.class_enrolled} ({row.class_group})
                    </p>
                    <p>
                      <b>Gender:</b> {row.gender}
                    </p>
                    <p>
                      <b>Worker:</b> {row.is_worker ? "Yes" : "No"}
                    </p>
                  </div>
                  <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                    {row.feedback}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setEditing(row)}
                      className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      onClick={() => removeStudent(row.id)}
                      className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </div>
      {actionError && (
        <p className="mt-4 text-sm text-red-600">{actionError}</p>
      )}
      {editing && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#102f52]/40 p-5 backdrop-blur-sm">
          <form
            onSubmit={saveStudent}
            className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#102f52]">
                Edit student response
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                name="fullName"
                label="Full name"
                placeholder="Full name"
                defaultValue={editing.full_name}
              />
              <Field
                name="matricNumber"
                label="Matriculation number"
                placeholder="RUN/CMP/23/15323"
                defaultValue={editing.matric_number}
              />
              <Field
                name="department"
                label="Department"
                placeholder="Department"
                defaultValue={editing.department}
              />
              <Select
                name="level"
                label="Level"
                options={levels}
                defaultValue={editing.level}
              />
              <Select
                name="gender"
                label="Gender"
                options={["Male", "Female"]}
                defaultValue={editing.gender}
              />
              <Select
                name="classEnrolled"
                label="Class enrolled in"
                options={classes}
                defaultValue={editing.class_enrolled}
              />
              <Field
                name="classGroup"
                label="Name of class / group"
                placeholder="Jah Class"
                defaultValue={editing.class_group}
              />
            </div>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">
                Worker in chapel?
              </legend>
              <div className="flex gap-3">
                <label className="flex gap-2 rounded-lg border p-3 text-sm">
                  <input
                    type="radio"
                    name="isWorker"
                    value="yes"
                    defaultChecked={editing.is_worker}
                  />{" "}
                  Yes
                </label>
                <label className="flex gap-2 rounded-lg border p-3 text-sm">
                  <input
                    type="radio"
                    name="isWorker"
                    value="no"
                    defaultChecked={!editing.is_worker}
                  />{" "}
                  No
                </label>
              </div>
            </fieldset>
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Experience
              <textarea
                required
                name="feedback"
                defaultValue={editing.feedback}
                rows={5}
                className="rounded-lg border bg-slate-50 p-3 font-normal outline-none focus:border-blue-500"
              />
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 rounded-lg border py-3 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                className="flex-1 rounded-lg bg-[#123b68] py-3 text-sm font-semibold text-white"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function Login({
  onClose,
  onSuccess,
  error,
  setError,
}: {
  onClose: () => void;
  onSuccess: () => void;
  error: string;
  setError: (value: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#102f52]/40 p-5 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
        <div className="flex justify-between">
          <div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#123b68]">
              <LockKeyhole />
            </div>
            <h2 className="mt-5 text-xl font-bold text-[#102f52]">
              Admin sign in
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the department password.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close">
            <X className="text-slate-400" />
          </button>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const password = new FormData(e.currentTarget).get("password");
            const response = await fetch("/api/admin/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password }),
            });
            if (response.ok) onSuccess();
            else setError("Incorrect password. Please try again.");
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <Field
            name="password"
            label="Password"
            placeholder="Enter admin password"
            type="password"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="rounded-lg bg-[#123b68] py-3 text-sm font-semibold text-white">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
function Field({
  name,
  label,
  placeholder,
  type = "text",
  defaultValue,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold">
      {label}
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-lg border bg-slate-50 px-3 py-3 font-normal outline-none focus:border-blue-500"
      />
    </label>
  );
}
function Select({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold">
      {label}
      <select
        required
        name={name}
        defaultValue={defaultValue}
        className="rounded-lg border bg-slate-50 px-3 py-3 font-normal outline-none focus:border-blue-500"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
