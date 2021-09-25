# Strapi plugin database-storage

## How to install

```
# using yarn
yarn add strapi-plugin-upload-database

# using npm
npm install strapi-plugin-upload-database --save
```

## Configuration

You need to update the `upload` section of your `config/plugins.js` file in order to use this plugin :

Example

```
module.exports = ({env}) => {
  return {
    upload: {
      provider: 'database',
      providerOptions: {
        absoluteUrl: true
      }
    },
    // ...
  };
};
```

## Provider Options

In the `config/plugins.js` you can configure this provider using the providerOptions attribute :

| Variable                | Type                    | Description                                                                                         | Required | Default   |
| ----------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- | -------- | --------- |
| absoluteUrl             | boolean                 | Shall we store files with absolute url to strapi or relative one                                    | no       | true      |


## Permissions

If you want to access images uploaded using this plugin directly from a `<img>` markup, you need to update strapi public permission.

To define this permission, on your strapi admin page, go to Settings > Users & permissions plugin > Roles > Public and check the Database Storage > get permission :

![permissions](https://github.com/yakanet/strapi-plugin-database/blob/main/documentation/permissions.png?raw=true)


## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)