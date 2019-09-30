import { createGlobalId } from '@apollosproject/server-core';
import { enforceCurrentUser } from '../utils';

export default {
  Group: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
    leader: ({ id }, args, { dataSources }) =>
      dataSources.Group.getLeader({ groupId: id }),
    members: ({ id }, args, { dataSources }) =>
      dataSources.Group.getMembers({ groupId: id }),
  },
  Person: {
    groups: enforceCurrentUser({
      func: ({ id }, { type, asLeader }, { dataSources }) =>
        dataSources.Group.getByPerson({ personId: id, type, asLeader })
    }),
  },
};
