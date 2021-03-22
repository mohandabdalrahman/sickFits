import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import stripeConfig from '../lib/stripe';

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: `
  type Mutation{
    addToCart(productId:ID):CartItem
    checkout(token:String!):Order
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
      async checkout(root, { token }: { token: string }, context) {
        const userId = context.session.itemId;
        if (!userId) {
          throw new Error('You must sign in to create order');
        }
        const user = await context.lists.User.findOne({
          where: { id: userId },
          resolveFields: `
          id
          name
          email
          cart{
            id
            quantity
            product{
              id
              name
              price
              description
              photo{
                id
                image{
                  id
                  publicUrlTransformed
                }
              }
            }
          }
          `,
        });
        // calc total price
        const cartItems = user?.cart.filter((cartItem) => cartItem.product);
        const amount = cartItems.reduce((tally, cartItem) => {
          return tally + cartItem.product.price * cartItem.quantity;
        }, 0);
        // create charge
        const charge = await stripeConfig.paymentIntents
          .create({
            amount,
            currency: 'USD',
            payment_method: token,
          })
          .catch((err) => {
            console.log('🚀 ~ file: index.ts ~ line 91 ~ checkout ~ err', err);
            throw new Error(err.message);
          });
      },
    },
  },
});
