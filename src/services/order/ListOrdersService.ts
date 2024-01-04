import prismaClient from "../../prisma";

class ListOrdersService{
    async execute() {

        // Ordernar os pedidos mais recentes q estão na cozinha
        const orders = await prismaClient.order.findMany({
            where:{
                draft: false,
                status: false,
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return orders;
    }
}

export { ListOrdersService }