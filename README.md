## To-Do-List-Practice

### Scripts :
- Run local web app : `npm run`
- Bundle web app : `npm run build`
- Testing web app : `npm run test`
- Note :
  - Please check the `scripts` node in package.json for further realization( It's a shellscript command ).
  - Don't execute the `npm run eject`, this is a one-way operation, once you eject, you can’t go back!
    ( [ Check for further details ](https://create-react-app.dev/docs/available-scripts/#npm-run-eject]) )

### Codebase architecture :
- Public : The place where the template files are located for bundling purposes.
- Src : The place where the source codes are located..
  - `assets` : Global files (e.g. `scss`, `imgs`).
  - `components` : Reusable React components files located (e.g. `Input`, `Checkbox`).
    - `index.tsx` : Mainly functional component.
    - `hook.tsx` : All the curry hook functions are located.
    - `componentType.ts` : All the `type` or `interface` of each component located.
    - `componentStyle.module.scss` : Layout SCSS file.
  - Pages : Reusable React page components files located (e.g. `ToDoList`).
    - `index.tsx` : Mainly functional component.
    - `hook.tsx` : All the curry hook functions are located.
    - `const.ts` : All the variables located.
    - `pageType.ts` : All the `type` or `interface` of each page located.
    - `pageStyle.module.scss` : Layout SCSS file.
    - `xxxxx.test.tsx` and `./test/xxx.test.tsx` : All the test files.
- `utils` : Global curry function file.
- `App.test.tsx` : The testing file of `App.tsx`.
- `App.tsx` : Mainly React page component of the whole web app.
- `index.tsx` : Mainly entry of the hole web app.
- `package.json` : All the dependencies and scripts are located.
- No further introduction for other misc files, thanks for kindly understanding.