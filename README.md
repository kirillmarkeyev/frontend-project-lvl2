### Tests and linter status:
[![Actions Status](https://github.com/kirillmarkeyev/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/kirillmarkeyev/frontend-project-lvl2/actions)
[![Node.js CI](https://github.com/kirillmarkeyev/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/kirillmarkeyev/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/97051ed1b79c4622dd6b/maintainability)](https://codeclimate.com/github/kirillmarkeyev/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/97051ed1b79c4622dd6b/test_coverage)](https://codeclimate.com/github/kirillmarkeyev/frontend-project-lvl2/test_coverage)

# Difference calculator
Difference calculator is a program with command-line interface (CLI) that generates a difference between two data structures or configuration files. Performs the following operations: reading files, parsing incoming data, building a tree of differences, forming the necessary output. The algorithm is based on tree recursion.

### Main features:
* Supports different input formats: json, yaml.
* Generates a report in the form of plain text, stylish and json.
  
## Installation and usage
Clone the repository:
```
git clone git@github.com:kirillmarkeyev/frontend-project-lvl2.git
```
Change the directory:
```
cd frontend-project-lvl2/
```
Install the dependecies:
```
make install
```
To create a local link and work in your terminal:
```
sudo npm link
```
For help run `gendiff -h` or `gendiff --help`:
```
$ gengiff --help
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -v, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```
Run:
```
gendiff [options] <path/to/file1> <path/to/file2>
```

## Demonstration
### Plain type of input data, json files:
[![asciicast](https://asciinema.org/a/Cj3yScenqTZCGrBAbMrBersav.svg)](https://asciinema.org/a/Cj3yScenqTZCGrBAbMrBersav)

### Plain type of input data, yaml files:
[![asciicast](https://asciinema.org/a/AxXkzKTWGbcUXHP29HHz04ZSy.svg)](https://asciinema.org/a/AxXkzKTWGbcUXHP29HHz04ZSy)

### Nested type of input data, output format - stylish:
[![asciicast](https://asciinema.org/a/xgCJcgSL9502IKfsTa2lkDcGk.svg)](https://asciinema.org/a/xgCJcgSL9502IKfsTa2lkDcGk)

### Nested type of input data, output format - plain:
[![asciicast](https://asciinema.org/a/Q3kZDGxiMMCuLf0ZtfQ9siKUo.svg)](https://asciinema.org/a/Q3kZDGxiMMCuLf0ZtfQ9siKUo)

### Nested type of input data, output format - json:
[![asciicast](https://asciinema.org/a/CmY7KsdMBQCTT6nLaGWni0VIb.svg)](https://asciinema.org/a/CmY7KsdMBQCTT6nLaGWni0VIb)
