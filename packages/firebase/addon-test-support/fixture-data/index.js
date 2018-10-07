/**
 * @return {Object} Fixture data
 * @function
 */
export default function getFixtureData() {
  return {
    __collection__: {
      chats: {
        __doc__: {
          site_c__page_a__user_a: {
            creator: '__ref__:users/user_a',
            description: 'User C: Message C',
            isPublicized: true,
            lastActivityTimestamp: new Date('2018-01-01'),
            lastMessage: '__ref__:messages/message_c',
            name: 'Site C',
            page: '__ref__:pages/site_c__page_a',
            publicizedTitle: 'Publicized Chat',
            site: '__ref__:sites/site_c',
          },

          site_c__page_a__user_b: {
            creator: '__ref__:users/user_b',
            description: 'User C: Message D',
            isPublicized: true,
            lastActivityTimestamp: new Date('2018-01-01'),
            lastMessage: '__ref__:messages/message_d',
            name: 'Site C',
            page: '__ref__:pages/site_c__page_a',
            publicizedTitle: 'Publicized Chat',
            site: '__ref__:sites/site_c',
          },

          site_c__page_a__user_d: {
            creator: '__ref__:users/user_d',
            description: 'User C: Message E',
            isPublicized: false,
            lastActivityTimestamp: new Date('2018-01-01'),
            lastMessage: '__ref__:messages/message_e',
            name: 'Site C',
            page: '__ref__:pages/site_c__page_a',
            publicizedTitle: null,
            site: '__ref__:sites/site_c',
          },

          site_a__page_a__user_b: {
            creator: '__ref__:users/user_b',
            description: 'User B: Message F',
            isPublicized: true,
            lastActivityTimestamp: new Date('2018-01-02'),
            lastMessage: '__ref__:messages/message_f',
            name: 'Site B',
            page: '__ref__:pages/site_a__page_a',
            publicizedTitle: 'Publicized Chat',
            site: '__ref__:sites/site_a',
          },

          site_a__page_a__user_d: {
            creator: '__ref__:users/user_d',
            description: 'User D: Message G',
            isPublicized: true,
            lastActivityTimestamp: new Date('2018-01-02'),
            lastMessage: '__ref__:messages/message_g',
            name: 'Site B',
            page: '__ref__:pages/site_a__page_a',
            publicizedTitle: 'Publicized Chat',
            site: '__ref__:sites/site_a',
          },

          site_a__page_a__user_e: {
            creator: '__ref__:users/user_e',
            description: 'User E: Message F',
            isPublicized: false,
            lastActivityTimestamp: new Date('2018-01-02'),
            lastMessage: '__ref__:messages/message_f',
            name: 'Site B',
            page: '__ref__:pages/site_a__page_a',
            publicizedTitle: null,
            site: '__ref__:sites/site_a',
          },
        },
      },

      facebookIds: {
        __doc__: {
          fb_user_a: {
            cloudFirestoreReference: '__ref__:users/user_a',
          },
        },
      },

      messages: {
        __doc__: {
          message_a: {
            createdOn: new Date('2017-01-01'),
            media: null,
            text: 'Message A',
            author: '__ref__:users/user_a',
            chat: '__ref__:chats/site_c__page_a__user_a',
          },

          message_b: {
            createdOn: new Date('2017-01-01'),
            media: { id: 'sticker_a1', type: 'sticker' },
            text: null,
            author: '__ref__:users/user_a',
            chat: '__ref__:chats/site_c__page_a__user_a',
          },

          message_c: {
            createdOn: new Date('2017-01-02'),
            media: null,
            text: 'Message C',
            author: '__ref__:users/user_c',
            chat: '__ref__:chats/site_c__page_a__user_a',
          },

          message_d: {
            createdOn: new Date('2017-01-02'),
            media: null,
            text: 'Message D',
            author: '__ref__:users/user_b',
            chat: '__ref__:chats/site_c__page_a__user_b',
          },

          message_e: {
            createdOn: new Date('2017-01-02'),
            media: null,
            text: 'Message E',
            author: '__ref__:users/user_d',
            chat: '__ref__:chats/site_c__page_a__user_d',
          },

          message_f: {
            createdOn: new Date('2017-01-02'),
            media: null,
            text: 'Message F',
            author: '__ref__:users/user_b',
            chat: '__ref__:chats/site_a__page_a__user_b',
          },

          message_g: {
            createdOn: new Date('2017-01-02'),
            media: null,
            text: 'Message G',
            author: '__ref__:users/user_d',
            chat: '__ref__:chats/site_a__page_a__user_d',
          },

          message_h: {
            createdOn: new Date('2017-01-02'),
            media: null,
            text: 'Message H',
            author: '__ref__:users/user_e',
            chat: '__ref__:chats/site_a__page_a__user_e',
          },
        },
      },

      notifications: {
        __doc__: {
          notification_a: {
            dataMessage: null,
            displayMessage: {
              body: null,
              title: 'User C started following you',
            },
            createdOn: new Date(),
            type: 'follow',
            from: '__ref__:users/user_c',
            to: '__ref__:users/user_a',
          },

          notification_b: {
            dataMessage: {
              commentId: 'comment_a',
            },
            displayMessage: {
              body: null,
              title: 'User A tagged you in a comment',
            },
            createdOn: new Date(),
            type: 'comment_tag',
            from: '__ref__:users/user_a',
            to: '__ref__:users/user_b',
          },

          notification_c: {
            dataMessage: {
              commentId: 'comment_b',
            },
            displayMessage: {
              body: null,
              title: 'User B replied to your comment',
            },
            createdOn: new Date(),
            type: 'comment_reply',
            from: '__ref__:users/user_b',
            to: '__ref__:users/user_a',
          },

          notification_d: {
            dataMessage: {
              commentId: 'comment_b',
            },
            displayMessage: {
              body: null,
              title: 'User B commented in a page at Site A',
            },
            createdOn: new Date(),
            type: 'comment_at_site',
            from: '__ref__:users/user_b',
            to: '__ref__:users/user_a',
          },
        },
      },

      pages: {
        __doc__: {
          site_a__page_a: {
            createdOn: new Date('2018-01-01'),
            description: 'Page A Description',
            imageUrl: 'page_a.jpg',
            slug: '%2Ffoo%2Fbar',
            title: 'Page A Title',
            site: '__ref__:sites/site_a',
          },

          site_a__page_b: {
            createdOn: new Date('2018-01-01'),
            description: 'Page B Description',
            imageUrl: 'page_b.jpg',
            slug: '%2Fhello%2Fworld',
            title: 'Page B Title',
            site: '__ref__:sites/site_a',
          },

          site_c__page_a: {
            createdOn: new Date('2018-01-01'),
            description: 'Page A Description',
            imageUrl: 'page_a.jpg',
            slug: '%2Ffoo%2Fbar',
            title: 'Page A Title',
            site: '__ref__:sites/site_c',
          },

          site_d__page_a: {
            createdOn: new Date('2018-01-01'),
            description: 'Page A Description',
            imageUrl: 'page_a.jpg',
            slug: '%2Fhl%2Fbar',
            title: 'Page A Title',
            site: '__ref__:sites/site_d',
          },
        },
      },

      sites: {
        __doc__: {
          site_a: {
            brandColor: '#212121',
            displayName: 'Site A',
            hostname: 'site-a.com',
            imageUrl: 'site_a.jpg',
            isVerified: true,
            name: 'site a',
            theme: 'light',

            __collection__: {
              admins: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                    name: 'user a',
                  },

                  user_c: {
                    cloudFirestoreReference: '__ref__:users/user_c',
                    name: 'user c',
                  },
                },
              },
            },
          },

          site_b: {
            brandColor: '#000',
            displayName: 'Site B',
            hostname: 'site-b.com',
            imageUrl: 'site_b.jpg',
            isVerified: false,
            name: 'site b',
            theme: 'light',

            __collection__: {
              admins: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                    name: 'user a',
                  },
                },
              },
            },
          },

          site_c: {
            brandColor: '#111',
            displayName: 'Site C',
            hostname: 'site-c.com',
            imageUrl: 'site_c.jpg',
            isVerified: false,
            name: 'site c',
            theme: 'light',

            __collection__: {
              admins: {
                __doc__: {
                  user_c: {
                    cloudFirestoreReference: '__ref__:users/user_c',
                    name: 'user c',
                  },
                },
              },
            },
          },

          site_d: {
            brandColor: '#111',
            displayName: 'Site D',
            hostname: 'site-d.com',
            imageUrl: 'site_d.jpg',
            isVerified: false,
            name: 'site d',
            theme: 'light',

            __collection__: {
              admins: {
                __doc__: {
                  user_c: {
                    cloudFirestoreReference: '__ref__:users/user_c',
                    name: 'user c',
                  },
                },
              },
            },
          },
        },
      },

      stickerPacks: {
        __doc__: {
          sticker_pack_a: {
            artist: 'Sticker Pack A artist',
            description: 'Sticker Pack A description',
            name: 'Sticker Pack A',
            thumbnailUrl: 'sticker_pack_a.jpg',
          },

          sticker_pack_b: {
            artist: 'Sticker Pack B artist',
            description: 'Sticker Pack B description',
            name: 'Sticker Pack B',
            thumbnailUrl: 'sticker_pack_b.jpg',
          },
        },
      },

      stickers: {
        __doc__: {
          sticker_a1: {
            description: 'Laughing sticker',
            imageUrl: 'sticker_a1.jpg',
            keywords: ['haha', 'lol', 'laugh'],
            pack: '__ref__:stickerPacks/sticker_pack_a',
          },

          sticker_a2: {
            description: 'Sad sticker',
            imageUrl: 'sticker_a2.jpg',
            keywords: ['sad', 'huhu'],
            pack: '__ref__:stickerPacks/sticker_pack_a',
          },

          sticker_b1: {
            description: 'Wow sticker',
            imageUrl: 'sticker_b1.jpg',
            keywords: ['wow', 'omg'],
            pack: '__ref__:stickerPacks/sticker_pack_b',
          },

          sticker_b2: {
            description: 'Angry sticker',
            imageUrl: 'sticker_b2.jpg',
            keywords: ['angry', 'grr'],
            pack: '__ref__:stickerPacks/sticker_pack_b',
          },
        },
      },

      userMetaInfos: {
        __doc__: {
          user_a: {
            accessToken: { facebook: 'token_user_a' },
            hasNewNotification: true,
            notificationTokens: null,
          },

          user_b: {
            accessToken: null,
            hasNewNotification: true,
            notificationTokens: null,
          },

          user_c: {
            accessToken: null,
            hasNewNotification: false,
            notificationTokens: null,
          },

          user_d: {
            accessToken: null,
            hasNewNotification: false,
            notificationTokens: null,
          },

          user_e: {
            accessToken: null,
            hasNewNotification: false,
            notificationTokens: null,
          },
        },
      },

      users: {
        __doc__: {
          user_a: {
            displayName: 'User A',
            displayUsername: null,
            name: 'user a',
            photoUrl: 'user_a.jpg',
            provider: { facebook: 'fb_user_a' },
            shortBio: null,
            username: null,

            __collection__: {
              chats: {
                __doc__: {
                  site_c__page_a__user_a: {
                    creator: '__ref__:users/user_a',
                    description: 'User C: Message C',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-01'),
                    lastMessage: '__ref__:messages/message_c',
                    name: 'Site C',
                    page: '__ref__:pages/site_c__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_c',
                  },

                  site_a__page_a__user_b: {
                    creator: '__ref__:users/user_b',
                    description: 'User B: Message F',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_f',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_a',
                  },

                  site_a__page_a__user_d: {
                    creator: '__ref__:users/user_d',
                    description: 'User D: Message G',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_g',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_a',
                  },

                  site_a__page_a__user_e: {
                    creator: '__ref__:users/user_e',
                    description: 'User E: Message F',
                    isPublicized: false,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_f',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: null,
                    site: '__ref__:sites/site_a',
                  },
                },
              },

              sitesAsAdmin: {
                __doc__: {
                  site_a: {
                    cloudFirestoreReference: '__ref__:sites/site_a',
                    name: 'site a',
                  },

                  site_b: {
                    cloudFirestoreReference: '__ref__:sites/site_b',
                    name: 'site b',
                  },
                },
              },

              stickerPacks: {
                __doc__: {
                  sticker_pack_a: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_a',
                  },

                  sticker_pack_b: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_b',
                  },
                },
              },
            },
          },

          user_b: {
            displayName: 'User B',
            displayUsername: 'user_b',
            name: 'user b',
            photoUrl: null,
            provider: null,
            shortBio: null,
            username: 'user_b',

            __collection__: {
              chats: {
                __doc__: {
                  site_c__page_a__user_b: {
                    creator: '__ref__:users/user_b',
                    description: 'User C: Message D',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-01'),
                    lastMessage: '__ref__:messages/message_d',
                    name: 'Site C',
                    page: '__ref__:pages/site_c__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_c',
                  },

                  site_a__page_a__user_b: {
                    creator: '__ref__:users/user_b',
                    description: 'User B: Message F',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_f',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_a',
                  },
                },
              },

              stickerPacks: {
                __doc__: {
                  sticker_pack_a: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_a',
                  },

                  sticker_pack_b: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_b',
                  },
                },
              },
            },
          },

          user_c: {
            displayName: 'User C',
            displayUsername: 'user_c',
            name: 'user c',
            photoUrl: null,
            provider: null,
            shortBio: null,
            username: 'user_c',

            __collection__: {
              chats: {
                __doc__: {
                  site_c__page_a__user_a: {
                    creator: '__ref__:users/user_a',
                    description: 'User C: Message C',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-01'),
                    lastMessage: '__ref__:messages/message_c',
                    name: 'Site C',
                    page: '__ref__:pages/site_c__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_c',
                  },

                  site_c__page_a__user_b: {
                    creator: '__ref__:users/user_b',
                    description: 'User C: Message D',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-01'),
                    lastMessage: '__ref__:messages/message_d',
                    name: 'Site C',
                    page: '__ref__:pages/site_c__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_c',
                  },

                  site_c__page_a__user_d: {
                    creator: '__ref__:users/user_d',
                    description: 'User C: Message E',
                    isPublicized: false,
                    lastActivityTimestamp: new Date('2018-01-01'),
                    lastMessage: '__ref__:messages/message_e',
                    name: 'Site C',
                    page: '__ref__:pages/site_c__page_a',
                    publicizedTitle: null,
                    site: '__ref__:sites/site_c',
                  },

                  site_a__page_a__user_b: {
                    creator: '__ref__:users/user_b',
                    description: 'User B: Message F',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_f',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_a',
                  },

                  site_a__page_a__user_d: {
                    creator: '__ref__:users/user_d',
                    description: 'User D: Message G',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_g',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_a',
                  },

                  site_a__page_a__user_e: {
                    creator: '__ref__:users/user_e',
                    description: 'User E: Message F',
                    isPublicized: false,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_f',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: null,
                    site: '__ref__:sites/site_a',
                  },
                },
              },

              sitesAsAdmin: {
                __doc__: {
                  site_a: {
                    cloudFirestoreReference: '__ref__:sites/site_a',
                    name: 'site a',
                  },

                  site_c: {
                    cloudFirestoreReference: '__ref__:sites/site_c',
                    name: 'site c',
                  },

                  site_d: {
                    cloudFirestoreReference: '__ref__:sites/site_d',
                    name: 'site d',
                  },
                },
              },

              stickerPacks: {
                __doc__: {
                  sticker_pack_a: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_a',
                  },

                  sticker_pack_b: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_b',
                  },
                },
              },
            },
          },

          user_d: {
            displayName: 'User D',
            displayUsername: 'user_d',
            name: 'user d',
            photoUrl: null,
            provider: null,
            shortBio: null,
            username: 'user_d',

            __collection__: {
              chats: {
                __doc__: {
                  site_c__page_a__user_d: {
                    creator: '__ref__:users/user_d',
                    description: 'User C: Message E',
                    isPublicized: false,
                    lastActivityTimestamp: new Date('2018-01-01'),
                    lastMessage: '__ref__:messages/message_e',
                    name: 'Site C',
                    page: '__ref__:pages/site_c__page_a',
                    publicizedTitle: null,
                    site: '__ref__:sites/site_c',
                  },

                  site_a__page_a__user_d: {
                    creator: '__ref__:users/user_d',
                    description: 'User D: Message G',
                    isPublicized: true,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_g',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: 'Publicized Chat',
                    site: '__ref__:sites/site_a',
                  },
                },
              },

              stickerPacks: {
                __doc__: {
                  sticker_pack_a: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_a',
                  },

                  sticker_pack_b: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_b',
                  },
                },
              },
            },
          },

          user_e: {
            displayName: 'User E',
            displayUsername: 'user_e',
            name: 'user e',
            photoUrl: null,
            provider: null,
            shortBio: null,
            username: 'user_e',

            __collection__: {
              chats: {
                __doc__: {
                  site_a__page_a__user_e: {
                    creator: '__ref__:users/user_e',
                    description: 'User E: Message F',
                    isPublicized: false,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_f',
                    name: 'Site B',
                    page: '__ref__:pages/site_a__page_a',
                    publicizedTitle: null,
                    site: '__ref__:sites/site_a',
                  },
                },
              },

              stickerPacks: {
                __doc__: {
                  sticker_pack_a: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_a',
                  },

                  sticker_pack_b: {
                    cloudFirestoreReference: '__ref__:stickerPacks/sticker_pack_b',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}
