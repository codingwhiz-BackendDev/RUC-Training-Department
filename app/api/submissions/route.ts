import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function isAdmin(request: NextRequest) {
  return request.cookies.get("ruc_admin")?.value === "admin";
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await pool.query(
    "SELECT id, full_name, matric_number, department, level, gender, class_enrolled, class_group, is_worker, feedback, created_at FROM public.student_responses ORDER BY created_at DESC",
  );
  return NextResponse.json(result.rows);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const required = [
    "fullName",
    "matricNumber",
    "department",
    "level",
    "gender",
    "classEnrolled",
    "classGroup",
    "feedback",
  ];
  if (
    required.some(
      (key) => typeof body[key] !== "string" || !body[key].trim(),
    ) ||
    typeof body.isWorker !== "boolean"
  ) {
    return NextResponse.json(
      { error: "Please complete all fields." },
      { status: 400 },
    );
  }
  await pool.query(
    "INSERT INTO public.student_responses (full_name, matric_number, department, level, gender, class_enrolled, class_group, is_worker, feedback) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      body.fullName.trim(),
      body.matricNumber.trim(),
      body.department.trim(),
      body.level,
      body.gender,
      body.classEnrolled,
      body.classGroup.trim(),
      body.isWorker,
      body.feedback.trim(),
    ],
  );
  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!isAdmin(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const required = [
    "fullName",
    "matricNumber",
    "department",
    "level",
    "gender",
    "classEnrolled",
    "classGroup",
    "feedback",
  ];
  if (
    typeof body.id !== "string" ||
    required.some(
      (key) => typeof body[key] !== "string" || !body[key].trim(),
    ) ||
    typeof body.isWorker !== "boolean"
  ) {
    return NextResponse.json(
      { error: "Please complete all fields." },
      { status: 400 },
    );
  }
  const result = await pool.query(
    "UPDATE public.student_responses SET full_name=$1, matric_number=$2, department=$3, level=$4, gender=$5, class_enrolled=$6, class_group=$7, is_worker=$8, feedback=$9 WHERE id=$10 RETURNING id, full_name, matric_number, department, level, gender, class_enrolled, class_group, is_worker, feedback, created_at",
    [
      body.fullName.trim(),
      body.matricNumber.trim(),
      body.department.trim(),
      body.level,
      body.gender,
      body.classEnrolled,
      body.classGroup.trim(),
      body.isWorker,
      body.feedback.trim(),
      body.id,
    ],
  );
  if (result.rowCount === 0)
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  return NextResponse.json(result.rows[0]);
}

export async function DELETE(request: NextRequest) {
  if (!isAdmin(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id)
    return NextResponse.json(
      { error: "Student id is required." },
      { status: 400 },
    );
  const result = await pool.query(
    "DELETE FROM public.student_responses WHERE id=$1",
    [id],
  );
  if (result.rowCount === 0)
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
