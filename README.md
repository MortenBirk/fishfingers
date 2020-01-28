# Example Gotchas

## This is not real MarkDown
MarkDown files are used since they allow for nice code highlighting in editors, however we currently do not parse actual markdown, and do have very specific requirements for the structure.

## Example id
It is required with an id before every example, not just before a bunch of examples.

*This can be fixed quite fast if needed*

## Imports

Multi line imports or requires will preak examples

*This can be fixed quite fast*

Imports and requires are visible in all example files, but will simply be ignored in the actual code.

Instead users can provide the actual imports in the config file, such that the code can run using the imported variables.

This is done to make implementation much easier, since we can look at raw strings, and ignore any advanced parsing.

For now this is not a big problem, since only the library being documented should be imported in simple examples.

*This requires some work to fix, since we have to do proper parsing of the example code*

## No user provided webpack config
There is currently no support for custom webpack configs. Hence examples have to follow the standard of the babel configuration chosen by this project. This also means that examples should probably import previously transpiled library distributions.