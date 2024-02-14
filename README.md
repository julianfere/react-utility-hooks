<a id="readme-top"></a>

<br />
<div align="center">
<h3 align="center">React Utility Hooks</h3>

  <p align="center">
    A type safe, functional, and easy to use utility library for React Hooks.
    <br />
    <a href="https://github.com/julianfere/react-utility-hooks"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/julianfere/react-utility-hooks">View Demo</a>
    ·
    <a href="https://github.com/julianfere/react-utility-hooks/issues">Report Bug</a>
    ·
    <a href="https://github.com/julianfere/react-utility-hooks/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<section id="table-of-content">
 <h2>Table of Contents</h2>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="">Hooks</a>
      <ul id="hooks">
        <li><a href="#useasync">useAsync</a></li>
        <li><a href="#usedebounce">useDebounce</a></li>
        <li><a href="#usethrottle">useThrottle</a></li>
        <li><a href="#uselocalstorage">useLocalStorage</a></li>
        <li><a href="#usedelay">useDelay</a></li>
        <li><a href="#usedocumenttitle">useDocumentTitle</a></li>
        <li><a href="#usequeryparams">useQueryParams</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</section>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a collection of React Hooks that I have found useful in my own projects. I hope you find them useful as well!. The idea is to build a library of hooks that are easy to use, type safe, and functional.


<!-- GETTING STARTED -->

## Getting Started

### Installation

```sh
npm i @julianfere/react-utility-hooks
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- HOOKS -->
## useAsync

  <h4>Overview</h4>
  <p>useAsync is a custom React hook designed to simplify the management of asynchronous operations in React components. It provides a clean and consistent way to handle asynchronous function calls and their associated states.
  </p>

  <h4>Example</h4>

  ```typescript
  import React from "react";
  import { useAsync } from "@julianfere/react-utility-hooks";

    const fetchData = async () => {
      // Your asynchronous operation here
      // e.g., fetching data from an API
    };

    const BasicExampleAutomatic = () => {
      const { state } = useAsync(() => fetchData());

      return (
        <>
          {state === "pending" && <p>Loading...</p> }
          {state === "fulfilled" && <p>Data loaded successfully!</p>}
          {state === "rejected" && <p>Error loading data.</p>}
        </>
      );
    };

  const CompleteExampleManua = () => {
    const [data, setData] = useState(null);

    const { run, state } = useAsync(() => fetchData(), {
      manual: true,
      onSuccess: (data) => setData(data),
      onError: (error) => console.log(error),
    });

    return (
      <>
        {state === "pending" && <p>Loading...</p> }
        {state === "fulfilled" && <p>Data loaded successfully!</p>}
        {state === "rejected" && <p>Error loading data.</p>}
        <button onClick={run}>Fetch Data</button>
      </>
    )
  }
  ```


  <h4>API</h4>

  ```typescript 
  const { run, state } = useAsync(() => asyncFunction(), options)
  ```
  
`asyncFunction`: The asynchronous function that will be executed.
`options`: (Optional) Configuration options for the useAsync hook.

**Options**: 

`manual` (default: false): If set to true, the asynchronous function won't run automatically on component mount. You must call run manually. Otherwise, the asynchronous function will run automatically on component mount.
`onSuccess`: A callback function that will be executed when the asynchronous function resolves successfully.
`onError`: A callback function that will be executed when the asynchronous function encounters an error.

**Returned Values**:
`run`: A function that triggers the execution of the asynchronous function. If manual is set to true, this function will throw an error, reminding you to set manual to true.
`state`: A string representing the current state of the asynchronous operation. Possible values are **idle**, **pending**, **fulfilled**, or **rejected**.
  </section>
</section>

---

## useDebounce
  
  <h4>Overview</h4>
    <p>useDebounce is a custom React hook designed to simplify the management of debounced values in React components. It provides a clean and consistent way to handle debounced values and their associated states.
    </p>
  <br/>

  <h4>Example</h4>
  
  
  ```typescript
import React, { useState } from "react";

import { useDebounce } from "@hooks";

const BasicExample = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => { makeApiCall(debouncedValue); }, [debouncedValue]);

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Debounced value: {debouncedValue}</p>
    </>
  );
};
  ```

  <h4>API</h4>

```typescript

