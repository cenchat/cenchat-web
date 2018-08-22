import EmberObject from '@ember/object';

import Chat from './chat';
import Message from './message';
import Page from './page';
import Site from './site';
import Sticker from './sticker';
import StickerPack from './sticker-pack';
import UserMetaInfo from './user-meta-info';
import User from './user';

/**
 * @class ModelCurator
 * @namespace Model
 * @extends Ember.Object
 */
export default EmberObject.extend({
  model: {
    chat: Chat,
    message: Message,
    page: Page,
    site: Site,
    sticker: Sticker,
    stickerPack: StickerPack,
    userMetaInfo: UserMetaInfo,
    user: User,
  },
});
