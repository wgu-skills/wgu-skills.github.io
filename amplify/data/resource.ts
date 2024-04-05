import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({

  Skill: a
    .model({
      name: a.string(),
      description: a.string(),
      dateCreated: a.datetime(),
    }),

  Occupation: a
    .model({
      code: a.string(),
      targetNodeName: a.string(),
      frameworkName: a.string(),
    }).authorization([a.allow.public()]),

  Category: a
    .model({
      name: a.string(),
      description: a.string(),
      keywords: a.string().array(),
      dateCreated: a.datetime(),

    })
    .authorization([a.allow.public()]),

  Keywords: a
    .model({
      name: a.string(),
      description: a.string(),
      dateCreated: a.datetime(),
    })
    .authorization([a.allow.public()]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
