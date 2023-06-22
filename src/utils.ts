/**
 * @function sleep Using ns.sleep will cause complaints about concurrent ns function calls.
 */
export async function sleep(ms : number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
