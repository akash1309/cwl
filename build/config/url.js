"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//export const baseUrl = "http://localhost:8000";
var baseUrl = exports.baseUrl = "https://cwl-cwl.193b.starter-ca-central-1.openshiftapps.com";

////////////////////////////// DYCEE ////////////////////////////
var allDyCeeUrl = exports.allDyCeeUrl = "/dycee/all/";
var addDyCEEUrl = exports.addDyCEEUrl = "/dycee/add/";
var oneDyCeeUrl = exports.oneDyCeeUrl = "/dycee/one/";
var someDyCeeUrl = exports.someDyCeeUrl = "/dycee/some/";
var getDyceeEmailUrl = exports.getDyceeEmailUrl = '/dycee/email/';

///////////////////////////// INSPECTOR ////////////////////////
var allInspectorUrl = exports.allInspectorUrl = "/inspector/all/";
var inspectorUrl = exports.inspectorUrl = "/inspector/add/";
var oneInspectorUrl = exports.oneInspectorUrl = "/inspector/one/";
var someInspectorUrl = exports.someInspectorUrl = "/inspector/some/";
var dyceeInspectorUrl = exports.dyceeInspectorUrl = "/inspector/";

///////////////////////////// STORE OFFICER ///////////////////
var allStoreOfficerUrl = exports.allStoreOfficerUrl = "/storeofficer/all/";
var addStoreOfficerUrl = exports.addStoreOfficerUrl = "/storeofficer/add/";
var oneStoreOfficerUrl = exports.oneStoreOfficerUrl = "/storeofficer/one/";
var someStoreOfficerUrl = exports.someStoreOfficerUrl = "/storeofficer/some/";
var storeOfficerUrl = exports.storeOfficerUrl = "/storeofficer/";
var getStoreOfficerByVendorUrl = exports.getStoreOfficerByVendorUrl = '/storeofficer/vendor/';

//////////////////////// PURCHASE ORDER //////////////////////
var addPurchaseOrderUrl = exports.addPurchaseOrderUrl = "/purchaseorder/add/";
var allPurchaseOrderUrl = exports.allPurchaseOrderUrl = '/purchaseorder/all/';
var onePurchaseOrderUrl = exports.onePurchaseOrderUrl = "/purchaseorder/";
var POUrlByStoreOfficer = exports.POUrlByStoreOfficer = "/purchaseorder/storeofficer/";
var deletePOUrl = exports.deletePOUrl = '/deletePO/';
var updatePOInfoUrl = exports.updatePOInfoUrl = '/updatePurchaseOrder/';
var vendorPOUrl = exports.vendorPOUrl = '/purchaseorder/vendor/';
var inspectorPOUrl = exports.inspectorPOUrl = '/purchaseorder/inspector/';
var getPOCountUrl = exports.getPOCountUrl = '/purchaseorder/po_remaining/';

////////////////////////// VENDOR //////////////////////
var addVendorUrl = exports.addVendorUrl = "/vendor/add/";
var allVendorUrl = exports.allVendorUrl = "/vendor/all/";
var oneVendorUrl = exports.oneVendorUrl = "/vendor/one/";
var someVendorUrl = exports.someVendorUrl = "/vendor/some/";
var VendorByStoreOfficerUrl = exports.VendorByStoreOfficerUrl = "/vendor/";

////////////////// INSPECTION CERTIFICATE(IC) ////////////////
var icGenerateUrl = exports.icGenerateUrl = '/ic/generate/';
var allIcUrl = exports.allIcUrl = '/showIC/all/';
var oneIcUrl = exports.oneIcUrl = '/showIC/one/';
var updateICInfoUrl = exports.updateICInfoUrl = '/updateIC/';

//////////////////////// CORRIGENDUM //////////////////
var allCorrigendumUrl = exports.allCorrigendumUrl = '/corrigendum/showCorrigendum/all/';
var generateCorrigendumUrl = exports.generateCorrigendumUrl = '/corrigendum/generate/';
var oneCorrigendumUrl = exports.oneCorrigendumUrl = "/corrigendum/showCorrigendum/one/";

///////////////////// INSPECTION REPORT //////////////////
var allIrUrl = exports.allIrUrl = '/showIR/';
var addInspectionReportUrl = exports.addInspectionReportUrl = '/generateIr/';
var oneInspectionReportUrl = exports.oneInspectionReportUrl = "/irStatus/get/:order_number/";

///////////////////// ITEMS //////////////////////
var addItemUrl = exports.addItemUrl = '/items/add/';
var allItemUrl = exports.allItemUrl = '/showItems/all/';
var oneItemUrl = exports.oneItemUrl = '/showItems/one/';
var deleteItemUrl = exports.deleteItemUrl = '/deleteItem/';

///////////////////// VISIT ///////////
var addVisitUrl = exports.addVisitUrl = '/visit/add/';
var getVisitUrl = exports.getVisitUrl = "/visit/get/";
var updateVisitInfoUrl = exports.updateVisitInfoUrl = '/visit/update/';
var removeVisitUrl = exports.removeVisitUrl = '/visit/delete/';

//////////////////// OTHERS /////////////////////
var validateUrl = exports.validateUrl = "/validate/";
var signupUrl = exports.signupUrl = "/signUp/";
var loginUrl = exports.loginUrl = "/login/";

var getCeeInfoUrl = exports.getCeeInfoUrl = "/user/cee/";
var getDyceeInfoUrl = exports.getDyceeInfoUrl = "/user/dycee/";
var getInspectorInfoUrl = exports.getInspectorInfoUrl = "/user/inspector/";
var getStoreOfficerInfoUrl = exports.getStoreOfficerInfoUrl = "/user/storeofficer/";
var getVendorInfoUrl = exports.getVendorInfoUrl = "/user/vendor/";

var updateCeeInfoUrl = exports.updateCeeInfoUrl = '/updateinfo/cee/';
var updateDyceeInfoUrl = exports.updateDyceeInfoUrl = '/updateinfo/dycee/';
var updateInspectorInfoUrl = exports.updateInspectorInfoUrl = '/updateinfo/inspector/';
var updateStoreOfficerInfoUrl = exports.updateStoreOfficerInfoUrl = '/updateinfo/storeofficer/';
var updateVendorInfoUrl = exports.updateVendorInfoUrl = '/updateinfo/vendor/';

var deleteInfoUrl = exports.deleteInfoUrl = '/deleteInfo/';