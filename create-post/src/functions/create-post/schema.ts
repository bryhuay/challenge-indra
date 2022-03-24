export default {
  type: "object",
  properties: {
    author: { type: 'string' },
    review: { type: 'string' },
    title: { type: 'string' },
    observation: { type: 'string' }
  },
  required: ['author','review','title']
} as const;