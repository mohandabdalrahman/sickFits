import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
  type Mutation{
    addToCart(productId:ID):CartItem
  }
  `,
  resolvers: {
    Mutation: {
      async addToCart(root, { productId }: { productId: string }, context) {
        // query current user
        const session = context.session;
        if (!session.itemId) {
          throw new Error('You must logged in to do this');
        }
        // query current user cart
        const allCartItems = await context.lists.CartItem.findMany({
          where: {
            user: { id: session.itemId },
            product: { id: productId },
          },
          resolveFields: 'id,quantity',
          
        });

        const [existingCartItem] = allCartItems;
        if (existingCartItem) {
          console.log('this item already exist in cart,increment by one');
          return await context.lists.CartItem.updateOne({
            id: existingCartItem.id,
            data: {
              quantity: existingCartItem.quantity + 1,
            },
          });
        }
        // if it is not create cart
        return await context.lists.CartItem.createOne({
          data: {
            product: {
              connect: { id: productId },
            },
            user: {
              connect: { id: session.itemId },
            },
          },
        });
      },
    },
  },
});
