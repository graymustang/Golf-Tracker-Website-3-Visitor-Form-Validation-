/*
  main.js
  Author: Bjorn Gray
  Date: December 4, 2025

  Description:
  - Split the js.js file into three different files.
  - Added visitor form with validation (client side only)
  I, Bjorn Gray, wrote this code myself. It is my own work.
*/

document.addEventListener("DOMContentLoaded", function () {
  if (typeof initPage === "function") {
    initPage();
  }
  if (typeof initValidation === "function") {
    initValidation("#myform");
  }
});
