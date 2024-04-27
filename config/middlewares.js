const middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['*'],
    },
    ...middlewares.reduce((acc, middleware) => {
      const [namespace, name] = middleware.split('::');
      acc[name] = { enabled: true };
      return acc;
    }, {}),
  },
};