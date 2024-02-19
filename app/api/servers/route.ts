import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import * as z from "zod";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { formSchema } from "@/components/modal/initial-modal";

export async function POST(request: Request) {
  try {
    const { name, imageUrl } = await request.json();
    const profile = await currentProfile();
    if (!profile) {
      return Response.json({ message: "Unauthorized" }, { status: 500 });
    }
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });
    return Response.json(server);
  } catch (error) {
    console.log(`error in servers/route ${error}`);
    return Response.json({ message: error }, { status: 500 });
  }
}
