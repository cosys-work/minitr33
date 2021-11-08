# Dev Env Setup

Install the following:

1. Visual Studio Code or Webstorm/Ultimate
2. pnpm
3. Angular CLI (`pnpm i -g @angular/cli@13`)
4. Switch to the cloned/unzipped project folder. From within the project root, run `pnpm i`.

# NB

1. We use `pnpm` as the package manager.

- Please use `ng config -g cli.packageManager pnpm` (or without the global flag) to configure your project CLI.
- Please use `pnx` instead of `nx` in the monorepo. In your shell config or shortcut config
  add `alias pnx="pnpm run nx --"`

# Dev Server Setup

1. Run the UI using one of these two:

* `pnpm start`

3. Open the following in your browser:

* `localhost:4200`
