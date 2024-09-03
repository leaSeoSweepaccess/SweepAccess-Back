import { webcrypto as crypto } from 'node:crypto'

const POOL_SIZE_MULTIPLIER = 128;
let pool: any, poolOffset: any;

function fillPool(bytes: any) {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
}

function random(bytes: any) {
  // `-=` convert `bytes` to number to prevent `valueOf` abusing
  fillPool((bytes -= 0));
  return pool.subarray(poolOffset - bytes, poolOffset);
}

function customRandom(alphabet: any, defaultSize: any, getRandom: any) {
  // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
  // values closer to the alphabet size. The bitmask calculates the closest
  // `2^31 - 1` number, which exceeds the alphabet size.
  // For example, the bitmask for the alphabet size 30 is 31 (00011111).
  let mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1;
  // Though, the bitmask solution is not perfect since the bytes exceeding
  // the alphabet size are refused. Therefore, to reliably generate the ID,
  // the random bytes redundancy has to be satisfied.

  // Note: every hardware random generator call is performance expensive,
  // because the system call for entropy collection takes a lot of time.
  // So, to avoid additional system calls, extra bytes are requested in advance.

  // Next, a step determines how many random bytes to generate.
  // The number of random bytes gets decided upon the ID size, mask,
  // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
  // according to benchmarks).
  let step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length);

  return (size = defaultSize) => {
    let id = '';
    while (true) {
      let bytes = getRandom(step);
      // A compact alternative for `for (let i = 0; i < step; i++)`.
      let i = step;
      while (i--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[i] & mask] || '';
        if (id.length === size) return id;
      }
    }
  };
}

export function customAlphabet(alphabet: any, size = 21) {
  return customRandom(alphabet, size, random);
}