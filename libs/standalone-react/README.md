# Styled-JSX component library POC

POC for TypeScript + React + Styled-JSX (component) library. Bundled with Rollup + Babel.

Styled-JSX relies on Babel plugin and it's the only way to use it currently. 
Because of that Babel compiler with TS plugin is used (in the build pipeline) instead of using
TypeScript compiler directly.

Babel is gradually becoming obsolete. In the future:
- Either Styled-JSX is updated to support another compilation tool, and we update accordingly.
- Or we switch to another CSS-IN-JS implementation. A lot of cool tools are now mature enough.

Hint: use Yalc to develop locally.
