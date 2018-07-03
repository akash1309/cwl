export const baseUrl = "http://localhost:8000";

////////////////////////////// DYCEE ////////////////////////////
export const allDyCeeUrl="/dycee/all/";
export const addDyCEEUrl="/dycee/add/";
export const oneDyCeeUrl="/dycee/one/";
export const someDyCeeUrl="/dycee/some/";

///////////////////////////// INSPECTOR ////////////////////////
export const allInspectorUrl="/inspector/all/";
export const inspectorUrl="/inspector/add/";
export const oneInspectorUrl="/inspector/one/";
export const someInspectorUrl="/inspector/some/";
export const dyceeInspectorUrl="/inspector/";

///////////////////////////// STORE OFFICER ///////////////////
export const allStoreOfficerUrl="/storeofficer/all/";
export const addStoreOfficerUrl="/storeofficer/add/";
export const oneStoreOfficerUrl="/storeofficer/one/";
export const someStoreOfficerUrl="/storeofficer/some/";
export const storeOfficerUrl="/storeofficer/";


//////////////////////// PURCHASE ORDER //////////////////////
export const addPurchaseOrderUrl ="/purchaseorder/add/";
export const allPurchaseOrderUrl = '/purchaseorder/all/';
export const onePurchaseOrderUrl="/purchaseorder/";
export const POUrlByStoreOfficer = "/purchaseorder/storeofficer/";
export const deletePOUrl = '/deletePO/';
export const updatePOInfoUrl= '/updatePurchaseOrder/';
export const vendorPOUrl = '/purchaseorder/vendor/';
export const inspectorPOUrl = '/purchaseorder/inspector/';
export const getPOCountUrl = '/purchaseorder/po_remaining/';

////////////////////////// VENDOR //////////////////////
export const addVendorUrl ="/vendor/add/";
export const allVendorUrl="/vendor/all/";
export const oneVendorUrl="/vendor/one/";
export const someVendorUrl="/vendor/some/";
export const VendorByStoreOfficerUrl = "/vendor/";

////////////////// INSPECTION CERTIFICATE(IC) ////////////////
export const icGenerateUrl = '/ic/generate/';
export const allIcUrl = '/showIC/all/';
export const oneIcUrl = '/showIC/one/';
export const updateICInfoUrl = '/updateIC/';

//////////////////////// CORRIGENDUM //////////////////
export const allCorrigendumUrl ='/corrigendum/showCorrigendum/all/';
export const generateCorrigendumUrl = '/corrigendum/generate/';
export const oneCorrigendumUrl ="/corrigendum/showCorrigendum/one/";

///////////////////// INSPECTION REPORT //////////////////
export const allIrUrl = '/showIR/';
export const addInspectionReportUrl = '/generateIr/';
export const oneInspectionReportUrl = "/irStatus/get/:order_number/";

///////////////////// ITEMS //////////////////////
export const addItemUrl = '/items/add/';
export const allItemUrl = '/showItems/all/';
export const oneItemUrl = '/showItems/one/';
export const deleteItemUrl = '/deleteItem/';

///////////////////// VISIT ///////////
export const addVisitUrl = '/visit/add/';
export const getVisitUrl = "/visit/get/";
export const updateVisitInfoUrl = '/visit/update/';
export const removeVisitUrl = '/visit/delete/';

//////////////////// OTHERS /////////////////////
export const validateUrl = "/validate/";
export const signupUrl = "/signUp/";
export const loginUrl= "/login/";
export const getInfoUrl = "/user/";
export const updateInfoUrl = '/updateinfo/';
export const deleteInfoUrl = '/deleteInfo/';
