import postcss from 'postcss';
import sugarss from 'sugarss';
import precss from 'precss';

const sss = `
// variable initialization

$loop-begin: 0
$loop-stop: 25
$interval:   5

@for $cursor from $loop-begin to $loop-stop by $interval

  @each $prop, $name in (margin, padding), (m, p)
    .$(name)-$(cursor)
      $(prop): $(cursor)px !important

    @each $side, $subname in (top, bottom, left, right), (t, b, l, r)
      .$(name)-$(subname)-$(cursor)
        $(prop)-$(side): $(cursor)px !important

    .$(name)-y-$(cursor)
      @each $side in (top, bottom)
        $(prop)-$(side): $(cursor)px !important

    .$(name)-x-$(cursor)
      @each $side in (left, right)
        $(prop)-$(side): $(cursor)px !important

.parent >
.child
  color: black

.one
  background: linear-gradient(rgba(0, 0, 0, 0), black)
              linear-gradient(red, rgba(255, 0, 0, 0))

.two
  background:
    linear-gradient(rgba(0, 0, 0, 0), black)
    linear-gradient(red, rgba(255, 0, 0, 0))
`;

// console.log(sugarss.parse.toString());

// const postcss1 = postcss([sugarss.parse]);

const createParser = (options) => {
  console.log('running');
  return (source) => sugarss.parse(source, options);
};
const options = {
  parser: 'sugarss',
  plugins: {
    precss,
  },
};
postcss()
  .process(sss, {
    parser: { parse: createParser(options) },
  })
  .then(function (result) {
    console.log(result.content);
  });

// postcss([sugarss])
//   .process(sss, { parser: sugarss })
//   .then(function (result) {
//     console.log(result.content);
//   });
