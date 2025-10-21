- Tailwind setup (v3)
    - v4 has problems with VITE env
    - VSCode add extension **Tailwind CSS IntelliSense**

0 - ```pnpm remove tailwindcss postcss autoprefixer```

0.1 - ```pnpm list tailwindcss postcss autoprefixer```

1 - ```pnpm add -D tailwindcss@3 postcss autoprefixer```

2 - ```pnpm tailwindcss init -p```

- creates ```postcss.config.js```and ```tailwind.config.js```

- Add this block of code in ```tailwind.config.js -> content```

```
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
```

- Add this to the global css file

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Import tailwind css in the entrypoint ```main.tsx```

    - ```import './index.css'```