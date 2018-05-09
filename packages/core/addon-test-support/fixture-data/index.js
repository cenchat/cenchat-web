/**
 * Returns the fixture data
 *
 * @return {Object} Fixture data
 */
export default function getFixtureData() {
  return {
    __collection__: {
      betaTesters: {
        __doc__: {
          user_a: {
            monthlyViews: 'lt-1m',
            status: 'approved',
            website: 'https://cenchat.com',
            cloudFirestoreReference: 'user_a',
          },
        },
      },

      comments: {
        __doc__: {
          comment_a: {
            attachments: [{
              id: 'sticker_a1',
              type: 'sticker',
            }, {
              id: 'sticker_b1',
              type: 'sticker',
            }],
            author: '__ref__:users/user_a',
            createdOn: new Date('2017-01-01'),
            isDeleted: false,
            page: '__ref__:pages/site_a__page_a',
            replyTo: null,
            root: null,
            site: '__ref__:sites/site_a',
            status: 'approved',
            taggedEntities: {
              user_b: 'user',
            },
            text: null,
          },

          comment_b: {
            attachments: [{
              id: 'sticker_a1',
              type: 'sticker',
            }, {
              id: 'sticker_b1',
              type: 'sticker',
            }],
            author: '__ref__:users/user_b',
            createdOn: new Date('2017-01-02'),
            isDeleted: false,
            page: '__ref__:pages/site_a__page_a',
            replyTo: '__ref__:comments/comment_a',
            root: '__ref__:comments/comment_a',
            site: '__ref__:sites/site_a',
            status: 'approved',
            taggedEntities: null,
            text: 'Foobar',
          },

          comment_c: {
            attachments: [{
              id: 'sticker_a1',
              type: 'sticker',
            }, {
              id: 'sticker_b1',
              type: 'sticker',
            }],
            author: '__ref__:users/user_a',
            createdOn: new Date('2017-01-03'),
            isDeleted: false,
            page: '__ref__:pages/site_a__page_a',
            replyTo: '__ref__:comments/comment_b',
            root: '__ref__:comments/comment_a',
            site: '__ref__:sites/site_a',
            status: 'approved',
            taggedEntities: null,
            text: 'Foobar',
          },

          comment_d: {
            attachments: [{
              id: 'sticker_a1',
              type: 'sticker',
            }, {
              id: 'sticker_b1',
              type: 'sticker',
            }],
            author: '__ref__:users/user_b',
            createdOn: new Date('2017-01-04'),
            isDeleted: false,
            page: '__ref__:pages/site_a__page_a',
            replyTo: '__ref__:comments/comment_a',
            root: '__ref__:comments/comment_a',
            site: '__ref__:sites/site_a',
            status: 'approved',
            taggedEntities: null,
            text: 'Foobar',
          },

          comment_e: {
            attachments: [{
              id: 'sticker_a1',
              type: 'sticker',
            }, {
              id: 'sticker_b1',
              type: 'sticker',
            }],
            author: '__ref__:users/user_b',
            createdOn: new Date('2017-01-05'),
            isDeleted: false,
            page: '__ref__:pages/site_a__page_a',
            replyTo: '__ref__:comments/comment_a',
            root: '__ref__:comments/comment_a',
            site: '__ref__:sites/site_a',
            status: 'approved',
            taggedEntities: null,
            text: 'Foobar',
          },

          comment_f: {
            attachments: [{
              id: 'sticker_a1',
              type: 'sticker',
            }, {
              id: 'sticker_b1',
              type: 'sticker',
            }],
            author: '__ref__:users/user_b',
            createdOn: new Date('2017-01-02'),
            isDeleted: false,
            page: '__ref__:pages/site_a__page_a',
            replyTo: '__ref__:comments/comment_a',
            root: '__ref__:comments/comment_a',
            site: '__ref__:sites/site_a',
            status: 'rejected',
            taggedEntities: null,
            text: 'Foobar',
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
            description: 'Page A Description',
            imageUrl: 'page_a.jpg',
            slug: '%2Ffoo%2Fbar',
            timestamp: new Date(),
            title: 'Page A Title',
            site: '__ref__:sites/site_a',
          },

          site_a__page_b: {
            description: 'Page B Description',
            imageUrl: 'page_b.jpg',
            slug: '%2Fhello%2Fworld',
            timestamp: new Date(),
            title: 'Page B Title',
            site: '__ref__:sites/site_a',
          },
        },
      },

      sites: {
        __doc__: {
          site_a: {
            hostname: 'site-a.com',
            imageUrl: 'site_a.jpg',
            isVerified: true,
            name: 'Site A',
            theme: 'light',

            __collection__: {
              admins: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                  },

                  user_c: {
                    cloudFirestoreReference: '__ref__:users/user_c',
                  },
                },
              },
            },
          },

          site_b: {
            hostname: 'site-b.com',
            imageUrl: 'site_b.jpg',
            isVerified: false,
            name: 'Site B',
            theme: 'light',

            __collection__: {
              admins: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                  },
                },
              },
            },
          },

          site_c: {
            hostname: 'site-c.com',
            imageUrl: 'site_c.jpg',
            isVerified: false,
            name: 'Site C',
            theme: 'light',

            __collection__: {
              admins: {
                __doc__: {
                  user_c: {
                    cloudFirestoreReference: '__ref__:users/user_c',
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
            keyword1: 'haha',
            keyword2: 'lol',
            keyword3: 'laugh',
            pack: '__ref__:stickerPacks/sticker_pack_a',
          },

          sticker_a2: {
            description: 'Sad sticker',
            imageUrl: 'sticker_a2.jpg',
            keyword1: 'sad',
            keyword2: 'huhu',
            pack: '__ref__:stickerPacks/sticker_pack_a',
          },

          sticker_b1: {
            description: 'Wow sticker',
            imageUrl: 'sticker_b1.jpg',
            keyword1: 'wow',
            keyword2: 'omg',
            pack: '__ref__:stickerPacks/sticker_pack_b',
          },

          sticker_b2: {
            description: 'Angry sticker',
            imageUrl: 'sticker_b2.jpg',
            keyword1: 'angry',
            keyword2: 'grr',
            pack: '__ref__:stickerPacks/sticker_pack_b',
          },
        },
      },

      userMetaInfos: {
        __doc__: {
          user_a: {
            facebookAccessToken: null,
            hasNewNotification: true,
          },

          user_b: {
            facebookAccessToken: null,
            hasNewNotification: true,
          },

          user_c: {
            facebookAccessToken: null,
            hasNewNotification: false,
          },

          user_d: {
            facebookAccessToken: null,
            hasNewNotification: false,
          },
        },
      },

      users: {
        __doc__: {
          user_a: {
            displayName: 'User A',
            facebookId: null,
            photoUrl: 'user_a.jpg',

            __collection__: {
              followers: {
                __doc__: {
                  user_b: {
                    cloudFirestoreReference: '__ref__:users/user_b',
                  },
                },
              },

              followingComments: {
                __doc__: {
                  comment_b: {
                    attachments: [{
                      id: 'sticker_a1',
                      type: 'sticker',
                    }, {
                      id: 'sticker_b1',
                      type: 'sticker',
                    }],
                    author: '__ref__:users/user_b',
                    createdOn: new Date('2017-01-02'),
                    isDeleted: false,
                    page: '__ref__:pages/site_a__page_a',
                    replyTo: '__ref__:comments/comment_a',
                    root: '__ref__:comments/comment_a',
                    site: '__ref__:sites/site_a',
                    status: 'approved',
                    taggedEntities: null,
                    text: 'Foobar',
                  },

                  comment_d: {
                    attachments: [{
                      id: 'sticker_a1',
                      type: 'sticker',
                    }, {
                      id: 'sticker_b1',
                      type: 'sticker',
                    }],
                    author: '__ref__:users/user_b',
                    createdOn: new Date('2017-01-04'),
                    isDeleted: false,
                    page: '__ref__:pages/site_a__page_a',
                    replyTo: '__ref__:comments/comment_a',
                    root: '__ref__:comments/comment_a',
                    site: '__ref__:sites/site_a',
                    status: 'approved',
                    taggedEntities: null,
                    text: 'Foobar',
                  },

                  comment_e: {
                    attachments: [{
                      id: 'sticker_a1',
                      type: 'sticker',
                    }, {
                      id: 'sticker_b1',
                      type: 'sticker',
                    }],
                    author: '__ref__:users/user_b',
                    createdOn: new Date('2017-01-05'),
                    isDeleted: false,
                    page: '__ref__:pages/site_a__page_a',
                    replyTo: '__ref__:comments/comment_a',
                    root: '__ref__:comments/comment_a',
                    site: '__ref__:sites/site_a',
                    status: 'approved',
                    taggedEntities: null,
                    text: 'Foobar',
                  },

                  comment_f: {
                    attachments: [{
                      id: 'sticker_a1',
                      type: 'sticker',
                    }, {
                      id: 'sticker_b1',
                      type: 'sticker',
                    }],
                    author: '__ref__:users/user_b',
                    createdOn: new Date('2017-01-02'),
                    isDeleted: false,
                    page: '__ref__:pages/site_a__page_a',
                    replyTo: '__ref__:comments/comment_a',
                    root: '__ref__:comments/comment_a',
                    site: '__ref__:sites/site_a',
                    status: 'rejected',
                    taggedEntities: null,
                    text: 'Foobar',
                  },
                },
              },

              followings: {
                __doc__: {
                  user_b: {
                    cloudFirestoreReference: '__ref__:users/user_b',
                  },

                  user_d: {
                    cloudFirestoreReference: '__ref__:users/user_d',
                  },
                },
              },

              sitesAsAdmin: {
                __doc__: {
                  site_a: {
                    cloudFirestoreReference: '__ref__:sites/site_a',
                  },

                  site_b: {
                    cloudFirestoreReference: '__ref__:sites/site_b',
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
            facebookId: null,
            photoUrl: 'user_b.jpg',
            username: 'user_b',

            __collection__: {
              followers: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                  },
                },
              },

              followingComments: {
                comment_a: {
                  attachments: [{
                    id: 'sticker_a1',
                    type: 'sticker',
                  }, {
                    id: 'sticker_b1',
                    type: 'sticker',
                  }],
                  author: '__ref__:users/user_a',
                  createdOn: new Date('2017-01-01'),
                  isDeleted: false,
                  page: '__ref__:pages/site_a__page_a',
                  replyTo: null,
                  root: null,
                  site: '__ref__:sites/site_a',
                  status: 'approved',
                  taggedEntities: {
                    user_b: 'user',
                  },
                  text: null,
                },

                comment_c: {
                  attachments: [{
                    id: 'sticker_a1',
                    type: 'sticker',
                  }, {
                    id: 'sticker_b1',
                    type: 'sticker',
                  }],
                  author: '__ref__:users/user_a',
                  createdOn: new Date('2017-01-03'),
                  isDeleted: false,
                  page: '__ref__:pages/site_a__page_a',
                  replyTo: '__ref__:comments/comment_b',
                  root: '__ref__:comments/comment_a',
                  site: '__ref__:sites/site_a',
                  status: 'approved',
                  taggedEntities: null,
                  text: 'Foobar',
                },
              },

              followings: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
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
            facebookId: null,
            photoUrl: 'user_c.jpg',
            username: 'user_c',

            __collection__: {
              sitesAsAdmin: {
                __doc__: {
                  site_a: {
                    cloudFirestoreReference: '__ref__:sites/site_a',
                  },

                  site_c: {
                    cloudFirestoreReference: '__ref__:sites/site_c',
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
            facebookId: null,
            photoUrl: 'user_d.jpg',
            username: 'user_d',

            __collection__: {
              followers: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
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
