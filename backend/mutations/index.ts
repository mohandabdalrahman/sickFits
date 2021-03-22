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
        console.log('🚀 ~ file: index.ts ~ line 82 ~ checkout ~ cartItems', cartItems)
        const amount = cartItems.reduce((tally, cartItem) => {
          return tally + cartItem.product.price * cartItem.quantity;
        }, 0);
        console.log('🚀 ~ file: index.ts ~ line 86 ~ amount ~ amount', amount)
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
        console.log('🚀 ~ file: index.ts ~ line 98 ~ checkout ~ charge', charge)

        const orderItems = cartItems.map((cartItem) => {
          const orderItem = {
            name: cartItem.product.name,
            description: cartItem.product.description,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            photo: { connect: { id: cartItem.product.photo.id } },
          };
          return orderItem;
        });
        // create order
        const order = await context.lists.Order.createOne({
          data: {
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems },
            user: { connect: { id: userId } },
          },
        });

        const cartItemIds = cartItems.map((cartItem) => cartItem.id);
        await context.lists.CartItem.deleteMany({
          ids: cartItemIds,
        });

        return order;
      },
    },
  },
});
