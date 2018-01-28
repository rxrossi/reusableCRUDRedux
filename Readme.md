# Reusable CRUD Redux

For certain applications, writing reducers and actions (including async) to deal with list of entities like clients, professionals, magic cubes and dragons can become redundant.

With this module, it can be as easy as this:

```js
import reusable from 'reusablecrudredux'

const { reducer, asyncActions } = reusableCRUDRedux('http://api.com/clients', 'clients');
```

The first argument is the endpoint of the API for POST, PUT, GET and DELETE
The second argument is the name of where you plan to store is in state, in the example above you will have a structure like this

```js
state = {
  clients: {
    entities: [],
    APIStatus,
    formFields,
  }
}
```

The usage of APIStatus and formFields is optional and will be explained in the section bellow

For the asyncActions we have asyncActions.get, asyncActions.post(body), asyncActions.put(body), asyncActions.delete(id)

It also supports jwt, for this you would initiate like this:

```js
import reusable from 'reusablecrudredux'

const { reducer, asyncActions } = reusableCRUDRedux('http://api.com/clients', 'clients', headerCreator);
```

headerCreator needs to be a function that will return an object, like this:

```js
export const headerCreator = () => ({
  'Content-Type': 'application/json',
  authorization: localStorage.getItem('token'),
});
```

# APIStatus
it has the following structure:

```js
APIStatus: {
    get: {
      working: false,
      errors: {},
    },
    post: {
      working: false,
      errors: {},
    },
    put: {
      working: false,
      errors: {},
    },
    delete: {
      working: false,
      errors: {},
    },
}
```

# formFields
it has the following structure

```js
formFields: {
  create: {},
  update: {},
}
```

Create is for forms that are creating new entities, like a new client
Update is for forms that are updating entities

The structure is a flexible as possible, it supports arrays of fields, like in case you are registering a person, and wants dynamic sets of fields for each son

To use it:

```js
const { createFormFieldsActions, updateFormFieldActions } = reusableCRUDRedux('http://api.com/clients', 'clients', headerCreator);
```

These functions have the same methods:
```js
.clear() //Clears all the fields
```

```js
.changeField(name, value):
```
Calling the above like createFormFieldsActions.changeField(age, 18) will produce the following result:

```js
formFields: {
  create: {
    age: 18
  },
  update: {},
}
```


It is possible to call it like this too

```js
createFormFieldsActions.changeField([sons, 1, name], Josh)
```

And it will produce:

```js
formFields: {
  create: {
    age: 18,
    sons: [
      name: 'Josh',
    ],
  },
  update: {},
}
```

A submit could be like this:

```js
asyncActions.post(state.clients.create)
```
