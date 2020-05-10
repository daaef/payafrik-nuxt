function toggleBusiness() {
  let businessList = document.querySelector(".businessList");
  let businessMenuList = document.querySelector(".businessMenuList");
  let otherServices = document.querySelector(".serviceList");
  let otherMenuServices = document.querySelector(".serviceMenuList");
  let supportList = document.querySelector(".supportList");
  let supportMenuList = document.querySelector(".supportMenuList");

  businessList.style.height = "190px";
  businessMenuList.style.display = "block";
  otherServices.style.height = "0px";
  otherMenuServices.style.display = "none";
  supportList.style.height = "0px";
  supportMenuList.style.display = "none";

  let headerBusiness = document.querySelector(".header-business");
  let headerServices = document.querySelector(".header-services");
  let headerSupport = document.querySelector(".header-support");
  headerBusiness.classList.remove("menuHeaderInactive");
  headerServices.classList.add("menuHeaderInactive");
  headerSupport.classList.add("menuHeaderInactive");
}
function toggleServices() {
  let businessList = document.querySelector(".businessList");
  let businessMenuList = document.querySelector(".businessMenuList");
  let otherServices = document.querySelector(".serviceList");
  let otherMenuServices = document.querySelector(".serviceMenuList");
  let supportList = document.querySelector(".supportList");
  let supportMenuList = document.querySelector(".supportMenuList");

  businessList.style.height = "0px";
  businessMenuList.style.display = "none";
  otherServices.style.height = "160px";
  otherMenuServices.style.display = "block";
  supportList.style.height = "0px";
  supportMenuList.style.display = "none";

  let headerBusiness = document.querySelector(".header-business");
  let headerServices = document.querySelector(".header-services");
  let headerSupport = document.querySelector(".header-support");
  headerBusiness.classList.add("menuHeaderInactive");
  headerServices.classList.remove("menuHeaderInactive");
  headerSupport.classList.add("menuHeaderInactive");
}
function toggleSupport() {
  let businessList = document.querySelector(".businessList");
  let businessMenuList = document.querySelector(".businessMenuList");
  let otherServices = document.querySelector(".serviceList");
  let otherMenuServices = document.querySelector(".serviceMenuList");
  let supportList = document.querySelector(".supportList");
  let supportMenuList = document.querySelector(".supportMenuList");

  businessList.style.height = "0px";
  businessMenuList.style.display = "none";
  otherServices.style.height = "0px";
  otherMenuServices.style.display = "none";
  supportList.style.height = "100px";
  supportMenuList.style.display = "block";

  let headerBusiness = document.querySelector(".header-business");
  let headerServices = document.querySelector(".header-services");
  let headerSupport = document.querySelector(".header-support");
  headerBusiness.classList.add("menuHeaderInactive");
  headerServices.classList.add("menuHeaderInactive");
  headerSupport.classList.remove("menuHeaderInactive");
}

function openMenu() {
  let sidebar = document.querySelector(".sidebar_bg");
  sidebar.style.display = "block";
}
function closeMenu() {
  let sidebar = document.querySelector(".sidebar_bg");
  sidebar.style.display = "none";
}
