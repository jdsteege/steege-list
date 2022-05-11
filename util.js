export function logThing(thing) {
  let description = undefined;

  try {
    description = JSON.stringify(thing);
  } catch (err) {
    description = thing;
  }

  console.log(description);
}
