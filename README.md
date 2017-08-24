# InstaMeow

<img src="https://github.com/Osedea/react-native-offline-first-example/raw/master/js/images/InstaCat@1x.png" width=400 height=400 />

Example App using best practices for React Native offline behaviour (InstaMeow) presented at React Native EU 2017

The app is available on the [App Store](#TODO) and on the [Play Store](#TODO).

The backend is also available here: [Osedea/react-native-offline-first-example-backend](https://github.com/Osedea/react-native-offline-first-example-backend.git)

The slides of the présentation will be added to this repository when ready.

## Concepts

* Use local data whenever possible
* Separate your app’s UI from its data
* Assume your app can be closed at any time
* As many actions as possible should be doable offline
* The User should always have access to previous or critical data
* Adaptive UI
* Be optimistic (UI) / Be pessimistic / Be pragmatic

## Key takaways

* The UI should adapt to communicate to the User the degraded state of the App
* Be optimistic, pessimistic and pragmatic considering requests
* Save your application state often
* Trust your device, don’t trust your connectivity

## Key packages

* [rauliyohmc/react-native-offline](https://github.com/rauliyohmc/react-native-offline)
* [rt2zz/redux-persist](https://github.com/rt2zz/redux-persist/)
* [andpor/react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage)
* [RealmDB](https://github.com/realm/realm-js)
* [Osedea/redux-persist-realm](https://github.com/Osedea/redux-persist-realm)

## Resources

* https://github.com/jevakallio/redux-offline
* https://developer.chrome.com/apps/offline_apps
* http://offlinefirst.org/
* https://blog.callstack.io/your-react-native-offline-tool-belt-795abd5f0183
* https://github.com/offlinefirst/research/blob/master/links.md
* https://medium.com/differential/building-offline-first-react-native-apps-b958acac0009
* https://medium.com/differential/handling-offline-actions-in-react-native-74949cbfabf2
