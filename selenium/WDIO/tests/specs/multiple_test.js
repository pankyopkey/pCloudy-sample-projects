var specs = [
  './multiple/Firstestcase.js',
  './multiple/ScenodTestCase.js',
  './multiple/ThridTestCase.js'
];

for (var i = specs.length - 1; i >= 0; i--) {
  require(specs[i]);
};
