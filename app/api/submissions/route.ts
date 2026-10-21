import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

function isAdmin(request: NextRequest) {
  return request.cookies.get('ruc_admin')?.value === 'admin'
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const result = await pool.query('SELECT id, full_name, matric_number, department, level, gender, class_enrolled, class_group, is_worker, feedback, created_at FROM public.student_responses ORDER BY created_at DESC')
  return NextResponse.json(result.rows)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const required = ['fullName', 'matricNumber', 'department', 'level', 'gender', 'classEnrolled', 'classGroup', 'feedback']
  if (required.some((key) => typeof body[key] !== 'string' || !body[key].trim()) || typeof body.isWorker !== 'boolean') {
    return NextResponse.json({ error: 'Please complete all fields.' }, { status: 400 })
  }
  await pool.query(
    'INSERT INTO public.student_responses (full_name, matric_number, department, level, gender, class_enrolled, class_group, is_worker, feedback) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
    [body.fullName.trim(), body.matricNumber.trim(), body.department.trim(), body.level, body.gender, body.classEnrolled, body.classGroup.trim(), body.isWorker, body.feedback.trim()],
  )
  return NextResponse.json({ ok: true }, { status: 201 })
}
