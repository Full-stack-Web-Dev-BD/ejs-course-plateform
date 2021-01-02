let courseImage;
let cropper;
let myForm

window.addEventListener('DOMContentLoaded', e => {
    let cropDoneBtn = document.getElementById('crop-btn')
    let croppedImage = document.getElementById('cropped-image')
    let imgInput = document.getElementById('inputCoursePic');
    let imgPreview = document.getElementById('preview-image')
    let imgBox = document.getElementById('image-box');
    let firstVideo = document.getElementById('firstVideo');
    let cropContainer;
    let courseFormContainer = document.getElementById('course-form-container');
    document.getElementById('remove-img-preview').addEventListener('click', e => {
        imgInput.value = ''
        imgPreview.setAttribute('src', '');
        imgPreview.classList.remove('d-none');
        cropDoneBtn.classList.remove('d-none');
        croppedImage.setAttribute('src', '');
        croppedImage.classList.add('d-none');
        imgBox.classList.add('d-none');
        imgBox.firstChild.removeChild(cropContainer)
    })
    imgInput.addEventListener('input', e => {
        if (imgInput.files && imgInput.files[0]) {
            var reader = new FileReader();
            reader.onloadend = e => {
                croppedImage.setAttribute('src', '');
                croppedImage.classList.add('d-none');
                courseImage = reader.result;
                imgPreview.setAttribute('src', reader.result);
                cropper = new Cropper(imgPreview, {
                    dragMode: 'move',
                    aspectRatio: 6 / 6,
                    autoCropArea: 0.5,
                    restore: false,
                    guides: false,
                    center: true,
                    highlight: false,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    toggleDragModeOnDblclick: false,
                });
                cropDoneBtn.classList.remove('d-none')
                imgBox.classList.remove('d-none');
            }
            reader.readAsDataURL(imgInput.files[0]);
        }
    })
    cropDoneBtn.addEventListener('click', e => {
        e.preventDefault();
        let newCanvas = cropper.getCroppedCanvas({
            width: '800',
            height: '800',
            minWidth: '800',
            minHeight: '800',
            maxWidth: '800',
            maxHeight: '800',
            fillColor: '#fff',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        })
        let dataStr = newCanvas.toDataURL('image/jpeg')
        croppedImage.setAttribute('src', `${dataStr}`);
        courseImage = dataStr
        croppedImage.classList.remove('d-none');
        cropDoneBtn.classList.add('d-none');
        imgPreview.classList.add('d-none');
        cropContainer = document.getElementsByClassName('cropper-container').item(0)
        cropContainer.classList.add('d-none')
    })
    let addVideo = document.getElementById('add-video-btn');
    let videoButtonElement = document.getElementById('video-btn-container')
    let buttonElementParent;
    let videosContainer = document.getElementById('videos-container');
    addVideo.addEventListener('click', e => {
        buttonElementParent = videoButtonElement.parentNode;
        console.log(buttonElementParent);
        e.preventDefault();
        let newVideo = document.createElement('div');
        let dummyDiv1 = document.createElement('div');
        let dummyDiv2 = document.createElement('div');
        let videoTitleInput = document.createElement('input');
        let videoUrlInput = document.createElement('input');
        videoUrlInput.required = true;
        videoUrlInput.className = `form-control all-video-urls`;
        videoUrlInput.type = `url`
        videoUrlInput.placeholder = `Video URL`
        videoTitleInput.required = true;
        videoTitleInput.pattern = `[a-zA-Z0-9\\-! ]+`;
        videoTitleInput.title = `can only contain a-z, A-Z, 0-9, - or !`
        videoTitleInput.minLength = 5;
        videoTitleInput.className = `form-control all-video-titles`;
        videoTitleInput.type = `text`;
        videoTitleInput.placeholder = `Video title`
        dummyDiv1.appendChild(videoTitleInput);
        dummyDiv2.appendChild(videoUrlInput);
        newVideo.className = 'w-100 d-flex justify-content-center video-inputs';
        newVideo.innerHTML = `
            <div class="row w-75 rounded-lg" style="border: 1px solid grey; margin-top: 10px; padding-top: 10px;">
                <div class="col-xl-6 col-lg-6 col-md-9 col-sm-9 col-11 mx-auto">
                    <div class="input-box">
                        <label class="label-text">Video Title<span
                                class="primary-color-2 ml-1">*</span></label>
                        <div class="form-group">
                            ${dummyDiv1.innerHTML}
                            <span class="la la-play input-icon"></span>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-9 col-sm-9 col-11 mx-auto">
                    <div class="input-box">
                        <label class="label-text">Video URL<span
                                class="primary-color-2 ml-1">*</span></label>
                        <div class="form-group">
                            ${dummyDiv2.innerHTML}
                            <span class="la la-link input-icon"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        videosContainer.appendChild(newVideo);
        let addButton = document.createElement('div');
        addButton.classList.add('row');
        let divElement = document.createElement('div');
        divElement.className = 'd-flex align-items-center'
        let divSecondary = document.createElement('div');
        divSecondary.className = 'my-auto';
        let btn = document.createElement('button');
        btn.className = 'btn btn-medium ml-4 pt-4'
        btn.setAttribute('data-dismiss', 'alert');
        btn.setAttribute('aria-label', 'close');
        btn.innerHTML = '<i class="fa fa-times fa-2x p-2"></i>';
        divSecondary.appendChild(btn);
        divElement.appendChild(divSecondary);
        addButton.appendChild(divElement);
        newVideo.appendChild(videoButtonElement);
        buttonElementParent.appendChild(addButton);
        btn.addEventListener('click', e => {
            videosContainer.removeChild(btn.parentNode.parentNode.parentNode.parentNode);
        })
    })
    document.getElementById("submit-btn").addEventListener('click', e => {
        e.preventDefault();
        let inputs = document.getElementsByClassName('all-inputs');
        let index = 0
        for (index = 0; index < inputs.length; index++) {
            const input = inputs.item(index);
            if (!input.checkValidity()) {
                $('#submit-form').trigger('click');
                return
            }
        }
        let data = {};
        myForm = document.getElementById("course-form");
        data.title = myForm.elements.inputCourseTitle.value
        data.description = myForm.elements.inputCourseDescription.value
        data.category = myForm.elements.inputCourseCategory.value
        data.picture = courseImage
        data.videos = [];
        let videoTitles = document.getElementsByClassName('all-video-titles');
        let videoUrls = document.getElementsByClassName('all-video-urls');
        for (index = 0; index < videoTitles.length; index++) {
            const videoTitle = videoTitles.item(index).value;
            const videoUrl = videoUrls.item(index).value.replace('watch?v=', 'embed/').split("&")[0];
            console.log(videoUrl);
            data.videos.push({
                title: videoTitle,
                url: videoUrl,
            })
        }
        axios({
            method: 'post',
            url: '/courses/addCourse',
            data: data
        })
            .then(res => {
                if (res.data.status === 'success') {
                    createAlert('success', courseFormContainer, 'success', 'Your course has been submitted successfully!');
                    console.log('SUCCESS');
                    myForm.reset();
                    let videoInputs = document.getElementsByClassName('video-inputs');
                    let length = videoInputs.length
                    for (let index = 0; index < length; index++) {
                        console.log(`Video ${index + 1} : removed`)
                        const element = videoInputs.item(index);
                        element.parentNode.removeChild(element);
                    }
                    imgInput.value = ''
                    imgPreview.setAttribute('src', '');
                    imgPreview.classList.remove('d-none');
                    cropDoneBtn.classList.remove('d-none');
                    croppedImage.setAttribute('src', '');
                    croppedImage.classList.add('d-none');
                    imgBox.classList.add('d-none');
                    imgBox.firstChild.removeChild(cropContainer)
                    return
                } else if (res.data.status === 'failure' && res.data.failure === 'database') {
                    console.log("frontend database");
                    createAlert('database', courseFormContainer, 'danger', 'An error occured while accessing the database. Try again in a few seconds!')
                    return
                } else {
                    console.log("frontend input");
                    if (res.data.title.error) createAlert('input', myForm.elements.inputCourseTitle, 'danger', res.data.title.error.msg)
                    if (res.data.description.error) createAlert('input', myForm.elements.inputCourseDescription, 'danger', res.data.description.error.msg)
                    if (res.data.category.error) createAlert('input', myForm.elements.inputCourseCategory, 'danger', res.data.category.error.msg)
                    if (res.data.picture.error) createAlert('input', myForm.elements.inputCoursePic, 'danger', res.data.picture.error.msg)
                    if (res.data.videos.error) createAlert('input', firstVideo, 'danger', res.data.videos.error.msg)
                    return
                }

            })
            .catch(err => {
                createAlert('server', courseFormContainer, 'danger', err.msg);
            })
    })
})

const createAlert = (content, appendAfter, alertType, message) => {
    let divOuter = document.createElement('div');
    divOuter.className = 'col-lg-12';
    divOuter.innerHTML = `
        <div class="input-box">
            <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="close" data-dismiss="alert"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    `;
    if (alertType === 'success') {
        appendAfter.parentNode.appendChild(divOuter);
        return
    } else if (alertType === 'danger') {
        if (content === 'database' || content === 'server') {
            appendAfter.parentNode.appendChild(divOuter);
            return
        } else if (content === 'input') {
            appendAfter.parentNode.parentNode.appendChild(divOuter);
            return
        }
    }
}