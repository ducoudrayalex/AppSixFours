var pictureSource;
var destinationType;

function updateCameraStatus(status) {
    $("#cameraStatus").html(status);
}

function photoOnFail(message) {
    updateCameraStatus("ERROR: " + message);
}

function onPhotoDataSuccess(imageData) {
    $("#popImage").attr("src", "data:image/jpeg;base64," + imageData);
    $("#popupPhoto").popup("open");
}

function onPhotoURISuccess(imageURI) {
    $("#popImage").attr("src", imageURI);
    //$("#pictBox").empty();
    //$("#pictBox").append(imageURI).trigger("create");
    $("#pictBox").html(imageURI);
    updateCameraStatus("SUCCESS: Image loaded");
    $("#popupPhoto").popup("open");
}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoURISuccess, photoOnFail, {quality: 50, destinationType: destinationType.FILE_URI});
}

//Android ignores the allowEdit parameter
function capturePhotoEdit() {
    navigator.camera.getPicture(onPhotoDataSuccess, photoOnFail, {quality: 20, allowEdit: true, destinationType: destinationType.DATA_URL});
}

//source could be Camera.PictureSourceType.PHOTOLIBRARY and SAVEDPHOTOALBUM, in Android, they are the same.
function getPhoto(source) {
    updateCameraStatus("");
    navigator.camera.getPicture(onPhotoURISuccess, photoOnFail, {quality: 50, destinationType: destinationType.FILE_URI, sourceType: source});
}

function getCameraReady() {
    $("#popupPhoto").popup("close");
    updateCameraStatus("");
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;

    $('#capture').on('click', function (e) {
        e.preventDefault();
        capturePhoto();
        return false;
    });

    $('#importGalerie').on('click', function (e) {
        e.preventDefault();
        getPhoto(pictureSource.PHOTOLIBRARY);
        return false;
    });
}

//*********************************************************    
// initialize the environment
//********************************************************* 
$("#signaler").bind("pagebeforeshow", function () {
    getCameraReady();
});