"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
function formatMoney(cents) {
    var dollars = cents / 100;
    return formatter.format(dollars);
}
exports.default = formatMoney;
