import { list } from '@keystone-next/keystone/schema';
import { text, relationship } from '@keystone-next/fields';
import { cloudinaryImage } from '@keystone-next/cloudinary';

export const cloudinary = {
  apiSecret: process.env.CLOUDINARY_SECRET,
  apiKey: process.env.CLOUDINARY_KEY,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  folder: 'sickfits',
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      // @ts-ignore
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'product', 'altText'],
    },
  },
});
