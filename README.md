# To Run a Dev Server

- Install Node.Js
- Install NPM
- run `npm install --global yarn`
- `cd` into the project directory
- run `yarn`
- run `yarn run dev`
- Dev server will start.

# To Build for Production

- Repeat above steps till running `yarn`
- change the `basename` in `vite.config.js` and `src/main.jsx` to match the basename of your domain
- run `yarn run build`
- the build process will make the `index.html` page and assets folder.
- Use NGiNX to serve the HTML files along with assests.

## Note:

Build process can be done on a central machine and thus the first 3 step can be skipped and there would be no need to install Node.Js, NPM or Yarn on the client machine. The build files can be transfered and served from client machine.
