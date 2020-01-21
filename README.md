# Gotchas

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