const debouncedValue = useDebounce(value, delay);
```

`value`: The value to be debounced.
`delay`: The delay in milliseconds to wait before updating the debounced value. Defaults to 500ms.
<p align="right">(<a href="#hooks">back to hooks</a>)</p>

## useThrottle

  <h4>Overview</h4>
    <p>useThrottle is a custom React hook designed to simplify the management of throttled values in React components. It provides a clean and consistent way to handle throttled values and their associated states.
    </p>
  <br/>

  <h4>Example</h4>
  
  ```typescript
import React, { useState } from "react";

import { useThrottle } from "@hooks";

const BasicExample = () => {
  const [value, setValue] = useState("");
  const throttledValue = useThrottle(value, 500);

  useEffect(() => { makeApiCall(throttledValue); }, [throttledValue]);

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Throttled value: {throttledValue}</p>
    </>
  );
};
  ```

  <h4>API</h4>

```typescript

const throttledValue = useThrottle(value, delay);
```

`value`: The value to be throttled.
`delay`: The delay in milliseconds to wait before updating the throttled value. Defaults to 500ms.

<p align="right">(<a href="#hooks">back to hooks</a>)</p>


## useLocalStorage

  <h4>Overview</h4>
    <p>useLocalStorage is a custom React hook designed to simplify the management of local storage in React components. It provides a clean and consistent way to handle local storage and its associated states.
    </p>
  <br/>

  <h4>Example</h4>
  
  ```typescript
  import { useLocalStorage } from "@hooks";

  type UseLocalStorageType = {
    name: string;
    age: number;
  }

  const BasicExample = () => {
    const { getItem, setItem, removeItem, hasItem, clear } = useLocalStorage<UseLocalStorageType>();
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    return (
      <>
        <input onChange={(e) => setKey(e.value)} />
        <input onChange={(e) => setValue(e.value)} />
        <p>{key} is {getItem(key)}</p>
        <button onClick={() => setItem(key, value)}>Set Item</button>
        <button onClick={() => removeItem(key)}>Remove Item</button>
        <button onClick={() => clear()}>Clear</button>
      </input>
    );
  };
```

  <h4>API</h4>

```typescript
const { getItem, setItem, removeItem, hasItem, clear } = useLocalStorage<T>();
```

`T`: The type of the value to be stored in local storage.

**Returned Values**:
`getItem`: A function that retrieves the value associated with the specified key from local storage.
`setItem`: A function that stores the specified value in local storage, associated with the specified key.
`removeItem`: A function that removes the specified key and its associated value from local storage.
`hasItem`: A function that returns true if the specified key exists in local storage, and false otherwise.
`clear`: A function that removes all keys and their associated values from local storage.

<p align="right">(<a href="#hooks">back to hooks</a>)</p>

## useDelay

  <h4>Overview</h4>
    <p>useDelay is a custom React hook designed to simplify the management of delayed values in React components. It provides a clean and consistent way to handle delayed values and their associated states.
    </p>
  <br/>

  <h4>Example</h4>
  
  ```typescript
  import {useDelay} from "@hooks";

  const BasicExample = () => {
    const [value, setValue] = useState("");

    const updateValue = (val: string)=> {
      setValue(val);
    }

    useDelay(() => updateValue("Delayed value"));

    const runDelay = useDelay(() => updateValue("Manual value"), {manual: true, delay: 1000});
import React, { useState } from "react";

import { useDebounce } from "@hooks";

const BasicExample = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => { makeApiCall(debouncedValue); }, [debouncedValue]);

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Debounced value: {debouncedValue}</p>
    </>
  );
};
  ```

  <h4>API</h4>

```typescript

const debouncedValue = useDebounce(value, delay);
```

`value`: The value to be debounced.
`delay`: The delay in milliseconds to wait before updating the debounced value. Defaults to 500ms.
<p align="right">(<a href="#hooks">back to hooks</a>)</p>

## useThrottle

  <h4>Overview</h4>
    <p>useThrottle is a custom React hook designed to simplify the management of throttled values in React components. It provides a clean and consistent way to handle throttled values and their associated states.
    </p>
  <br/>

  <h4>Example</h4>
  
  ```typescript
import React, { useState } from "react";

import { useThrottle } from "@hooks";

