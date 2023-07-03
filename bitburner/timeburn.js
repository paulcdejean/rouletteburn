async function a(t) {
  return new Promise((l) => {
    setTimeout(l, t);
  });
}
const c = `._cell_8a9dx_1{box-sizing:border-box;border-top:3px solid white;border-left:3px solid white;padding-top:25px;padding-bottom:25px;text-align:center;width:50px;font-size:30px;color:#fff}._black_8a9dx_13{background-color:#000}._red_8a9dx_17{background-color:red}._blue_8a9dx_21{background-color:#00008b}._blankcell_8a9dx_25{box-sizing:border-box;padding-top:25px;padding-bottom:25px;text-align:center;width:50px;font-size:30px;color:#fff}._table_8a9dx_35{border-spacing:0 0;padding:30px 45px 30px 30px;background-color:green;border-radius:70px;border:solid gray;border-width:10px}._rightmost_8a9dx_45{border-right:3px solid white}._topmost_8a9dx_49{border-top:3px solid white}._bottommost_8a9dx_53{border-bottom:3px solid white}
`, m = "_cell_8a9dx_1", s = "_black_8a9dx_13", o = "_red_8a9dx_17", r = "_blue_8a9dx_21", d = "_blankcell_8a9dx_25", n = "_table_8a9dx_35", $ = "_rightmost_8a9dx_45", b = "_topmost_8a9dx_49", i = "_bottommost_8a9dx_53", e = {
  cell: m,
  black: s,
  red: o,
  blue: r,
  blankcell: d,
  table: n,
  rightmost: $,
  topmost: b,
  bottommost: i
};
function R() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, c), /* @__PURE__ */ React.createElement("table", { className: e.table }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: e.blankcell }), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "3"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "6"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "9"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "12"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "15"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "18"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "21"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "24"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "27"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "30"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "33"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red} ${e.rightmost}` }, "36")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.blue}` }, "0"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "2"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "5"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "8"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "11"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "14"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "17"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "20"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "23"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "26"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black}` }, "29"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red}` }, "32"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black} ${e.rightmost}` }, "35")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: `${e.blankcell} ${e.topmost}` }), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red} ${e.bottommost}` }, "1"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black} ${e.bottommost}` }, "4"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red} ${e.bottommost}` }, "7"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black} ${e.bottommost}` }, "10"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black} ${e.bottommost}` }, "13"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red} ${e.bottommost}` }, "16"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red} ${e.bottommost}` }, "19"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black} ${e.bottommost}` }, "22"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red} ${e.bottommost}` }, "25"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black} ${e.bottommost}` }, "28"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.black} ${e.bottommost}` }, "31"), /* @__PURE__ */ React.createElement("td", { className: `${e.cell} ${e.red} ${e.bottommost} ${e.rightmost}` }, "34"))));
}
function _() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "Click on the table one time to indicate your bet. Click a second time to indicate the roulette result. Only numerical bets are supported."), /* @__PURE__ */ React.createElement(R, null));
}
async function E(t) {
  t.disableLog("ALL"), t.tprint("React!!!"), t.printRaw(React.createElement(_)), await a(3e4);
}
export {
  E as main
};
