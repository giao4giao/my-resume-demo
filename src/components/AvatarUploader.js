window.addAvatarUploadListener = function() {
    const addAvatarBtn = document.getElementById('add-avatar-btn');
    addAvatarBtn.addEventListener('click', triggerAvatarUpload);
}

function triggerAvatarUpload() {
    document.getElementById('avatar-input').click();
}

window.handleAvatarUpload = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            compressImage(e.target.result, function(compressedDataUrl) {
                updateAvatar(compressedDataUrl);
                if (window.resumeEditor && typeof window.resumeEditor.saveCurrentResume === 'function') {
                    window.resumeEditor.saveCurrentResume();
                } else {
                    console.error('resumeEditor or saveCurrentResume method not found');
                }
            });
        };
        reader.readAsDataURL(file);
    }
}

function compressImage(dataUrl, callback) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 设置压缩后的尺寸
        const maxWidth = 200;
        const maxHeight = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        
        // 压缩图片质量
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(compressedDataUrl);
    };
    img.src = dataUrl;
}

window.updateAvatar = function(avatarDataUrl) {
    const resumeHeader = document.querySelector('.resume-header');
    const avatarContainer = resumeHeader.querySelector('.avatar-container');
    
    if (avatarContainer) {
        avatarContainer.innerHTML = `<img src="${avatarDataUrl}" alt="头像" class="avatar">`;
    } else {
        const newAvatarContainer = document.createElement('div');
        newAvatarContainer.className = 'avatar-container';
        newAvatarContainer.innerHTML = `<img src="${avatarDataUrl}" alt="头像" class="avatar">`;
        resumeHeader.insertBefore(newAvatarContainer, resumeHeader.firstChild);
    }
    
    // 更新当前简历数据
    if (window.resumeEditor && typeof window.resumeEditor.getCurrentResumeId === 'function') {
        const currentResumeId = window.resumeEditor.getCurrentResumeId();
        const fullResumeData = window.resumeService.getResumeById(currentResumeId);
        if (fullResumeData) {
            const currentResumeType = window.resumeEditor.getCurrentResumeType();
            if (!fullResumeData[currentResumeType]) {
                fullResumeData[currentResumeType] = {};
            }
            fullResumeData[currentResumeType].avatar = avatarDataUrl;
            window.resumeService.saveResume(fullResumeData);
        } else {
            console.error('Resume data not found for id:', currentResumeId);
        }
    } else {
        console.error('ResumeEditor or getCurrentResumeId method not found');
    }
}