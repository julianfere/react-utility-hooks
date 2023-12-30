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
        <li class="hook-link">🚀<a href="#useAsync">useAsync</a></li>
        <li>🔍 <a href="#useQueryParams">useQueryParams</a></li>
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
<section id="useAsync" class='hook-container'>
  <section class="hook-title-container">
    <h2 id="useAsync" class="hook-title">useAsync</h2>
    <a href="https://codesandbox.io/p/sandbox/demo-useasync-3g4gk4">🚀 Codesandbox demo</a>
  </section>
  <br/>
  <section class="hook-content">
    <h4>Overview</h4>
    <p>useAsync is a custom React hook designed to simplify the management of asynchronous operations in React components. It provides a clean and consistent way to handle asynchronous function calls and their associated states.
    </p>
  <br/>

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

<section id="useQueryParams">
  <section class="hook-title-container">
    <h2 id="useAsync" class="hook-title">useQueryParams</h2>
    <a href="https://codesandbox.io/p/sandbox/demo-useasync-3g4gk4">🔍 Codesandbox demo</a>
  </section>
  <h4>Overview</h4>
  <p>useQueryParams is a custom React hook designed to simplify the management of query parameters in React components. It provides a clean and consistent way to handle query parameters and their associated states.
  </p>
  <br/>

  <h4>Example</h4>

  ```typescript
    type UsersQueryParams = {
      page: number;
      limit: number;
      search: string;
    };

    const Users = () => {
      const { get, set } = useQueryParams<UsersQueryParams>();

      const { page, limit, search } = get('page', 'limit','search'); // Get query params from the URL

      const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        set({ ...queryParams, search: event.target.value });
      };

      const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set({ ...queryParams, page: event.target.value });
      };

      const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set({ ...queryParams, limit: event.target.value });
      };

      return (
        <>
          <input type="text" value={search} onChange={handleSearch} />
          <input type="number" value={page} onChange={handlePageChange} />
          <input type="number" value={limit} onChange={handleLimitChange} />
        </>
      );
    };
  ```

<h4>API</h4>

```typescript
const { get, set, build } = useQueryParams<QueryParams>();
```

`QueryParams`: An interface that defines the query parameters that will be used in the component.

**Returned Values**:

`get`: A function that returns the value of the query parameter. It will return an object with the type corresponding to `Partial<QeryParams>`. And for input parameters, it will accept a list of strings corresponding to the query parameters that you want to retrieve.

`set`: A function that sets the value of the query parameter. It will accept an object with the type corresponding to `Partial<QeryParams>`. (it will cause a re-render)

`build`: A function that returns a string with the query parameters in the URL format. It will accept an object with the type corresponding to `Partial<QeryParams>`.

</section>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


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
