# z-mirror-2

> My homemade smartmirror v2

## Create your own mirror

* fork the project
* create a new netlify site with your url
* add the environment variables with your values :
  * [OpenWeatherMap](https://openweathermap.org/) api key
    * VUE_APP_OPENWEATHERMAP_API_KEY
  * [Firebase](https://firebase.google.com/) database & auth 
    * VUE_APP_FIREBASE_API_KEY
    * VUE_APP_FIREBASE_AUTH_DOMAIN
    * VUE_APP_FIREBASE_DATABASE_URL
    * VUE_APP_FIREBASE_PROJECT_ID
    * VUE_APP_FIREBASE_STORAGE_BUCKET
    * VUE_APP_FIREBASE_MESSAGEING_SENDER_ID
* deploy your new website
* enjoy!

## Contribute

Don't forget to create accounts and api keys on [OpenWeatherMap](https://openweathermap.org/) and [Firebase](https://firebase.google.com/)

```bash
git clone https://github.com/benavern/z-mirror-2.git && cd z-mirror-2
npm i
npm run serve
```
