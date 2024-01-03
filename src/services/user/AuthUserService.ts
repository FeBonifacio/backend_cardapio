import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthResquest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthResquest) {
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email ou Senha incorretos!")
        }

        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email ou Senha incorretos!")
        }

        // gerar um token = JWT e logar
        //const user = await prismaClient.user

        const token = sign (
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '100d' //Daqui 40 dias será experiado a senha caso estejá logado e nao deslogou
            }
        )


        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }

    }
}

export { AuthUserService };