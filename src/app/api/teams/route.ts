import { NextResponse } from "next/server";

const url = `https://www.basketball-reference.com/leagues/`;

export async function GET(request: Request) {
  return NextResponse.json({ msg: " JSON.stringify(teams)" });
}
