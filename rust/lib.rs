#![feature(convert_float_to_int)]

use wasm_bindgen::prelude::*;

mod whrng;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn rustadd(lhs: u32, rhs: u32) -> u32 {
  return lhs + rhs
}

#[wasm_bindgen]
pub fn rustreverse(input: js_sys::Array) -> js_sys::Array {
  return input.clone().reverse()
}

const WHRNG_NUMBER_OF_SEEDS: u64 = 30000000;

/// Returns a set of WHRNG seeds that could generated the provided spins.
///
/// # Arguments
///
/// * `name` - A string slice that holds the name of the person
#[wasm_bindgen]
pub fn get_roulette_seeds(spins: js_sys::Uint32Array, minimum_seed: js_sys::Number) -> js_sys::Set {
  let results: js_sys::Set = js_sys::Set::new(&JsValue::null()); // No way to construct an empty set? https://github.com/rustwasm/wasm-bindgen/issues/3501
  results.clear();
  let minimum_seed_rust: f64 = minimum_seed.value_of(); // Convert float to int is experimental? https://github.com/rust-lang/rust/issues/67057
  let spins_rust: Box<[u32]> = spins.to_vec().into_boxed_slice();
  
  // for seed in minimum_seed_rust..(minimum_seed_rust + WHRNG_NUMBER_OF_SEEDS) {
  //   for &spin in spins_rust.iter() {

  //   }
  // }
  // let result = fake_rng.random();


  let mut bad_rng = whrng::WHRNG::new(minimum_seed_rust);

  for n in 0..5 {
    results.add(&JsValue::from(bad_rng.random()));
  }

  return results;
}
