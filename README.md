# FE-base-react-setup
Base repository to build a frontend project using react, vite, tailwind, eslint, etc.


## Steps to run project

- Install node.js version 20.15.1

- Install pnpm in node 
    - ```npm install -g pnpm```

- Install repository dependencies
    - ```pnpm install```

- Run project
    - ```pnpm dev```


## Unit tests setup

- Adding Vitest + react-testing-library + jest-dom + JSdom
    - ```pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom```
    - @testing-library/react
        - ```render()```, ```screen```
    - @testing-library/jest-dom
        - ```toBeInTheDocument()```

- Update ```vite.config.ts```
    - Import this ```/// <reference types="vitest"/>```
    - Add this block in ```defineConfig````
        ```
        test: {
            globals: true,
            environment: 'jsdom',
        }
        ```

- Create a file test for a specific file in project, following the pattern:
    - path/file.ts
    - path/file.test.ts

    - if you do not setup it globally, there is a need to ```import '@testing-library/jest-dom'``` for every test file you need those functions.


- Run test suite
    - ```pnpm vitest```
        - by default in Vite it is the same as ```--watch````
    - ```pnpm vitest --run```
        - run tests only once

    - Customize test commands in ```package.json```
        - Add in ```scripts``` section
        ```
            "test": "vitest",
            "test:ci": "vitest --run"
        ```
        - now you can run
            - ```pnpm test```
            - ```pnpm test:ci```


---
Next 

- Configure Tailwind
- Configure ES Lint
    - Vite created eslint.config.js file already
- Configure VS Code
    - Es Lint
    - Extensions
- Add Packages
    - Material Components
    - Material Icons
    - React Query
    - Zustand 
    - Loadsh

---
### Others

- Create project with Vite+React (inside existing repo)
    - ```pnpm create vite@latest .```
    - React -> Typescript


- Tests
    - Vitest is like Jest, an infrastructure to run tests, but it is better nativelly to vite apps (run tests, describe, it, expect commands)
    - JSdom is a lib to emulate a real browser in node.js environment, to run tests (limited fake browser)
        - you can check for elements in dom, but cannot get real elements dimensions.
        - to use document, window, HTMLElement, etc. you need JSdom
    - Customize package.json to create scripts to run tests
    - Test file global setup, indicate to import ```jest-dom``` in all test files

    - Vitest UI: is it worthy?

