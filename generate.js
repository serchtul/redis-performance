import Redis from 'ioredis';

const client = new Redis();

const keyPrefix = 'this_is_a_long_prefix_to_emulate_the_length_of_a_redis_key_in_production__this_is_a_long_prefix_to_emulate_the_length_of_a_redis_key_in_production'

const keysToInsert = new Map(
  Array.from(
    { length: 1_000_000 },
    (_,i) => [`${keyPrefix}:${i}`, 'testvalue']
  )
);

console.log('inserting keys into redis');
console.time('insert')

await client.mset(keysToInsert);

console.timeEnd('insert')
console.log('done!');

await client.quit();