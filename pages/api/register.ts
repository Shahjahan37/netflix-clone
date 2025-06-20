import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    try {
        const { email, name, password } = req.body;
        console.log(req.body);

        const existingUser = await prismadb.user.findUnique({
            where: {
                email: email,
            },
        });

        console.log('existingUser ', existingUser);

        if (existingUser) {
            return res.status(422).json({ error: "Email taken" });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashPassword,
                image: "",
                emailVerified: new Date(),
            },
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log('Register user error ', error);
        return res.status(400).end();
    }
} 