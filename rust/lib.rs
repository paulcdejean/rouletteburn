#![feature(convert_float_to_int)]
use wasm_bindgen::prelude::*;
mod whrng;

/// Returns a set of WHRNG seeds that could generated the provided spins.
///
/// # Arguments
///
/// * `spins` - The array of the roulette spins to try and derive a seed from.
/// * `minimum_seed` - The minimum seed to check
/// * `maximum_seed` - The highest seed to check
#[wasm_bindgen]
pub fn get_roulette_seeds(spins: js_sys::Float64Array, minimum_seed: js_sys::Number, maximum_seed: js_sys::Number) -> js_sys::Set {
  let results: js_sys::Set = js_sys::Set::new(&JsValue::UNDEFINED); // No way to construct an empty set? https://github.com/rustwasm/wasm-bindgen/issues/3501
  let spins_rust: Box<[f64]> = spins.to_vec().into_boxed_slice();
  
  let mut bad_rng: whrng::WHRNG = whrng::WHRNG::new(minimum_seed.value_of());

  (minimum_seed.value_of() as u64..maximum_seed.value_of() as u64).
  filter(|&n| {
    bad_rng.seed(n as f64);
    for &spin in spins_rust.iter() {
      if spin != (bad_rng.random() * 37.0).floor() {
        return false;
      };
    };
    return true;
  }).
  for_each(|correct_seed| {
    results.add(&JsValue::from(correct_seed));
  });

  return results;
}
