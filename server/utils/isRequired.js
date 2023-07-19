// function to make a parameter mandatory

const isRequired = (arg) => {
  throw new Error(`${arg} is a required argument`)
}

module.exports = isRequired;

// use as followed in a function
// const fcn = (name = isRequired("name")) => {<code to be executed>}