const BasicExample = () => {
  const [value, setValue] = useState("");
  const throttledValue = useThrottle(value, 500);

  useEffect(() => { makeApiCall(throttledValue); }, [throttledValue]);

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Throttled value: {throttledValue}</p>
    </>
  );
};
  ```

  <h4>API</h4>

```typescript

const throttledValue = useThrottle(value, delay);
```

`value`: The value to be throttled.
`delay`: The delay in milliseconds to wait before updating the throttled value. Defaults to 500ms.

<p align="right">(<a href="#hooks">back to hooks</a>)</p>


## useLocalStorage

  <h4>Overview</h4>
    <p>useLocalStorage is a custom React hook designed to simplify the management of local storage in React components. It provides a clean and consistent way to handle local storage and its associated states.
    </p>
  <br/>

  <h4>Example</h4>
  
  ```typescript
  import { useLocalStorage } from "@hooks";

  type UseLocalStorageType = {
    name: string;
    age: number;
  }

  const BasicExample = () => {
    const { getItem, setItem, removeItem, hasItem, clear } = useLocalStorage<UseLocalStorageType>();
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    return (
      <>
        <input onChange={(e) => setKey(e.value)} />
        <input onChange={(e) => setValue(e.value)} />
        <p>{key} is {getItem(key)}</p>
        <button onClick={() => setItem(key, value)}>Set Item</button>
        <button onClick={() => removeItem(key)}>Remove Item</button>
        <button onClick={() => clear()}>Clear</button>
      </input>
    );
  };
```

  <h4>API</h4>

```typescript
const { getItem, setItem, removeItem, hasItem, clear } = useLocalStorage<T>();
```

`T`: The type of the value to be stored in local storage.

**Returned Values**:
`getItem`: A function that retrieves the value associated with the specified key from local storage.
`setItem`: A function that stores the specified value in local storage, associated with the specified key.
`removeItem`: A function that removes the specified key and its associated value from local storage.
`hasItem`: A function that returns true if the specified key exists in local storage, and false otherwise.
`clear`: A function that removes all keys and their associated values from local storage.

<p align="right">(<a href="#hooks">back to hooks</a>)</p>

## useDelay

  <h4>Overview</h4>
    <p>useDelay is a custom React hook designed to simplify the management of delayed values in React components. It provides a clean and consistent way to handle delayed values and their associated states.
    </p>
  <br/>

  <h4>Example</h4>
  
  ```typescript
  import {useDelay} from "@hooks";

  const BasicExample = () => {
    const [value, setValue] = useState("");

    const updateValue = (val: string)=> {
      setValue(val);
    }

    useDelay(() => updateValue("Delayed value"));

    const runDelay = useDelay(() => updateValue("Manual value"), {manual: true, delay: 1000});

    return (
      <>
        <button onClick={runDelay}>Run manual delay</button>
        <p>Delayed value: {delayedValue}</p>
      </>
    );
  };
```

  <h4>API</h4>

```typescript
const delayedValue = useDelay(callback, options);
```

`callback`: The function to be delayed.
`options`: (Optional) Configuration options for the useDelay hook.
  - `manual` (default: false): If set to true, the delayed function won't run automatically on component mount. You must call run manually. Otherwise, the delayed function will run automatically on component mount.
  - `delay`: The delay in milliseconds to wait before running the delayed function. Defaults to 250ms.

**Returned Values**:

`run`: A function that triggers the execution of the delayed function. If manual is set to true, this function will throw an error, reminding you to set manual to true.

<p align="right">(<a href="#hooks">back to hooks</a>)</p>

## useDocumentTitle

  <h4>Overview</h4>
    <p>useDocumentTitle is a custom React hook designed to simplify the management of the document title in React components. It provides a clean and consistent way to handle the document title and its associated states.
    </p>
  <br/>

  <h4>Example</h4>
  
  ```typescript
  import {useDocumentTitle} from "@hooks";

  const BasicExample = () => {
    useDocumentTitle("New Title");

    return (
      <>
        <p>Document title has been updated to "New Title"</p>
      </>
    );
  };
```

  <h4>API</h4>

```typescript
useDocumentTitle(title, persistOnUnmount);
```

`title`: The new title for the document.
`persistOnUnmount`: (Optional) If set to true, the document title will persist after the component unmounts. Defaults to false.


<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/julianfere/react-utility-hooks](https://github.com/julianfere/react-utility-hooks)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
