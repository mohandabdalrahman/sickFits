import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}
// @ts-ignore
const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
};

// canManageProducts({ session }) {
//   return session?.data.role?.canManageProducts;
// },
// canSeeOtherUsers({ session }) {
//   return session?.data.role?.canSeeOtherUsers;
// },
// canManageUsers({ session }) {
//   return session?.data.role?.canManageUsers;
// },
// canManageRoles({ session }) {
//   return session?.data.role?.canManageRoles;
// },
// canManageCart({ session }) {
//   return session?.data.role?.canManageCart;
// },
// canManageOrders({ session }) {
//   return session?.data.role?.canManageOrders;
// },

// Rule based function
// Rules return boolean or filter which limit products they can crud

export const rules = {
  canManageProducts({ session }) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },
  canOrder({ session }) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },
  canManageOrderItem({ session }) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    return { id: session.itemId };
  },
};
