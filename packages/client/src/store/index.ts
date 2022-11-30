import { AuthorizationStore, authorizationStore } from './Authorization';
import { ForumStore, forumStore } from './Forum';

type StoreType = {
  authorizationStore: AuthorizationStore;
  forumStore: ForumStore;
};

export const stores: StoreType = {
	authorizationStore,
	forumStore
};
