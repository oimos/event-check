function* infiniteSequence() {
  let i = 0;
  while(true) {
    yield i++;
  }
}

const iterator = infiniteSequence();
while(true)  {
  console.log(iterator.next());
}

function* iterateUntil3rdElement() {
  let index = 0;
  while (index < 3) {
    yield index++;
  }
}

let gen = iterateUntil3rdElement();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

