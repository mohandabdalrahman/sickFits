import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { CartItem } from './schemas/CartItem';
import { extendGraphqlSchema } from './mutations/index';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL!,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
    }),
    extendGraphqlSchema,
    ui: {
      // TODO change this for roles
      isAccessAllowed: ({ session }) => {
        return !!session?.data;
      },
    },
    // TODO add session values
    //@ts-ignore
    session: withItemData(statelessSessions(sessionConfig), {
      // graphql query
      User: `id`,
    }),
  })
);
