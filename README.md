# Hooks
## useEventDispatchAndLog
This hook responsible for handling network requests initated by the user and also create logs of these events.
### Return values
- **eventDispatcher**: Method creates log and makes network request. Network request can happen directly from the hook or in redux asyncthunk. The method gets the following props: eventType (tpye of the event e.g: ADD_TODO), persistConfig (contains the the action to dispatch to redux),networkConfig (contains the endpoint and method needed for the network request). Based on these props the hook can persist the logs or make request without persist. 
- **sessionCounter**: Counter of events handled by hook
- **logCounter**: Counter of all events handled

# Sceens

## TodoList
Screen responsible for listing todo items. You can add and remove items.

## Admin
Shows the log made sincle lunch of the app, also older logs that are not synced with server (due to network error or other error).
You can start manual sync which makes the network requests again on unsynced logs and removes synced logs.


#  App lunch event

At the lunch of the app there is an automatic sync of the logs. The lunch itself is not logged.

# Network requests
Request are made using the axios library. The requests are mocked using the axios-mock-adapter, All request with a ~50% chance returns a 200 answer with the body of the request or a 500 error.

# Start the application
App created with the help of expo-cli. Can be lunched with yarn start or npm start.
1. yarn install
2. yarn start

