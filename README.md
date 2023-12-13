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

<style>

  * {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      box-sizing: border-box;
  }

  #table-of-content h2 {
    margin-bottom: 0;
  }

  #table-of-content ul {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .hook-link {}

  .hook-container {
    background-color: #fcfcfc;
    padding: 0.5rem 1rem 1rem 1rem;
  }

  .hook-title {
    margin: 0;
    font-size: 2rem;
  }

  .hook-content {
    margin-left: 1rem;
  }

  .hook-title-container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }
</style>

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
