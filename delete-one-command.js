import cache from "cache-manager";
import store from 'cache-manager-redis-store';

const redisStore = store.create();

const redisCache = cache.caching({
  store: redisStore,
  max: 100,
});

const keyPrefix = 'this_is_a_long_prefix_to_emulate_the_length_of_a_redis_key_in_production__this_is_a_long_prefix_to_emulate_the_length_of_a_redis_key_in_production'

const keysToDelete = Array.from(
  { length: 1_000_000 },
  (_,i) => `${keyPrefix}:${i}`
);

console.log('deleting entries')
console.time('delete')

const deleted = await redisCache.del(keysToDelete);

console.log('deleted items: ', deleted);

console.timeEnd('delete')
console.log('done');

redisStore.getClient().quit((err) => {
  if(!err) {
    console.log('Disconnected')
  }
})